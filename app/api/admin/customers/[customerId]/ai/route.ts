import { NextResponse } from "next/server";
import { getAdminCustomerById } from "@/lib/supabase/queries";
import type { AdminCustomerAIResult } from "@/types/database";

type RouteContext = {
  params: Promise<{
    customerId: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { customerId } = await context.params;

    if (!customerId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã khách hàng." },
        { status: 400 }
      );
    }

    const customer = await getAdminCustomerById(customerId);

    const totalOrders = Number(customer.total_orders || 0);
    const totalSpent = Number(customer.total_spent || 0);
    const totalSpentText =
      new Intl.NumberFormat("vi-VN").format(totalSpent) + "đ";

    const firstName =
      customer.name.trim().split(/\s+/).slice(-1)[0] || customer.name;

    const segment = getCustomerSegment(totalOrders, totalSpent, customer.last_order_at);

    const customerSegment = [
      `Phân loại: ${segment.title}`,
      ``,
      `Lý do:`,
      `- Tổng đơn: ${totalOrders}`,
      `- Tổng chi tiêu: ${totalSpentText}`,
      `- Lần mua gần nhất: ${
        customer.last_order_at
          ? new Intl.DateTimeFormat("vi-VN", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(customer.last_order_at))
          : "Chưa có dữ liệu"
      }`,
      customer.note ? `- Ghi chú shop: ${customer.note}` : `- Chưa có ghi chú riêng`,
      ``,
      `Hướng xử lý: ${segment.action}`,
    ].join("\n");

    const careMessage = [
      `Dạ ${firstName} ơi, shop nhắn hỏi thăm mình một chút ạ 💚`,
      ``,
      totalOrders >= 2
        ? `Trước đó mình đã ủng hộ shop ${totalOrders} lần rồi, shop cảm ơn mình nhiều ạ.`
        : `Trước đó mình có quan tâm/đặt hàng tại shop, nên shop muốn gửi mình một gợi ý phù hợp hơn.`,
      ``,
      `Hiện shop đang có một số sản phẩm/combo phù hợp để mình tham khảo. Nếu mình muốn, shop có thể gợi ý nhanh combo tiết kiệm và dễ dùng nhất cho mình nha.`,
      ``,
      `Mình cần shop tư vấn lại sản phẩm nào không ạ?`,
    ].join("\n");

    const offerSuggestion = [
      `Gợi ý ưu đãi/combo cho khách ${customer.name}:`,
      ``,
      segment.offer,
      ``,
      `Cách nhắn không nên quá ép mua. Nên dùng hướng:`,
      `“Dạ shop có combo/ưu đãi phù hợp với nhu cầu trước đó của mình. Nếu mình muốn, shop gửi lựa chọn tiết kiệm nhất để mình tham khảo ạ.”`,
      ``,
      `Mục tiêu: tạo lại cuộc trò chuyện, tăng khả năng mua lại và giữ thiện cảm với khách.`,
    ].join("\n");

    const data: AdminCustomerAIResult = {
      customerSegment,
      careMessage,
      offerSuggestion,
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

function getCustomerSegment(
  totalOrders: number,
  totalSpent: number,
  lastOrderAt: string | null
) {
  const inactive = isInactiveCustomer(lastOrderAt);

  if (totalSpent >= 1000000) {
    return {
      title: "Khách VIP / khách giá trị cao",
      action:
        "Nên chăm sóc riêng, gửi ưu đãi tốt hơn hoặc combo cao cấp để tăng mua lại.",
      offer:
        "Gửi ưu đãi riêng cho khách thân thiết, ví dụ freeship, giảm nhẹ cho combo hoặc quà tặng nhỏ khi mua lại.",
    };
  }

  if (totalOrders >= 2) {
    return {
      title: "Khách mua lại",
      action:
        "Nên gợi ý sản phẩm dùng kèm hoặc combo tiết kiệm vì khách đã có niềm tin với shop.",
      offer:
        "Gợi ý combo dùng kèm sản phẩm đã mua trước đó, hoặc ưu đãi mua lại dành cho khách cũ.",
    };
  }

  if (inactive) {
    return {
      title: "Khách cần chăm sóc lại",
      action:
        "Nên nhắn nhẹ nhàng để mở lại cuộc trò chuyện, không bán quá gấp.",
      offer:
        "Gửi một ưu đãi nhỏ hoặc hỏi lại nhu cầu hiện tại của khách trước khi đề xuất sản phẩm.",
    };
  }

  return {
    title: "Khách mới / khách tiềm năng",
    action:
      "Nên tư vấn đơn giản, rõ lợi ích, giúp khách dễ chọn sản phẩm đầu tiên.",
    offer:
      "Gợi ý sản phẩm bán chạy hoặc combo nhập môn giá dễ mua để khách ra quyết định nhanh hơn.",
  };
}

function isInactiveCustomer(lastOrderAt: string | null) {
  if (!lastOrderAt) return true;

  const lastOrderDate = new Date(lastOrderAt).getTime();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - lastOrderDate > thirtyDays;
}