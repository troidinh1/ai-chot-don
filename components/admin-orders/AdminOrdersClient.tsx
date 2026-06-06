"use client";

import { useMemo, useState } from "react";
import type {
  AdminOrderAIResult,
  OrderStatus,
  OrderWithItems,
} from "@/types/database";
import { formatCurrency } from "@/lib/format";

type AdminOrdersClientProps = {
  initialOrders: OrderWithItems[];
};

type StatusFilter = "all" | OrderStatus;

const statusOptions: {
  value: OrderStatus;
  label: string;
  shortLabel: string;
}[] = [
  { value: "new", label: "Đơn mới", shortLabel: "Mới" },
  { value: "processing", label: "Đang xử lý", shortLabel: "Xử lý" },
  { value: "confirmed", label: "Đã xác nhận", shortLabel: "Xác nhận" },
  { value: "shipping", label: "Đang giao", shortLabel: "Giao" },
  { value: "completed", label: "Hoàn thành", shortLabel: "Xong" },
  { value: "cancelled", label: "Đã hủy", shortLabel: "Hủy" },
];

const statusClass: Record<OrderStatus, string> = {
  new: "border-blue-100 bg-blue-50 text-blue-700",
  processing: "border-amber-100 bg-amber-50 text-amber-700",
  confirmed: "border-emerald-100 bg-emerald-50 text-emerald-700",
  shipping: "border-purple-100 bg-purple-50 text-purple-700",
  completed: "border-slate-200 bg-slate-100 text-slate-700",
  cancelled: "border-rose-100 bg-rose-50 text-rose-700",
};

export default function AdminOrdersClient({
  initialOrders,
}: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<OrderWithItems[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    initialOrders[0]?.id ?? null,
  );
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState<AdminOrderAIResult | null>(null);

  const filteredOrders = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return orders.filter((order) => {
      const matchStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchSearch =
        !keyword ||
        order.order_code.toLowerCase().includes(keyword) ||
        order.customer_name.toLowerCase().includes(keyword) ||
        order.customer_phone.toLowerCase().includes(keyword) ||
        order.customer_address.toLowerCase().includes(keyword);

      return matchStatus && matchSearch;
    });
  }, [orders, searchValue, statusFilter]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) ?? null;
  }, [orders, selectedOrderId]);

  const todayOrders = useMemo(() => {
    return orders.filter((order) => isToday(order.created_at));
  }, [orders]);

  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  const todayRevenue = todayOrders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  const newOrders = orders.filter((order) => order.status === "new").length;
  const processingOrders = orders.filter(
    (order) => order.status === "processing",
  ).length;
  const shippingOrders = orders.filter(
    (order) => order.status === "shipping",
  ).length;

  async function handleUpdateStatus(orderId: string, status: OrderStatus) {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không cập nhật được trạng thái đơn.");
        return;
      }

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status } : order,
        ),
      );
    } catch {
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleGenerateAI(orderId: string) {
    setIsGeneratingAI(true);
    setAiResult(null);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/ai`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không tạo được gợi ý AI.");
        return;
      }

      setAiResult(result.data);
    } catch {
      alert("Có lỗi xảy ra khi tạo gợi ý AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Đã copy nội dung.");
    } catch {
      alert("Không copy được. Bạn hãy copy thủ công.");
    }
  }

  function handleSelectOrder(orderId: string) {
    setSelectedOrderId(orderId);
    setAiResult(null);
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
              AI Chốt Đơn Admin
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
              Quản lý đơn hàng
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
              Xem đơn thật từ Supabase, cập nhật trạng thái và dùng trợ lý AI để
              tạo tin nhắn xác nhận, cảm ơn khách, gợi ý bán thêm.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-stone-50"
            >
              Xem shop mẫu
            </a>

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
            >
              <span className="solid-white-text">Về trang chủ</span>
            </a>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Tổng đơn"
            value={orders.length.toString()}
            helper={`${newOrders} đơn mới`}
          />
          <MetricCard
            label="Doanh thu"
            value={formatCurrency(totalRevenue)}
            helper="Không tính đơn đã hủy"
          />
          <MetricCard
            label="Hôm nay"
            value={formatCurrency(todayRevenue)}
            helper={`${todayOrders.length} đơn trong ngày`}
          />
          <MetricCard
            label="Cần xử lý"
            value={(newOrders + processingOrders).toString()}
            helper={`${shippingOrders} đơn đang giao`}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
          <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="border-b border-stone-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                    Đơn hàng
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {filteredOrders.length}/{orders.length} đơn đang hiển thị
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    setStatusFilter("all");
                  }}
                  className="rounded-full bg-stone-100 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-stone-200"
                >
                  Reset
                </button>
              </div>

              <div className="mt-4">
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Tìm mã đơn, tên, SĐT, địa chỉ..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
                />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                <FilterButton
                  active={statusFilter === "all"}
                  label="Tất cả"
                  onClick={() => setStatusFilter("all")}
                />

                {statusOptions.map((status) => (
                  <FilterButton
                    key={status.value}
                    active={statusFilter === status.value}
                    label={status.shortLabel}
                    onClick={() => setStatusFilter(status.value)}
                  />
                ))}
              </div>
            </div>

            <div className="max-h-[780px] overflow-y-auto p-3">
              {filteredOrders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                  <p className="font-black text-slate-950">
                    Không có đơn phù hợp
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Thử đổi bộ lọc hoặc từ khóa tìm kiếm.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => handleSelectOrder(order.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selectedOrderId === order.id
                          ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                          : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate font-black">
                            {order.order_code}
                          </p>
                          <p
                            className={`mt-1 line-clamp-1 text-sm font-semibold ${
                              selectedOrderId === order.id
                                ? "text-slate-300"
                                : "text-slate-500"
                            }`}
                          >
                            {order.customer_name} · {order.customer_phone}
                          </p>
                        </div>

                        <StatusBadge status={order.status} />
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              selectedOrderId === order.id
                                ? "text-slate-300"
                                : "text-slate-500"
                            }`}
                          >
                            {formatDate(order.created_at)}
                          </p>
                          <p
                            className={`mt-1 text-xs font-semibold ${
                              selectedOrderId === order.id
                                ? "text-slate-400"
                                : "text-slate-400"
                            }`}
                          >
                            {order.items.length} sản phẩm
                          </p>
                        </div>

                        <p className="text-lg font-black">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="min-h-[780px] rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6">
            {!selectedOrder ? (
              <div className="flex min-h-[520px] items-center justify-center rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 text-center">
                <div>
                  <p className="text-xl font-black text-slate-950">
                    Chọn một đơn hàng
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Chi tiết đơn và khu AI sẽ hiển thị tại đây.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 lg:flex-row lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                        Chi tiết đơn
                      </p>
                      <StatusBadge status={selectedOrder.status} />
                    </div>

                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
                      {selectedOrder.order_code}
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Tạo lúc {formatDate(selectedOrder.created_at)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => copyText(selectedOrder.customer_phone)}
                      className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-stone-50"
                    >
                      Copy SĐT
                    </button>

                    <select
                      value={selectedOrder.status}
                      disabled={isUpdating}
                      onChange={(event) =>
                        handleUpdateStatus(
                          selectedOrder.id,
                          event.target.value as OrderStatus,
                        )
                      }
                      className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-black text-slate-950 outline-none transition focus:border-slate-950"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <InfoCard
                    title="Khách hàng"
                    lines={[
                      selectedOrder.customer_name,
                      selectedOrder.customer_phone,
                      selectedOrder.customer_address,
                    ]}
                  />

                  <InfoCard
                    title="Thanh toán"
                    lines={[
                      getPaymentMethodLabel(selectedOrder.payment_method),
                      `Tạm tính: ${formatCurrency(selectedOrder.subtotal)}`,
                      `Phí giao hàng: ${formatCurrency(
                        selectedOrder.shipping_fee,
                      )}`,
                      `Tổng tiền: ${formatCurrency(selectedOrder.total)}`,
                    ]}
                  />
                </div>

                {selectedOrder.customer_note && (
                  <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-sm font-black text-amber-800">
                      Ghi chú của khách
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-amber-900">
                      {selectedOrder.customer_note}
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                        Sản phẩm
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {selectedOrder.items.length} sản phẩm trong đơn
                      </p>
                    </div>

                    <p className="text-2xl font-black text-rose-600">
                      {formatCurrency(selectedOrder.total)}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4"
                      >
                        <div>
                          <p className="font-black text-slate-950">
                            {item.product_name}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-500">
                            {formatCurrency(item.unit_price)} × {item.quantity}
                          </p>
                        </div>

                        <p className="font-black text-rose-600">
                          {formatCurrency(item.line_total)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-[2rem] border border-slate-800 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
                        AI xử lý đơn
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                        Trợ lý AI bán hàng
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
                        Dựa trên sản phẩm, tổng tiền, ghi chú và trạng thái đơn
                        để tạo nội dung hỗ trợ shop xử lý nhanh hơn.
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={isGeneratingAI}
                      onClick={() => handleGenerateAI(selectedOrder.id)}
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {isGeneratingAI ? "Đang tạo gợi ý..." : "Tạo gợi ý AI"}
                    </button>
                  </div>

                  {aiResult ? (
                    <div className="mt-5 grid gap-4">
                      <AIResultCard
                        title="Tin nhắn xác nhận đơn"
                        content={aiResult.confirmationMessage}
                        onCopy={() => copyText(aiResult.confirmationMessage)}
                      />

                      <AIResultCard
                        title="Tin nhắn cảm ơn khách"
                        content={aiResult.thankYouMessage}
                        onCopy={() => copyText(aiResult.thankYouMessage)}
                      />

                      <AIResultCard
                        title="Gợi ý bán thêm"
                        content={aiResult.upsellSuggestion}
                        onCopy={() => copyText(aiResult.upsellSuggestion)}
                      />
                    </div>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="font-black text-white">
                        Chưa có gợi ý AI cho đơn này
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                        Bấm “Tạo gợi ý AI” để sinh tin nhắn xác nhận đơn, cảm ơn
                        khách và gợi ý bán thêm theo dữ liệu đơn hàng.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      {helper && (
        <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-stone-200 bg-white text-slate-600 hover:bg-stone-50"
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const label =
    statusOptions.find((item) => item.value === status)?.label ?? status;

  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-black ${statusClass[status]}`}
    >
      {label}
    </span>
  );
}

function InfoCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <p className="text-sm font-black text-slate-950">{title}</p>
      <div className="mt-3 space-y-1">
        {lines.map((line) => (
          <p
            key={line}
            className="break-words text-sm font-semibold leading-6 text-slate-600"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function AIResultCard({
  title,
  content,
  onCopy,
}: {
  title: string;
  content: string;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-black text-white">{title}</p>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white/15"
        >
          Copy
        </button>
      </div>

      <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-200">
        {content}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
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

function getPaymentMethodLabel(value: string) {
  if (value === "cod") return "Thanh toán khi nhận hàng";
  if (value === "bank_transfer") return "Chuyển khoản";
  if (value === "zalo") return "Tư vấn qua Zalo";
  return value;
}
