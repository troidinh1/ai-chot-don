import type { Category, ProductWithCategory, Shop } from "@/types/database";
import type { DemoCategory, DemoProduct, DemoShop } from "@/types/demo-shop";

export function mapShopToDemoShop(shop: Shop): DemoShop {
  return {
    id: shop.id,
    name: shop.name,
    slug: shop.slug,
    description: shop.description,
    phone: shop.phone,
    zalo_url: shop.zalo_url,
    facebook_url: shop.facebook_url,
    theme_color: shop.theme_color,
  };
}

export function mapCategoryToDemoCategory(
  category: Category
): DemoCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    sort_order: category.sort_order,
  };
}

export function mapProductToDemoProduct(
  product: ProductWithCategory
): DemoProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.short_description,
    description: product.description,
    price: product.price,
    oldPrice: product.old_price,
    imageUrl: product.image_url,
    stock: product.stock,
    sold: product.sold,
    badge: product.badge,
    isFlashSale: product.is_flash_sale,
    isFeatured: product.is_featured,
    categoryId: product.category_id,
    categoryName: product.category?.name ?? null,
    categorySlug: product.category?.slug ?? null,
  };
}