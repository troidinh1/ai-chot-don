export type DemoShop = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  zalo_url: string | null;
  facebook_url: string | null;
  theme_color: string;
};

export type DemoCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

export type DemoProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  stock: number;
  sold: number;
  badge: string | null;
  isFlashSale: boolean;
  isFeatured: boolean;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
};