import { NextResponse } from "next/server";
import {
  getDemoCategories,
  getDemoFlashSaleProducts,
  getDemoProducts,
  getDemoShop,
} from "@/lib/supabase/queries";

export async function GET() {
  try {
    const [shop, categories, products, flashSaleProducts] = await Promise.all([
      getDemoShop(),
      getDemoCategories(),
      getDemoProducts(),
      getDemoFlashSaleProducts(),
    ]);

    return NextResponse.json({
      ok: true,
      shop,
      categories,
      products,
      flashSaleProducts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}