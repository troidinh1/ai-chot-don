import type { AdminDashboardData } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type AdminMetricGridProps = {
  data: AdminDashboardData;
};

export default function AdminMetricGrid({ data }: AdminMetricGridProps) {
  const todayOrders = data.orders.filter((order) => isToday(order.created_at));

  const todayRevenue = todayOrders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  const newOrders = data.orders.filter(
    (order) => order.status === "new",
  ).length;

  const activeProducts = data.products.filter(
    (product) => product.is_active,
  ).length;

  const newCustomers = data.customers.filter((customer) =>
    isToday(customer.created_at),
  ).length;

  const customersNeedCare = data.customers.filter((customer) =>
    isInactiveCustomer(customer.last_order_at),
  ).length;

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <MetricCard
        label="Doanh thu hôm nay"
        value={formatCurrency(todayRevenue)}
        helper={`${todayOrders.length} đơn hôm nay`}
      />
      <MetricCard
        label="Tổng đơn"
        value={data.orders.length.toString()}
        helper={`${newOrders} đơn mới cần xử lý`}
      />
      <MetricCard
        label="Sản phẩm đang bán"
        value={activeProducts.toString()}
        helper={`${data.products.length} sản phẩm trong shop`}
      />
      <MetricCard
        label="Khách hàng mới"
        value={newCustomers.toString()}
        helper={`${data.customers.length} khách trong CRM`}
      />
      <MetricCard
        label="Cần chăm sóc"
        value={customersNeedCare.toString()}
        helper="Khách lâu chưa mua lại"
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
        {helper}
      </p>
    </div>
  );
}

function isToday(value: string) {
  const date = new Date(value);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function isInactiveCustomer(lastOrderAt: string | null) {
  if (!lastOrderAt) return true;

  const lastOrderDate = new Date(lastOrderAt).getTime();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - lastOrderDate > thirtyDays;
}
