import { NextResponse } from "next/server";
import { getAdminProductById } from "@/lib/supabase/queries";
import type { AdminProductAIResult } from "@/types/database";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { productId } = await context.params;

    if (!productId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã sản phẩm." },
        { status: 400 }
      );
    }

    const product = await getAdminProductById(productId);

    const categoryName = product.category?.name ?? "sản phẩm";
    const price = new Intl.NumberFormat("vi-VN").format(product.price) + "đ";
    const oldPrice = product.old_price
      ? new Intl.NumberFormat("vi-VN").format(product.old_price) + "đ"
      : null;

    const productDescription = [
      `${product.name} là ${categoryName.toLowerCase()} phù hợp cho khách hàng muốn mua nhanh, xem rõ giá và đặt hàng tiện lợi.`,
      ``,
      `Điểm nổi bật:`,
      `- Giá bán rõ ràng: ${price}${oldPrice ? `, giá gốc ${oldPrice}` : ""}.`,
      `- Phù hợp để bán qua Facebook, TikTok, Zalo hoặc link shop riêng.`,
      `- Thích hợp đưa vào combo/flash sale để tăng tỷ lệ chốt đơn.`,
      ``,
      `Gợi ý hiển thị: nên dùng hình ảnh rõ sản phẩm, mô tả ngắn dễ hiểu và nút đặt hàng nổi bật.`
    ].join("\n");

    const salesCaption = [
      `🔥 ${product.name} đang có sẵn tại shop`,
      ``,
      `Giá chỉ ${price}${oldPrice ? `, tiết kiệm hơn so với giá gốc ${oldPrice}` : ""}.`,
      `Phù hợp cho khách đang cần một lựa chọn dễ mua, dễ dùng và đặt hàng nhanh.`,
      ``,
      `Khách chỉ cần bấm vào link shop, xem sản phẩm, thêm vào giỏ và gửi đơn trong vài chạm.`,
      ``,
      `Inbox/Zalo shop để được tư vấn thêm hoặc đặt hàng trực tiếp trên trang nhé.`
    ].join("\n");

    const upsellSuggestion = [
      `Gợi ý bán thêm cho sản phẩm "${product.name}":`,
      ``,
      `1. Tạo combo cùng sản phẩm liên quan trong nhóm ${categoryName}.`,
      `2. Nếu khách mua 1 sản phẩm, gợi ý thêm sản phẩm dùng kèm để tăng hiệu quả.`,
      `3. Tạo ưu đãi “mua kèm tiết kiệm hơn” để tăng giá trị đơn hàng.`,
      ``,
      `Tin nhắn gợi ý:`,
      `“Dạ sản phẩm này đang được nhiều khách mua kèm với combo chăm sóc cơ bản để tiết kiệm hơn. Nếu mình muốn, shop gợi ý thêm combo phù hợp cho mình ạ.”`
    ].join("\n");

    const data: AdminProductAIResult = {
      productDescription,
      salesCaption,
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
            : "Có lỗi xảy ra khi tạo nội dung AI.",
      },
      { status: 500 }
    );
  }
}