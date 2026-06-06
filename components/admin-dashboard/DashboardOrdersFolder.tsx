import type { OrderWithItems } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type DashboardOrdersFolderProps = {
  orders: OrderWithItems[];
};

export default function DashboardOrdersFolder({
  orders,
}: DashboardOrdersFolderProps) {
  const priorityOrders = orders
    .filter((order) =>
      ["new", "processing", "confirmed"].includes(order.status),
    )
    .slice(0, 6);

  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            Đơn cần xử lý
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Ưu tiên đơn mới, đang xử lý và đã xác nhận.
          </p>
        </div>

        <a
          href="/admin/orders"
          className="w-fit rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
        >
          <span className="solid-white-text">Mở toàn bộ đơn</span>
        </a>
      </div>

      {priorityOrders.length === 0 ? (
        <EmptyState text="Chưa có đơn nào cần xử lý." />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {priorityOrders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-slate-950">
                    {order.order_code}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {order.customer_name} · {order.customer_phone}
                  </p>
                </div>

                <StatusBadge status={order.status} />
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="text-xs font-bold text-slate-500">
                  {formatDate(order.created_at)} · {order.items.length} sản phẩm
                </p>

                <p className="text-lg font-black text-rose-600">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = getStatusLabel(status);

  return (
    <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
      {label}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
      <p className="font-black text-slate-950">{text}</p>
    </div>
  );
}

function getStatusLabel(value: string) {
  if (value === "new") return "Đơn mới";
  if (value === "processing") return "Đang xử lý";
  if (value === "confirmed") return "Đã xác nhận";
  if (value === "shipping") return "Đang giao";
  if (value === "completed") return "Hoàn thành";
  if (value === "cancelled") return "Đã hủy";
  return value;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}
