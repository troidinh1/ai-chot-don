import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data: shops, error: shopError } = await supabaseAdmin
      .from("shops")
      .select("id, name, slug")
      .limit(5);

    if (shopError) {
      return NextResponse.json(
        {
          ok: false,
          step: "shop_query_error",
          message: shopError.message,
          details: shopError,
        },
        { status: 500 }
      );
    }

    const { data: products, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, name, price, stock, is_flash_sale, is_featured")
      .limit(5);

    if (productError) {
      return NextResponse.json(
        {
          ok: false,
          step: "product_query_error",
          message: productError.message,
          details: productError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Supabase connected successfully",
      shops,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        step: "server_error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}