import AdminDashboardClient from "@/components/admin-dashboard/AdminDashboardClient";
import { getAdminDashboardData } from "@/lib/supabase/queries";
import type { AdminDashboardData } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = (await getAdminDashboardData()) as AdminDashboardData;

  return <AdminDashboardClient data={data} />;
}
