import type { AdminCustomerWithOrders } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type CustomerFilter = "all" | "new" | "returning" | "vip" | "inactive";

type CustomerListProps = {
  customers: AdminCustomerWithOrders[];
  totalCustomers: number;
  selectedCustomerId: string | null;
  searchValue: string;
  filter: CustomerFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: CustomerFilter) => void;
  onSelectCustomer: (customerId: string) => void;
};

const filters: {
  value: CustomerFilter;
  label: string;
}[] = [
  { value: "all", label: "Tất cả" },
  { value: "new", label: "Khách mới" },
  { value: "returning", label: "Mua lại" },
  { value: "vip", label: "VIP" },
  { value: "inactive", label: "Cần chăm" },
];

export default function CustomerList({
  customers,
  totalCustomers,
  selectedCustomerId,
  searchValue,
  filter,
  onSearchChange,
  onFilterChange,
  onSelectCustomer,
}: CustomerListProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-stone-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              Danh sách khách
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {customers.length}/{totalCustomers} khách đang hiển thị
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onFilterChange("all");
            }}
            className="rounded-full bg-stone-100 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-stone-200"
          >
            Reset
          </button>
        </div>

        <input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tìm tên, SĐT, địa chỉ, ghi chú..."
          className="mt-4 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
        />

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
                filter === item.value
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-stone-200 bg-white text-slate-600 hover:bg-stone-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[780px] overflow-y-auto p-3">
        {customers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
            <p className="font-black text-slate-950">Không có khách phù hợp</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Thử đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {customers.map((customer) => {
              const isSelected = selectedCustomerId === customer.id;

              return (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => onSelectCustomer(customer.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-black">{customer.name}</p>
                      <p
                        className={`mt-1 text-sm font-semibold ${
                          isSelected ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {customer.phone}
                      </p>
                    </div>

                    <CustomerTag customer={customer} />
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          isSelected ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {Number(customer.total_orders || 0)} đơn hàng
                      </p>
                      <p
                        className={`mt-1 text-xs font-semibold ${
                          isSelected ? "text-slate-400" : "text-slate-400"
                        }`}
                      >
                        Lần mua gần nhất:{" "}
                        {customer.last_order_at
                          ? formatDate(customer.last_order_at)
                          : "Chưa có"}
                      </p>
                    </div>

                    <p className="text-lg font-black">
                      {formatCurrency(Number(customer.total_spent || 0))}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CustomerTag({ customer }: { customer: AdminCustomerWithOrders }) {
  const totalOrders = Number(customer.total_orders || 0);
  const totalSpent = Number(customer.total_spent || 0);

  if (totalSpent >= 1000000) {
    return (
      <Tag
        label="VIP"
        className="border-amber-100 bg-amber-50 text-amber-700"
      />
    );
  }

  if (totalOrders >= 2) {
    return (
      <Tag
        label="Mua lại"
        className="border-emerald-100 bg-emerald-50 text-emerald-700"
      />
    );
  }

  return (
    <Tag label="Mới" className="border-blue-100 bg-blue-50 text-blue-700" />
  );
}

function Tag({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-black ${className}`}
    >
      {label}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
  }).format(new Date(value));
}
