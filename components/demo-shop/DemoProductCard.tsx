"use client";

import ProductIcon from "./ProductIcon";
import type { DemoProduct } from "@/types/demo-shop";
import { formatCurrency, getDiscountPercent } from "@/lib/format";

type DemoProductCardProps = {
  product: DemoProduct;
  onAddToCart: (product: DemoProduct) => void;
  variant?: "default" | "sale";
};

export default function DemoProductCard({
  product,
  onAddToCart,
  variant = "default",
}: DemoProductCardProps) {
  const percent = getDiscountPercent(product.price, product.oldPrice);
  const stockLeft = Math.max(product.stock - product.sold, 0);
  const progress = Math.min(
    100,
    Math.max(8, (product.sold / Math.max(product.stock, 1)) * 100),
  );

  return (
    <article
      className={`group overflow-hidden rounded-[1.6rem] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] ${
        variant === "sale" ? "border-[#efd9bd]" : "border-[#eadfce]"
      }`}
    >
      <div className="relative bg-[#fffdf8] p-4">
        <div className="relative flex h-44 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-[#effaf3] to-[#fff7ed]">
          <ProductIcon imageUrl={product.imageUrl} name={product.name} />
        </div>

        {percent && (
          <span className="absolute left-4 top-4 rounded-full bg-[#fff1df] px-3 py-1 text-xs font-black text-[#c65a12]">
            -{percent}%
          </span>
        )}

        {product.badge && (
          <span className="absolute right-4 top-4 rounded-full bg-[#07111f] px-3 py-1 text-[11px] font-bold text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="px-4 pb-4 pt-1">
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-black leading-7 tracking-[-0.02em] text-slate-950">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[44px] text-sm font-semibold leading-6 text-slate-500">
          {product.shortDescription ?? "Sản phẩm đang có ưu đãi tại shop."}
        </p>

        <div className="mt-3 flex items-end gap-2">
          <p className="text-2xl font-black tracking-[-0.03em] text-[#e11d48]">
            {formatCurrency(product.price)}
          </p>

          {product.oldPrice && (
            <p className="pb-0.5 text-sm font-semibold text-slate-400 line-through">
              {formatCurrency(product.oldPrice)}
            </p>
          )}
        </div>

        <div className="mt-4">
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#d97706]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-center text-sm font-semibold text-slate-600">
            🔥 Còn {stockLeft}/{product.stock} suất
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#07111f] px-4 py-3.5 text-sm font-black text-white transition hover:bg-slate-800"
        >
          <span className="solid-white-text">Mua ngay</span>
        </button>
      </div>
    </article>
  );
}
