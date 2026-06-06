import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    customerId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { customerId } = await context.params;
    const body = (await request.json()) as {
      note?: string;
    };

    if (!customerId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã khách hàng." },
        { status: 400 }
      );
    }

    const { data: customer, error } = await supabaseAdmin
      .from("customers")
      .update({
        note: typeof body.note === "string" ? body.note.trim() : null,
      })
      .eq("id", customerId)
      .select("*")
      .single();

    if (error || !customer) {
      return NextResponse.json(
        {
          ok: false,
          message: error?.message ?? "Không cập nhật được khách hàng.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      customer,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật khách hàng.",
      },
      { status: 500 }
    );
  }
}