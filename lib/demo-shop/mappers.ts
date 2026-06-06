import type { Category, ProductWithCategory, Shop } from "@/types/database";
import type { DemoCategory, DemoProduct, DemoShop } from "@/types/demo-shop";

type ShopWithOptionalFields = Shop & {
  slogan?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  zalo_url?: string | null;
  facebook_url?: string | null;
  phone?: string | null;
  address?: string | null;
  theme_color?: string | null;
};

export function mapShopToDemoShop(shop: Shop): DemoShop {
  const safeShop = shop as ShopWithOptionalFields;

  return {
    id: safeShop.id,
    name: safeShop.name,
    slug: safeShop.slug,

    slogan: safeShop.slogan ?? undefined,
    description: safeShop.description ?? null,

    logo_url: safeShop.logo_url ?? null,
    banner_url: safeShop.banner_url ?? null,
    logoUrl: safeShop.logo_url ?? null,
    bannerUrl: safeShop.banner_url ?? null,

    phone: safeShop.phone ?? null,
    address: safeShop.address ?? null,

    zalo_url: safeShop.zalo_url ?? null,
    facebook_url: safeShop.facebook_url ?? null,
    zaloUrl: safeShop.zalo_url ?? null,
    facebookUrl: safeShop.facebook_url ?? null,

    zalo: safeShop.zalo_url ?? null,
    facebook: safeShop.facebook_url ?? null,

    theme_color: safeShop.theme_color ?? null,
    themeColor: safeShop.theme_color ?? null,

    is_active: safeShop.is_active,
    created_at: safeShop.created_at,
    updated_at: safeShop.updated_at,
  };
}

export function mapCategoryToDemoCategory(category: Category): DemoCategory {
  return {
    id: category.id,
    shop_id: category.shop_id,
    shopId: category.shop_id,

    name: category.name,
    slug: category.slug,
    description: category.description ?? null,

    sort_order: category.sort_order,
    sortOrder: category.sort_order,

    is_active: category.is_active,
    isActive: category.is_active,

    created_at: category.created_at,
    updated_at: category.updated_at,
  };
}

export function mapProductToDemoProduct(
  product: ProductWithCategory
): DemoProduct {
  return {
    id: product.id,

    shopId: product.shop_id,
    shop_id: product.shop_id,

    categoryId: product.category_id ?? null,
    category_id: product.category_id ?? null,

    categoryName: product.category?.name ?? null,
    categorySlug: product.category?.slug ?? null,

    name: product.name,
    slug: product.slug,

    description: product.description ?? null,
    shortDescription: product.short_description ?? null,
    short_description: product.short_description ?? null,

    price: product.price,
    oldPrice: product.old_price ?? null,
    old_price: product.old_price ?? null,

    stock: product.stock,
    sold: product.sold,

    imageUrl: product.image_url ?? null,
    image_url: product.image_url ?? null,

    badge: product.badge ?? null,

    isFeatured: product.is_featured,
    is_featured: product.is_featured,

    isFlashSale: product.is_flash_sale,
    is_flash_sale: product.is_flash_sale,

    status: product.is_active ? "active" : "inactive",

    createdAt: product.created_at,
    updatedAt: product.updated_at,
    created_at: product.created_at,
    updated_at: product.updated_at,
  };
}