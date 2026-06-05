"use client";

import { useState } from "react";
import type { CheckoutSessionWithItems, PaymentMethod } from "@/types/database";
import { formatCurrency } from "@/lib/format";

type CheckoutFormProps = {
  checkout: CheckoutSessionWithItems;
};

export default function CheckoutForm({ checkout }: CheckoutFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmitOrder() {
    if (isSubmitting) return;

    if (!customerName.trim()) {
      alert("Vui lòng nhập họ tên.");
      return;
    }

    if (!customerPhone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }

    if (!customerAddress.trim()) {
      alert("Vui lòng nhập địa chỉ nhận hàng.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkoutId: checkout.id,
          customerName,
          customerPhone,
          customerAddress,
          customerNote,
          paymentMethod,
        }),
      });

      const rawText = await response.text();

      let result: {
        ok?: boolean;
        message?: string;
        redirectUrl?: string;
        step?: string;
      } = {};

      try {
        result = JSON.parse(rawText);
      } catch {
        console.error("API không trả JSON:", rawText);
        alert("API bị lỗi server. Hãy xem terminal để biết lỗi chi tiết.");
        return;
      }

      if (!response.ok || !result.ok) {
        console.error("Create order failed:", result);
        alert(
          result.step
            ? `${result.step}: ${result.message ?? "Không tạo được đơn hàng."}`
            : (result.message ?? "Không tạo được đơn hàng."),
        );
        return;
      }

      if (!result.redirectUrl) {
        alert("Tạo đơn thành công nhưng thiếu đường dẫn chuyển trang.");
        return;
      }

      window.location.href = result.redirectUrl;
    } catch (error) {
      console.error("Submit order client error:", error);
      alert("Không gọi được API tạo đơn hàng. Kiểm tra terminal hoặc Network.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f2ec] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <a
            href="/demo"
            className="text-sm font-black text-slate-600 hover:text-slate-950"
          >
            ← Quay lại shop
          </a>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-slate-950">
            Hoàn tất đặt hàng
          </h1>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Nhập thông tin nhận hàng. Đơn sẽ được lưu vào hệ thống để shop xử
            lý.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="rounded-[2rem] border border-[#eadfce] bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Thông tin khách hàng
              </p>

              <div className="mt-5 grid gap-4">
                <Field
                  label="Họ và tên"
                  placeholder="Ví dụ: Nguyễn Ngọc Anh"
                  value={customerName}
                  onChange={setCustomerName}
                />

                <Field
                  label="Số điện thoại"
                  placeholder="Ví dụ: 09xxxxxxxx"
                  value={customerPhone}
                  onChange={setCustomerPhone}
                />

                <Field
                  label="Địa chỉ nhận hàng"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                  value={customerAddress}
                  onChange={setCustomerAddress}
                />

                <div>
                  <label className="text-sm font-black text-slate-700">
                    Ghi chú cho shop
                  </label>
                  <textarea
                    rows={4}
                    value={customerNote}
                    onChange={(event) => setCustomerNote(event.target.value)}
                    placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
                    className="mt-2 w-full resize-none rounded-2xl border border-[#eadfce] bg-[#fffdf8] px-4 py-3 text-sm font-semibold outline-none focus:border-slate-950"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                Phương thức thanh toán
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <PaymentOption
                  active={paymentMethod === "cod"}
                  title="Thanh toán khi nhận hàng"
                  desc="Khách nhận hàng rồi thanh toán."
                  onClick={() => setPaymentMethod("cod")}
                />

                <PaymentOption
                  active={paymentMethod === "bank_transfer"}
                  title="Chuyển khoản"
                  desc="Shop sẽ gửi thông tin thanh toán."
                  onClick={() => setPaymentMethod("bank_transfer")}
                />
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitOrder}
              className="mt-8 w-full rounded-2xl bg-[#07111f] px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <span className="solid-white-text">
                {isSubmitting ? "Đang gửi đơn..." : "Gửi đơn hàng"}
              </span>
            </button>

            <p className="mt-3 text-center text-xs font-semibold leading-5 text-slate-500">
              Sau khi gửi, đơn hàng sẽ được lưu vào Supabase để shop xử lý.
            </p>
          </section>

          <aside className="h-fit rounded-[2rem] border border-[#eadfce] bg-[#fffdf8] p-5 shadow-xl shadow-slate-900/5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#c65a12]">
              Đơn hàng của bạn
            </p>

            <div className="mt-5 space-y-4">
              {checkout.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-[#eadfce] bg-white p-4"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    🧴
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-black text-slate-950">
                      {item.product_name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      SL: {item.quantity}
                    </p>
                    <p className="mt-1 font-black text-[#e11d48]">
                      {formatCurrency(item.line_total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-[#eadfce] pt-5">
              <SummaryRow label="Tạm tính" value={checkout.subtotal} />
              <SummaryRow label="Phí giao hàng" value={checkout.shipping_fee} />

              <div className="flex items-center justify-between pt-3">
                <p className="text-base font-black text-slate-950">Tổng cộng</p>
                <p className="text-2xl font-black text-[#e11d48]">
                  {formatCurrency(checkout.total)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-black text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[#eadfce] bg-[#fffdf8] px-4 py-3 text-sm font-semibold outline-none focus:border-slate-950"
      />
    </div>
  );
}

function PaymentOption({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-[#eadfce] bg-[#fffdf8] text-slate-950"
      }`}
    >
      <p className="font-black">{title}</p>
      <p
        className={`mt-1 text-sm font-semibold ${
          active ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {desc}
      </p>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-black text-slate-950">
        {formatCurrency(value)}
      </p>
    </div>
  );
}
