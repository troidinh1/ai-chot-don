"use client";

import type { AdminCustomerWithOrders } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type CustomerDetailProps = {
  customer: AdminCustomerWithOrders | null;
  noteDraft: string;
  isSavingNote: boolean;
  onNoteChange: (value: string) => void;
  onSaveNote: () => void;
};

export default function CustomerDetail({
  customer,
  noteDraft,
  isSavingNote,
  onNoteChange,
  onSaveNote,
}: CustomerDetailProps) {
  if (!customer) {
    return (
      <section className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
        <p className="text-xl font-black text-slate-950">Chọn một khách hàng</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Hồ sơ khách, lịch sử mua và ghi chú sẽ hiển thị tại đây.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
            Hồ sơ khách hàng
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
            {customer.name}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {customer.phone}
          </p>
        </div>

        <button
          type="button"
          onClick={() => copyText(customer.phone)}
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-stone-50"
        >
          Copy SĐT
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <InfoCard
          label="Tổng đơn"
          value={Number(customer.total_orders || 0).toString()}
        />
        <InfoCard
          label="Tổng chi tiêu"
          value={formatCurrency(Number(customer.total_spent || 0))}
        />
        <InfoCard
          label="Mua gần nhất"
          value={
            customer.last_order_at
              ? formatDate(customer.last_order_at)
              : "Chưa có"
          }
        />
      </div>

      <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <p className="text-sm font-black text-slate-950">Địa chỉ</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          {customer.address || "Chưa có địa chỉ"}
        </p>
      </div>

      <div className="mt-5">
        <label className="text-sm font-black text-slate-950">
          Ghi chú khách hàng
        </label>
        <textarea
          rows={4}
          value={noteDraft}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Ví dụ: khách thích combo tiết kiệm, nên gọi trước khi giao, khách mua lại tốt..."
          className="mt-2 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
        />

        <button
          type="button"
          disabled={isSavingNote}
          onClick={onSaveNote}
          className="mt-3 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <span className="solid-white-text">
            {isSavingNote ? "Đang lưu..." : "Lưu ghi chú"}
          </span>
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
          Lịch sử đơn hàng
        </p>

        <div className="mt-4 space-y-3">
          {customer.orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center">
              <p className="font-black text-slate-950">Chưa có đơn hàng</p>
            </div>
          ) : (
            customer.orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <div>
                  <p className="font-black text-slate-950">
                    {order.order_code}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {formatDate(order.created_at)} ·{" "}
                    {getOrderStatusLabel(order.status)}
                  </p>
                </div>

                <p className="font-black text-rose-600">
                  {formatCurrency(order.total)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-xl font-black tracking-[-0.03em] text-slate-950">
        {value}
      </p>
    </div>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Đã copy.");
  } catch {
    alert("Không copy được. Bạn hãy copy thủ công.");
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function getOrderStatusLabel(value: string) {
  if (value === "new") return "Đơn mới";
  if (value === "processing") return "Đang xử lý";
  if (value === "confirmed") return "Đã xác nhận";
  if (value === "shipping") return "Đang giao";
  if (value === "completed") return "Hoàn thành";
  if (value === "cancelled") return "Đã hủy";
  return value;
}
