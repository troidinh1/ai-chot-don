"use client";

import { formatCurrency } from "@/lib/format";

type MobileCTAProps = {
  cartCount: number;
  subtotal: number;
  onOpenCart: () => void;
};

export default function MobileCTA({
  cartCount,
  subtotal,
  onOpenCart,
}: MobileCTAProps) {
  if (cartCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] lg:hidden">
      <button
        type="button"
        onClick={onOpenCart}
        className="flex w-full items-center justify-between rounded-2xl bg-slate-950 px-5 py-4 text-white"
      >
        <span className="text-sm font-black">
          {cartCount} sản phẩm trong giỏ
        </span>
        <span className="text-sm font-black">{formatCurrency(subtotal)}</span>
      </button>
    </div>
  );
}
