import AdminOrdersClient from "@/components/admin-orders/AdminOrdersClient";
import { getAdminOrders } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return <AdminOrdersClient initialOrders={orders} />;
}
