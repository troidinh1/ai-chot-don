export type Shop = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  phone: string | null;
  zalo_url: string | null;
  facebook_url: string | null;
  address: string | null;
  theme_color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  shop_id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  shop_id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  old_price: number | null;
  image_url: string | null;
  stock: number;
  sold: number;
  badge: string | null;
  is_flash_sale: boolean;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductWithCategory = Product & {
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type Customer = {
  id: string;
  shop_id: string;
  name: string;
  phone: string;
  address: string | null;
  note: string | null;
  total_orders: number;
  total_spent: number;
  last_order_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderStatus =
  | "new"
  | "processing"
  | "confirmed"
  | "shipping"
  | "completed"
  | "cancelled";

export type PaymentMethod = "cod" | "bank_transfer" | "zalo";

export type Order = {
  id: string;
  shop_id: string;
  customer_id: string | null;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_note: string | null;
  status: OrderStatus;
  payment_method: PaymentMethod;
  subtotal: number;
  shipping_fee: number;
  total: number;
  source: string;
  internal_note: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  shop_id: string;
  product_id: string | null;
  product_name: string;
  product_slug: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
};

export type AiGenerationType =
  | "caption"
  | "product_description"
  | "customer_reply"
  | "tiktok_script"
  | "upsell";

export type AiGeneration = {
  id: string;
  shop_id: string;
  type: AiGenerationType;
  input: Record<string, unknown>;
  output: string;
  created_at: string;
};
export type CheckoutSessionStatus = "draft" | "submitted" | "expired";

export type CheckoutSession = {
  id: string;
  shop_id: string;
  status: CheckoutSessionStatus;
  subtotal: number;
  shipping_fee: number;
  total: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
};

export type CheckoutItem = {
  id: string;
  checkout_session_id: string;
  shop_id: string;
  product_id: string | null;
  product_name: string;
  product_slug: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
};

export type CheckoutSessionWithItems = CheckoutSession & {
  items: CheckoutItem[];
};
export type OrderWithItems = Order & {
  items: OrderItem[];
};