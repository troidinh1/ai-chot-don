import type { AdminCustomerWithOrders } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type DashboardCustomersFolderProps = {
  customers: AdminCustomerWithOrders[];
};

export default function DashboardCustomersFolder({
  customers,
}: DashboardCustomersFolderProps) {
  const careCustomers = customers
    .filter((customer) => isInactiveCustomer(customer.last_order_at))
    .slice(0, 6);

  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            Khách nên chăm lại
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Ưu tiên khách lâu chưa quay lại hoặc chưa có lần mua gần đây.
          </p>
        </div>

        <a
          href="/admin/customers"
          className="w-fit rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
        >
          <span className="solid-white-text">Mở khách hàng</span>
        </a>
      </div>

      {careCustomers.length === 0 ? (
        <EmptyState text="Chưa có khách cần chăm sóc lại." />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {careCustomers.map((customer) => (
            <article
              key={customer.id}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-slate-950">{customer.name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {customer.phone}
                  </p>
                </div>

                <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                  Cần chăm
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="text-xs font-bold text-slate-500">
                  {Number(customer.total_orders || 0)} đơn hàng
                </p>

                <p className="text-lg font-black text-rose-600">
                  {formatCurrency(Number(customer.total_spent || 0))}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
      <p className="font-black text-slate-950">{text}</p>
    </div>
  );
}

function isInactiveCustomer(lastOrderAt: string | null) {
  if (!lastOrderAt) return true;

  const lastOrderDate = new Date(lastOrderAt).getTime();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - lastOrderDate > thirtyDays;
}
