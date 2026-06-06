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

const statusOptions: {
  value: OrderStatus;
  label: string;
}[] = [
  { value: "new", label: "Đơn mới" },
  { value: "processing", label: "Đang xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

const statusClass: Record<OrderStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  processing: "bg-amber-50 text-amber-700 border-amber-100",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  shipping: "bg-purple-50 text-purple-700 border-purple-100",
  completed: "bg-slate-100 text-slate-700 border-slate-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-100",
};

export default function AdminOrdersClient({
  initialOrders,
}: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<OrderWithItems[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    initialOrders[0]?.id ?? null,
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState<AdminOrderAIResult | null>(null);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) ?? null;
  }, [orders, selectedOrderId]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const newOrders = orders.filter((order) => order.status === "new").length;
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

  return (
    <main className="min-h-screen bg-[#f6f2ec] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <a
              href="/"
              className="text-sm font-black text-slate-500 hover:text-slate-950"
            >
              ← Về trang chủ
            </a>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-slate-950">
              Admin Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
              Quản lý đơn hàng thật từ Supabase và dùng AI để hỗ trợ xử lý đơn,
              tạo tin nhắn xác nhận, cảm ơn khách và gợi ý bán thêm.
            </p>
          </div>

          <a
            href="/demo"
            className="inline-flex w-fit items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
          >
            <span className="solid-white-text">Xem shop mẫu</span>
          </a>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <MetricCard label="Tổng đơn" value={orders.length.toString()} />
          <MetricCard label="Đơn mới" value={newOrders.toString()} />
          <MetricCard
            label="Doanh thu"
            value={formatCurrency(totalRevenue)}
            helper={`${shippingOrders} đơn đang giao`}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="border-b border-stone-200 p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Danh sách đơn hàng
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Đơn mới nhất được hiển thị ở trên cùng.
              </p>
            </div>

            <div className="max-h-[720px] overflow-y-auto p-3">
              {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                  <p className="font-black text-slate-950">
                    Chưa có đơn hàng nào
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Hãy thử đặt hàng từ trang /demo.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setAiResult(null);
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        selectedOrderId === order.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-stone-200 bg-white hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-black">{order.order_code}</p>
                          <p
                            className={`mt-1 text-sm font-semibold ${
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
                        <p
                          className={`text-xs font-bold ${
                            selectedOrderId === order.id
                              ? "text-slate-300"
                              : "text-slate-500"
                          }`}
                        >
                          {formatDate(order.created_at)}
                        </p>

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

          <section className="min-h-[720px] rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6">
            {!selectedOrder ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 text-center">
                <div>
                  <p className="text-lg font-black text-slate-950">
                    Chọn một đơn hàng
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Chi tiết đơn và khu AI sẽ hiển thị ở đây.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 lg:flex-row lg:items-start">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                      Chi tiết đơn hàng
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
                      {selectedOrder.order_code}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Tạo lúc {formatDate(selectedOrder.created_at)}
                    </p>
                  </div>

                  <select
                    value={selectedOrder.status}
                    disabled={isUpdating}
                    onChange={(event) =>
                      handleUpdateStatus(
                        selectedOrder.id,
                        event.target.value as OrderStatus,
                      )
                    }
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-black outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
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
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                    Sản phẩm trong đơn
                  </p>

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

                <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
                        AI xử lý đơn
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                        Trợ lý AI bán hàng
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                        AI sẽ dựa trên thông tin đơn hàng để tạo tin nhắn xác
                        nhận, cảm ơn và gợi ý bán thêm.
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

                  {aiResult && (
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
            className="text-sm font-semibold leading-6 text-slate-600"
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

function getPaymentMethodLabel(value: string) {
  if (value === "cod") return "Thanh toán khi nhận hàng";
  if (value === "bank_transfer") return "Chuyển khoản";
  if (value === "zalo") return "Tư vấn qua Zalo";
  return value;
}
