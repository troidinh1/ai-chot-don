import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDemoShop } from "@/lib/supabase/queries";
import type { AdminProductFormPayload } from "@/types/database";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminProductFormPayload;
    const shop = await getDemoShop();

    const name = cleanText(body.name);
    const slug = cleanText(body.slug) || slugify(name);

    if (!name) {
      return NextResponse.json(
        { ok: false, message: "Tên sản phẩm không được để trống." },
        { status: 400 }
      );
    }

    if (!body.price || body.price <= 0) {
      return NextResponse.json(
        { ok: false, message: "Giá sản phẩm phải lớn hơn 0." },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabaseAdmin
      .from("products")
      .insert({
        shop_id: shop.id,
        category_id: body.categoryId || null,
        name,
        slug,
        short_description: body.shortDescription || null,
        description: body.description || null,
        price: body.price,
        old_price: body.oldPrice || null,
        stock: body.stock,
        sold: 0,
        image_url: body.imageUrl || null,
        badge: body.badge || null,
        is_featured: body.isFeatured,
        is_flash_sale: body.isFlashSale,
        is_active: body.isActive,
      })
      .select(
        `
        *,
        category:categories (
          id,
          name,
          slug
        )
      `
      )
      .single();

    if (error || !product) {
      return NextResponse.json(
        { ok: false, message: error?.message ?? "Không tạo được sản phẩm." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tạo sản phẩm.",
      },
      { status: 500 }
    );
  }
}