import type { AdminCustomerWithOrders } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type AdminCustomersStatsProps = {
  customers: AdminCustomerWithOrders[];
};

export default function AdminCustomersStats({
  customers,
}: AdminCustomersStatsProps) {
  const returningCustomers = customers.filter(
    (customer) => Number(customer.total_orders || 0) >= 2,
  ).length;

  const vipCustomers = customers.filter(
    (customer) => Number(customer.total_spent || 0) >= 1000000,
  ).length;

  const totalSpent = customers.reduce(
    (sum, customer) => sum + Number(customer.total_spent || 0),
    0,
  );

  const inactiveCustomers = customers.filter((customer) =>
    isInactiveCustomer(customer.last_order_at),
  ).length;

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Tổng khách"
        value={customers.length.toString()}
        helper={`${returningCustomers} khách mua lại`}
      />
      <MetricCard
        label="Tổng chi tiêu"
        value={formatCurrency(totalSpent)}
        helper="Từ toàn bộ khách hàng"
      />
      <MetricCard
        label="Khách VIP"
        value={vipCustomers.toString()}
        helper="Tổng chi tiêu từ 1 triệu"
      />
      <MetricCard
        label="Cần chăm sóc"
        value={inactiveCustomers.toString()}
        helper="Chưa mua lại trên 30 ngày"
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
      <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p>
    </div>
  );
}

function isInactiveCustomer(lastOrderAt: string | null) {
  if (!lastOrderAt) return true;

  const lastOrderDate = new Date(lastOrderAt).getTime();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - lastOrderDate > thirtyDays;
}
