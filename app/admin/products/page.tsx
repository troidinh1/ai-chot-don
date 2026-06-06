import AdminProductsClient from "@/components/admin-products/AdminProductsClient";
import { getAdminProductsPageData } from "@/lib/supabase/queries";
import type { Category, ProductWithCategory } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const { products, categories } = await getAdminProductsPageData();

  return (
    <AdminProductsClient
      initialProducts={products as ProductWithCategory[]}
      categories={categories as Category[]}
    />
  );
}
