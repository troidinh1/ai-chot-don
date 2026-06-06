import AdminCustomersClient from "@/components/admin-customers/AdminCustomersClient";
import { getAdminCustomers } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomers();

  return <AdminCustomersClient initialCustomers={customers} />;
}
