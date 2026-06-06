export type DemoShop = {
  id: string;
  name: string;
  slug: string;
  slogan?: string;
  description: string | null;

  logo_url?: string | null;
  banner_url?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;

  zalo?: string | null;
  facebook?: string | null;
  phone?: string | null;
  address?: string | null;

  zalo_url?: string | null;
  facebook_url?: string | null;
  zaloUrl?: string | null;
  facebookUrl?: string | null;

  theme_color?: string | null;
  themeColor?: string | null;

  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type DemoCategory = {
  id: string;
  shop_id?: string;
  shopId?: string;
  name: string;
  slug: string;
  description?: string | null;
  sort_order?: number;
  sortOrder?: number;
  is_active?: boolean;
  isActive?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type DemoProduct = {
  id: string;

  shopId?: string;
  shop_id?: string;

  category?: string;
  categoryId?: string | null;
  category_id?: string | null;
  categoryName?: string | null;
  categorySlug?: string | null;

  name: string;
  slug: string;

  description: string | null;
  shortDescription: string | null;
  short_description?: string | null;

  price: number;
  oldPrice: number | null;
  old_price?: number | null;

  discountPercent?: number;

  stock: number;
  sold: number;

  imageUrl: string | null;
  image_url?: string | null;
  image?: string | null;
  icon?: string | null;

  badge: string | null;

  isFeatured: boolean;
  is_featured?: boolean;

  isFlashSale: boolean;
  is_flash_sale?: boolean;

  status: "active" | "inactive" | "draft" | string;

  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
};

export type DemoFaq = {
  id: string;
  question: string;
  answer: string;
};

export type DemoTestimonial = {
  id: string;
  name: string;
  role?: string;
  avatar?: string | null;
  rating?: number;
  content: string;
};