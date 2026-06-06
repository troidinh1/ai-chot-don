import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AdminProductFormPayload } from "@/types/database";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

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

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { productId } = await context.params;
    const body = (await request.json()) as AdminProductFormPayload;

    const name = cleanText(body.name);
    const slug = cleanText(body.slug) || slugify(name);

    if (!productId) {
      return NextResponse.json(
        { ok: false, message: "Thiếu mã sản phẩm." },
        { status: 400 }
      );
    }

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
      .update({
        category_id: body.categoryId || null,
        name,
        slug,
        short_description: body.shortDescription || null,
        description: body.description || null,
        price: body.price,
        old_price: body.oldPrice || null,
        stock: body.stock,
        image_url: body.imageUrl || null,
        badge: body.badge || null,
        is_featured: body.isFeatured,
        is_flash_sale: body.isFlashSale,
        is_active: body.isActive,
      })
      .eq("id", productId)
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
        { ok: false, message: error?.message ?? "Không cập nhật được sản phẩm." },
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
            : "Có lỗi xảy ra khi cập nhật sản phẩm.",
      },
      { status: 500 }
    );
  }
}