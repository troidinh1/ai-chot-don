import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateOrderPayload = {
  checkoutId?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerNote?: string;
  paymentMethod?: "cod" | "bank_transfer" | "zalo";
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function createOrderCode() {
  const now = new Date();

  const datePart = now
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const randomPart = Math.floor(100000 + Math.random() * 900000);

  return `ACD-${datePart}-${randomPart}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderPayload;

    const checkoutId = cleanText(body.checkoutId);
    const customerName = cleanText(body.customerName);
    const customerPhone = cleanText(body.customerPhone);
    const customerAddress = cleanText(body.customerAddress);
    const customerNote = cleanText(body.customerNote);
    const paymentMethod = body.paymentMethod ?? "cod";

    if (!checkoutId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã checkout." },
        { status: 400 }
      );
    }

    if (!customerName) {
      return NextResponse.json(
        { ok: false, message: "Vui lòng nhập họ tên." },
        { status: 400 }
      );
    }

    if (!customerPhone) {
      return NextResponse.json(
        { ok: false, message: "Vui lòng nhập số điện thoại." },
        { status: 400 }
      );
    }

    if (!customerAddress) {
      return NextResponse.json(
        { ok: false, message: "Vui lòng nhập địa chỉ nhận hàng." },
        { status: 400 }
      );
    }

    if (!["cod", "bank_transfer", "zalo"].includes(paymentMethod)) {
      return NextResponse.json(
        { ok: false, message: "Phương thức thanh toán không hợp lệ." },
        { status: 400 }
      );
    }

    const { data: checkout, error: checkoutError } = await supabaseAdmin
      .from("checkout_sessions")
      .select("*")
      .eq("id", checkoutId)
      .eq("status", "draft")
      .single();

    if (checkoutError || !checkout) {
      console.error("checkout_error", checkoutError);

      return NextResponse.json(
        {
          ok: false,
          step: "checkout_error",
          message:
            checkoutError?.message ??
            "Không tìm thấy phiên checkout hoặc phiên đã xử lý.",
        },
        { status: 404 }
      );
    }

    const expiresAt = new Date(checkout.expires_at).getTime();

    if (Number.isFinite(expiresAt) && expiresAt < Date.now()) {
      await supabaseAdmin
        .from("checkout_sessions")
        .update({ status: "expired" })
        .eq("id", checkoutId);

      return NextResponse.json(
        {
          ok: false,
          step: "checkout_expired",
          message: "Phiên đặt hàng đã hết hạn. Vui lòng tạo lại giỏ hàng.",
        },
        { status: 400 }
      );
    }

    const { data: checkoutItems, error: checkoutItemsError } =
      await supabaseAdmin
        .from("checkout_items")
        .select("*")
        .eq("checkout_session_id", checkoutId)
        .order("created_at", { ascending: true });

    if (checkoutItemsError) {
      console.error("checkout_items_error", checkoutItemsError);

      return NextResponse.json(
        {
          ok: false,
          step: "checkout_items_error",
          message: checkoutItemsError.message,
        },
        { status: 500 }
      );
    }

    if (!checkoutItems || checkoutItems.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          step: "empty_checkout",
          message: "Checkout không có sản phẩm.",
        },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();

    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .upsert(
        {
          shop_id: checkout.shop_id,
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          note: customerNote || null,
          last_order_at: nowIso,
        },
        {
          onConflict: "shop_id,phone",
        }
      )
      .select("*")
      .single();

    if (customerError || !customer) {
      console.error("customer_error", customerError);

      return NextResponse.json(
        {
          ok: false,
          step: "customer_error",
          message: customerError?.message ?? "Không lưu được khách hàng.",
        },
        { status: 500 }
      );
    }

    const orderCode = createOrderCode();

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        shop_id: checkout.shop_id,
        customer_id: customer.id,
        order_code: orderCode,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        customer_note: customerNote || null,
        status: "new",
        payment_method: paymentMethod,
        subtotal: checkout.subtotal,
        shipping_fee: checkout.shipping_fee,
        total: checkout.total,
        source: "demo_shop",
      })
      .select("*")
      .single();

    if (orderError || !order) {
      console.error("order_error", orderError);

      return NextResponse.json(
        {
          ok: false,
          step: "order_error",
          message: orderError?.message ?? "Không tạo được đơn hàng.",
        },
        { status: 500 }
      );
    }

    const orderItemsToInsert = checkoutItems.map((item) => ({
      order_id: order.id,
      shop_id: checkout.shop_id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_slug: item.product_slug,
      unit_price: item.unit_price,
      quantity: item.quantity,
      line_total: item.line_total,
    }));

    const { error: orderItemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItemsToInsert);

    if (orderItemsError) {
      console.error("order_items_error", orderItemsError);

      return NextResponse.json(
        {
          ok: false,
          step: "order_items_error",
          message: orderItemsError.message,
        },
        { status: 500 }
      );
    }

    for (const item of checkoutItems) {
      if (!item.product_id) continue;

      const { data: product, error: productError } = await supabaseAdmin
        .from("products")
        .select("id, sold")
        .eq("id", item.product_id)
        .single();

      if (productError || !product) {
        console.error("product_read_error", productError);
        continue;
      }

      const nextSold = Number(product.sold || 0) + Number(item.quantity || 0);

      const { error: updateProductError } = await supabaseAdmin
        .from("products")
        .update({
          sold: nextSold,
        })
        .eq("id", item.product_id);

      if (updateProductError) {
        console.error("product_update_error", updateProductError);
      }
    }

    const { error: updateCustomerError } = await supabaseAdmin
      .from("customers")
      .update({
        total_orders: Number(customer.total_orders || 0) + 1,
        total_spent:
          Number(customer.total_spent || 0) + Number(order.total || 0),
        last_order_at: nowIso,
      })
      .eq("id", customer.id);

    if (updateCustomerError) {
      console.error("customer_update_error", updateCustomerError);
    }

    const { error: updateCheckoutError } = await supabaseAdmin
      .from("checkout_sessions")
      .update({
        status: "submitted",
      })
      .eq("id", checkoutId);

    if (updateCheckoutError) {
      console.error("checkout_update_error", updateCheckoutError);
    }

    return NextResponse.json({
      ok: true,
      message: "Tạo đơn hàng thành công.",
      orderId: order.id,
      orderCode: order.order_code,
      redirectUrl: `/order-success/${order.id}`,
    });
  } catch (error) {
    console.error("create_order_server_error", error);

    return NextResponse.json(
      {
        ok: false,
        step: "server_error",
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo đơn hàng.",
      },
      { status: 500 }
    );
  }
}