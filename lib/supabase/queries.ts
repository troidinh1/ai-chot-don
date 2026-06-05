import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Category, ProductWithCategory, Shop } from "@/types/database";

const DEMO_SHOP_SLUG = "luna-beauty";

export async function getDemoShop(): Promise<Shop> {
  const { data, error } = await supabaseAdmin
    .from("shops")
    .select("*")
    .eq("slug", DEMO_SHOP_SLUG)
    .eq("is_active", true)
    .single();

  if (error) {
    throw new Error(`Cannot get demo shop: ${error.message}`);
  }

  if (!data) {
    throw new Error("Demo shop not found");
  }

  return data as Shop;
}

export async function getDemoCategories(): Promise<Category[]> {
  const shop = await getDemoShop();

  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("*")
    .eq("shop_id", shop.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Cannot get demo categories: ${error.message}`);
  }

  return (data ?? []) as Category[];
}

export async function getDemoProducts(): Promise<ProductWithCategory[]> {
  const shop = await getDemoShop();

  const { data, error } = await supabaseAdmin
    .from("products")
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
    .eq("shop_id", shop.id)
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Cannot get demo products: ${error.message}`);
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getDemoFlashSaleProducts(): Promise<
  ProductWithCategory[]
> {
  const shop = await getDemoShop();

  const { data, error } = await supabaseAdmin
    .from("products")
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
    .eq("shop_id", shop.id)
    .eq("is_active", true)
    .eq("is_flash_sale", true)
    .order("sold", { ascending: false });

  if (error) {
    throw new Error(`Cannot get demo flash sale products: ${error.message}`);
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getDemoFeaturedProducts(): Promise<
  ProductWithCategory[]
> {
  const shop = await getDemoShop();

  const { data, error } = await supabaseAdmin
    .from("products")
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
    .eq("shop_id", shop.id)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Cannot get demo featured products: ${error.message}`);
  }

  return (data ?? []) as ProductWithCategory[];
}

import type { CheckoutSessionWithItems } from "@/types/database";

export async function getCheckoutSession(
  checkoutId: string
): Promise<CheckoutSessionWithItems> {
  const { data: session, error: sessionError } = await supabaseAdmin
    .from("checkout_sessions")
    .select("*")
    .eq("id", checkoutId)
    .eq("status", "draft")
    .single();

  if (sessionError || !session) {
    throw new Error(
      sessionError?.message ?? "Không tìm thấy phiên checkout."
    );
  }

  const { data: items, error: itemError } = await supabaseAdmin
    .from("checkout_items")
    .select("*")
    .eq("checkout_session_id", checkoutId)
    .order("created_at", { ascending: true });

  if (itemError) {
    throw new Error(itemError.message);
  }

  return {
    ...session,
    items: items ?? [],
  } as CheckoutSessionWithItems;
}