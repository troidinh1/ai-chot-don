"use client";

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
  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

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
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#fffdf8] shadow-2xl transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-5">
            <div>
              <p className="text-2xl font-black text-slate-950">Giỏ hàng</p>
              <p className="mt-1 text-sm font-bold text-slate-500">
                {cartLines.length} sản phẩm đã chọn
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6f2ec] text-xl font-black text-slate-700"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {cartLines.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-[#d8c8b5] bg-white p-8 text-center">
                <p className="text-lg font-black text-slate-950">
                  Giỏ hàng đang trống
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Bấm “Mua ngay” ở sản phẩm để thêm vào giỏ.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartLines.map((line) => (
                  <div
                    key={line.product.id}
                    className="rounded-[1.5rem] border border-[#eadfce] bg-white p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-orange-50">
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
                        <p className="mt-2 text-lg font-black text-[#e11d48]">
                          {formatCurrency(line.product.price)}
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              onChangeQuantity(
                                line.product.id,
                                line.quantity - 1,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f2ec] font-black text-slate-800"
                          >
                            -
                          </button>

                          <span className="min-w-8 text-center text-sm font-black">
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
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#07111f] font-black text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[#eadfce] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-black text-slate-500">Tạm tính</p>
              <p className="text-2xl font-black text-slate-950">
                {formatCurrency(subtotal)}
              </p>
            </div>

            <button
              type="button"
              disabled={cartLines.length === 0}
              className="w-full rounded-2xl bg-[#07111f] px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/10 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <span className="solid-white-text">Tiến hành đặt hàng</span>
            </button>

            <p className="mt-3 text-center text-xs font-semibold leading-5 text-slate-500">
              Bước tiếp theo sẽ kết nối checkout thật và lưu đơn vào Supabase.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
