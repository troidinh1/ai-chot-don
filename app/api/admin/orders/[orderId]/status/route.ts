import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { OrderStatus } from "@/types/database";

const validStatuses: OrderStatus[] = [
  "new",
  "processing",
  "confirmed",
  "shipping",
  "completed",
  "cancelled",
];

type RouteContext = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { orderId } = await context.params;
    const body = (await request.json()) as {
      status?: OrderStatus;
    };

    const status = body.status;

    if (!orderId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã đơn hàng." },
        { status: 400 }
      );
    }

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { ok: false, message: "Trạng thái không hợp lệ." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Cập nhật trạng thái đơn thành công.",
      status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật đơn hàng.",
      },
      { status: 500 }
    );
  }
}