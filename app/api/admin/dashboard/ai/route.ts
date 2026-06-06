import { NextResponse } from "next/server";
import { getAdminDashboardData } from "@/lib/supabase/queries";
import type { AdminDashboardAIResult } from "@/types/database";

export async function POST() {
  try {
    const data = await getAdminDashboardData();

    const priorityOrder = data.orders.find((order) =>
      ["new", "processing", "confirmed"].includes(order.status)
    );

    const saleProduct = [...data.products]
      .filter((product) => product.is_active)
      .sort((a, b) => {
        const aLeft = Math.max(a.stock - a.sold, 0);
        const bLeft = Math.max(b.stock - b.sold, 0);

        return bLeft - aLeft;
      })[0];

    const careCustomer = data.customers.find((customer) =>
      isInactiveCustomer(customer.last_order_at)
    );

    const orderFocus = priorityOrder
      ? [
          `Nên xử lý trước đơn ${priorityOrder.order_code}.`,
          ``,
          `Khách: ${priorityOrder.customer_name} - ${priorityOrder.customer_phone}.`,
          `Tổng tiền: ${formatCurrency(priorityOrder.total)}.`,
          `Trạng thái hiện tại: ${getOrderStatusLabel(priorityOrder.status)}.`,
          ``,
          `Việc nên làm: xác nhận thông tin giao hàng, kiểm tra sản phẩm trong đơn và cập nhật trạng thái để shop không bỏ sót đơn mới.`,
        ].join("\n")
      : [
          `Hiện chưa có đơn mới cần xử lý gấp.`,
          ``,
          `Việc nên làm: kiểm tra lại các đơn đang giao, chuẩn bị nội dung bán hàng và chăm lại khách cũ để tạo thêm đơn mới.`,
        ].join("\n");

    const productFocus = saleProduct
      ? [
          `Nên đẩy bán sản phẩm: ${saleProduct.name}.`,
          ``,
          `Giá bán: ${formatCurrency(saleProduct.price)}.`,
          `Tồn còn lại ước tính: ${Math.max(
            saleProduct.stock - saleProduct.sold,
            0
          )}.`,
          ``,
          `Gợi ý: đưa sản phẩm này vào flash sale hoặc combo tiết kiệm để tăng tốc độ ra đơn. Nếu sản phẩm có tồn nhiều, nên tạo ưu đãi nhẹ trong ngày.`,
        ].join("\n")
      : [
          `Chưa có sản phẩm đang bán để đề xuất.`,
          ``,
          `Việc nên làm: vào Admin Products để thêm sản phẩm, cập nhật giá, tồn kho và bật trạng thái đang bán.`,
        ].join("\n");

    const customerFocus = careCustomer
      ? [
          `Nên chăm lại khách: ${careCustomer.name}.`,
          ``,
          `SĐT: ${careCustomer.phone}.`,
          `Tổng đơn: ${careCustomer.total_orders}.`,
          `Tổng chi tiêu: ${formatCurrency(Number(careCustomer.total_spent || 0))}.`,
          ``,
          `Gợi ý: nhắn hỏi thăm nhẹ, không bán quá gấp. Có thể gửi một combo/ưu đãi nhỏ để mở lại cuộc trò chuyện.`,
        ].join("\n")
      : [
          `Hiện chưa có khách nào cần chăm lại gấp.`,
          ``,
          `Việc nên làm: tiếp tục theo dõi khách mới phát sinh từ đơn hàng hôm nay và ghi chú nhu cầu của khách để AI gợi ý tốt hơn.`,
        ].join("\n");

    const todayCaption = saleProduct
      ? [
          `🔥 Hôm nay shop có ${saleProduct.name} đang sẵn hàng`,
          ``,
          `Giá rõ ràng, đặt nhanh, shop xác nhận đơn trong ngày.`,
          `Khách chỉ cần vào link shop, xem sản phẩm, thêm vào giỏ và gửi thông tin nhận hàng.`,
          ``,
          `Ai cần shop tư vấn nhanh thì nhắn Zalo/inbox để được gợi ý combo phù hợp nha 💚`,
        ].join("\n")
      : [
          `🔥 Hôm nay shop có nhiều sản phẩm đang sẵn hàng`,
          ``,
          `Khách có thể xem giá, ưu đãi và đặt hàng trực tiếp qua link shop.`,
          `Shop sẽ xác nhận đơn và hỗ trợ tư vấn nhanh qua Zalo/inbox.`,
        ].join("\n");

    const result: AdminDashboardAIResult = {
      orderFocus,
      productFocus,
      customerFocus,
      todayCaption,
    };

    return NextResponse.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo gợi ý dashboard.",
      },
      { status: 500 }
    );
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

function getOrderStatusLabel(value: string) {
  if (value === "new") return "Đơn mới";
  if (value === "processing") return "Đang xử lý";
  if (value === "confirmed") return "Đã xác nhận";
  if (value === "shipping") return "Đang giao";
  if (value === "completed") return "Hoàn thành";
  if (value === "cancelled") return "Đã hủy";
  return value;
}

function isInactiveCustomer(lastOrderAt: string | null) {
  if (!lastOrderAt) return true;

  const lastOrderDate = new Date(lastOrderAt).getTime();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - lastOrderDate > thirtyDays;
}