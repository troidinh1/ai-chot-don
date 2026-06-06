import { NextResponse } from "next/server";
import { getAdminOrderById } from "@/lib/supabase/queries";
import type { AdminOrderAIResult } from "@/types/database";

type RouteContext = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { orderId } = await context.params;

    if (!orderId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã đơn hàng." },
        { status: 400 }
      );
    }

    const order = await getAdminOrderById(orderId);

    const productNames = order.items
      .map((item) => `${item.product_name} x${item.quantity}`)
      .join(", ");

    const total = new Intl.NumberFormat("vi-VN").format(order.total) + "đ";

    const firstName =
      order.customer_name.trim().split(/\s+/).slice(-1)[0] ||
      order.customer_name;

    const confirmationMessage = [
      `Dạ ${firstName} ơi, shop đã nhận được đơn hàng ${order.order_code} của mình rồi ạ.`,
      ``,
      `Sản phẩm: ${productNames}.`,
      `Tổng tiền: ${total}.`,
      `Địa chỉ giao hàng: ${order.customer_address}.`,
      ``,
      `Shop sẽ xử lý đơn và giao hàng sớm nhất. Nếu cần chỉnh thông tin nhận hàng, mình nhắn lại shop giúp em nhé ạ.`
    ].join("\n");

    const thankYouMessage = [
      `Dạ shop cảm ơn ${firstName} đã đặt hàng ạ 💚`,
      ``,
      `Đơn ${order.order_code} của mình đã được ghi nhận. Shop sẽ chuẩn bị hàng cẩn thận và cập nhật khi đơn được giao đi.`,
      ``,
      `Nếu dùng sản phẩm thấy phù hợp, lần sau shop có thể gợi ý thêm combo tiết kiệm hơn cho mình nha.`
    ].join("\n");

    const upsellSuggestion = createUpsellSuggestion(productNames, total);

    const data: AdminOrderAIResult = {
      confirmationMessage,
      thankYouMessage,
      upsellSuggestion,
    };

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo gợi ý AI.",
      },
      { status: 500 }
    );
  }
}

function createUpsellSuggestion(productNames: string, total: string) {
  return [
    `Gợi ý bán thêm cho đơn này:`,
    ``,
    `Khách đang mua: ${productNames}. Tổng đơn hiện tại: ${total}.`,
    ``,
    `Shop có thể nhắn thêm:`,
    `“Dạ hiện shop đang có combo sản phẩm dùng kèm giúp tiết kiệm hơn so với mua lẻ. Nếu mình muốn, shop có thể gợi ý thêm một combo phù hợp với sản phẩm mình đang đặt ạ.”`,
    ``,
    `Mục tiêu: không ép mua thêm, chỉ gợi ý nhẹ để tăng giá trị đơn hàng.`
  ].join("\n");
}