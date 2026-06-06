"use client";

import { useState } from "react";
import type { CartLine } from "./DemoShopClient";
import ProductIcon from "./ProductIcon";
import { formatCurrency } from "@/lib/format";

type CartDrawerProps = {
  isOpen: boolean;
  cartLines: CartLine[];
  onClose: () => void;
  onChangeQuantity: (productId: string, quantity: number) => void;
};

export default function CartDrawer({
  isOpen,
  cartLines,
  onClose,
  onChangeQuantity,
}: CartDrawerProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  async function handleGoToCheckout() {
    if (cartLines.length === 0 || isCreatingCheckout) return;

    setIsCreatingCheckout(true);

    try {
      const response = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartLines.map((line) => ({
            productId: line.product.id,
            quantity: line.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không tạo được phiên đặt hàng.");
        return;
      }

      if (!result.redirectUrl) {
        alert("Thiếu đường dẫn checkout.");
        return;
      }

      window.location.href = result.redirectUrl;
    } catch {
      alert("Có lỗi xảy ra khi chuyển sang checkout.");
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[80] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/40 transition ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-5">
            <div>
              <p className="text-2xl font-black text-slate-950">Giỏ hàng</p>
              <p className="mt-1 text-sm font-bold text-slate-500">
                {cartLines.length} sản phẩm đã chọn
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-xl font-black text-slate-700 transition hover:bg-stone-200"
              aria-label="Đóng giỏ hàng"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {cartLines.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <p className="text-lg font-black text-slate-950">
                  Giỏ hàng đang trống
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                  Bấm “Mua ngay” ở sản phẩm để thêm vào giỏ.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartLines.map((line) => (
                  <div
                    key={line.product.id}
                    className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50">
                        <ProductIcon
                          imageUrl={line.product.imageUrl}
                          name={line.product.name}
                          size="sm"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-black leading-6 text-slate-950">
                          {line.product.name}
                        </p>

                        <p className="mt-2 text-lg font-black text-rose-600">
                          {formatCurrency(line.product.price)}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                onChangeQuantity(
                                  line.product.id,
                                  line.quantity - 1,
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 font-black text-slate-800 transition hover:bg-stone-200"
                              aria-label="Giảm số lượng"
                            >
                              -
                            </button>

                            <span className="min-w-8 text-center text-sm font-black text-slate-950">
                              {line.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onChangeQuantity(
                                  line.product.id,
                                  line.quantity + 1,
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 font-black text-white transition hover:bg-slate-800"
                              aria-label="Tăng số lượng"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-sm font-black text-slate-950">
                            {formatCurrency(line.product.price * line.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-stone-200 bg-white p-5">
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">Tạm tính</p>
                <p className="text-xl font-black text-slate-950">
                  {formatCurrency(subtotal)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">
                  Phí giao hàng
                </p>
                <p className="text-sm font-black text-emerald-700">
                  Tính ở bước sau
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={cartLines.length === 0 || isCreatingCheckout}
              onClick={handleGoToCheckout}
              className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <span className="solid-white-text">
                {isCreatingCheckout ? "Đang tạo đơn..." : "Tiến hành đặt hàng"}
              </span>
            </button>

            <p className="mt-3 text-center text-xs font-semibold leading-5 text-slate-500">
              Hệ thống sẽ tạo phiên checkout và chuyển sang trang nhập thông tin
              nhận hàng.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
