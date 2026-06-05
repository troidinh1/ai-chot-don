import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDemoShop } from "@/lib/supabase/queries";

type CreateCheckoutPayload = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateCheckoutPayload;

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Giỏ hàng đang trống.",
        },
        { status: 400 }
      );
    }

    const shop = await getDemoShop();

    const productIds = body.items.map((item) => item.productId);

    const { data: products, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, shop_id, name, slug, price, stock, sold, is_active")
      .eq("shop_id", shop.id)
      .eq("is_active", true)
      .in("id", productIds);

    if (productError) {
      return NextResponse.json(
        {
          ok: false,
          message: productError.message,
        },
        { status: 500 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Không tìm thấy sản phẩm phù hợp.",
        },
        { status: 400 }
      );
    }

    const checkoutItems = body.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error("Có sản phẩm không còn tồn tại hoặc đã ngừng bán.");
      }

      const quantity = Math.max(1, Number(item.quantity) || 1);
      const availableStock = Math.max(product.stock - product.sold, 0);

      if (quantity > availableStock) {
        throw new Error(`Sản phẩm "${product.name}" không đủ số lượng.`);
      }

      return {
        product,
        quantity,
        lineTotal: product.price * quantity,
      };
    });

    const subtotal = checkoutItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const shippingFee = 0;
    const total = subtotal + shippingFee;

    const { data: checkoutSession, error: checkoutError } = await supabaseAdmin
      .from("checkout_sessions")
      .insert({
        shop_id: shop.id,
        status: "draft",
        subtotal,
        shipping_fee: shippingFee,
        total,
      })
      .select("id")
      .single();

    if (checkoutError || !checkoutSession) {
      return NextResponse.json(
        {
          ok: false,
          message: checkoutError?.message ?? "Không tạo được phiên checkout.",
        },
        { status: 500 }
      );
    }

    const itemsToInsert = checkoutItems.map((item) => ({
      checkout_session_id: checkoutSession.id,
      shop_id: shop.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_slug: item.product.slug,
      unit_price: item.product.price,
      quantity: item.quantity,
      line_total: item.lineTotal,
    }));

    const { error: itemError } = await supabaseAdmin
      .from("checkout_items")
      .insert(itemsToInsert);

    if (itemError) {
      return NextResponse.json(
        {
          ok: false,
          message: itemError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      checkoutId: checkoutSession.id,
      redirectUrl: `/checkout/${checkoutSession.id}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo checkout.",
      },
      { status: 500 }
    );
  }
}