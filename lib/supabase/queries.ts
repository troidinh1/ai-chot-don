import { supabaseAdmin } from "@/lib/supabase/admin";
import type {
  AdminCustomerWithOrders,
  Category,
  CheckoutSessionWithItems,
  Customer,
  OrderWithItems,
  ProductWithCategory,
  Shop,
} from "@/types/database";

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

export async function getOrderById(orderId: string): Promise<OrderWithItems> {
  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message ?? "Không tìm thấy đơn hàng.");
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return {
    ...order,
    items: items ?? [],
  } as OrderWithItems;
}

export async function getAdminOrders(): Promise<OrderWithItems[]> {
  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(`Cannot get admin orders: ${ordersError.message}`);
  }

  const orderIds = (orders ?? []).map((order) => order.id);

  if (orderIds.length === 0) {
    return [];
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from("order_items")
    .select("*")
    .in("order_id", orderIds)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw new Error(`Cannot get order items: ${itemsError.message}`);
  }

  return (orders ?? []).map((order) => ({
    ...order,
    items: (items ?? []).filter((item) => item.order_id === order.id),
  })) as OrderWithItems[];
}

export async function getAdminOrderById(
  orderId: string
): Promise<OrderWithItems> {
  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message ?? "Không tìm thấy đơn hàng.");
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return {
    ...order,
    items: items ?? [],
  } as OrderWithItems;
}

export async function getAdminProductsPageData() {
  const shop = await getDemoShop();

  const { data: products, error: productsError } = await supabaseAdmin
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
    .order("created_at", { ascending: false });

  if (productsError) {
    throw new Error(`Cannot get admin products: ${productsError.message}`);
  }

  const { data: categories, error: categoriesError } = await supabaseAdmin
    .from("categories")
    .select("*")
    .eq("shop_id", shop.id)
    .order("sort_order", { ascending: true });

  if (categoriesError) {
    throw new Error(`Cannot get admin categories: ${categoriesError.message}`);
  }

  return {
    shop,
    products: products ?? [],
    categories: categories ?? [],
  };
}

export async function getAdminProductById(productId: string) {
  const { data: product, error } = await supabaseAdmin
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
    .eq("id", productId)
    .single();

  if (error || !product) {
    throw new Error(error?.message ?? "Không tìm thấy sản phẩm.");
  }

  return product;
}

export async function getAdminCustomers(): Promise<AdminCustomerWithOrders[]> {
  const shop = await getDemoShop();

  const { data: customers, error: customersError } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("shop_id", shop.id)
    .order("last_order_at", { ascending: false, nullsFirst: false });

  if (customersError) {
    throw new Error(`Cannot get admin customers: ${customersError.message}`);
  }

  const customerIds = (customers ?? []).map((customer) => customer.id);

  if (customerIds.length === 0) {
    return [];
  }

  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .in("customer_id", customerIds)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(`Cannot get customer orders: ${ordersError.message}`);
  }

  return (customers ?? []).map((customer) => ({
    ...customer,
    orders: (orders ?? []).filter((order) => order.customer_id === customer.id),
  })) as AdminCustomerWithOrders[];
}

export async function getAdminCustomerById(
  customerId: string
): Promise<AdminCustomerWithOrders> {
  const { data: customer, error: customerError } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .single();

  if (customerError || !customer) {
    throw new Error(customerError?.message ?? "Không tìm thấy khách hàng.");
  }

  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(ordersError.message);
  }

  return {
    ...customer,
    orders: orders ?? [],
  } as AdminCustomerWithOrders;
}
export async function getAdminDashboardData() {
  const [orders, productsPageData, customers] = await Promise.all([
    getAdminOrders(),
    getAdminProductsPageData(),
    getAdminCustomers(),
  ]);

  return {
    orders,
    products: productsPageData.products,
    customers,
  };
}