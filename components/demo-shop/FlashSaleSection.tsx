"use client";

import DemoProductCard from "./DemoProductCard";
import type { DemoProduct } from "@/types/demo-shop";

type FlashSaleSectionProps = {
  products: DemoProduct[];
  onAddToCart: (product: DemoProduct) => void;
};

export default function FlashSaleSection({
  products,
  onAddToCart,
}: FlashSaleSectionProps) {
  if (products.length === 0) return null;

  return (
    <section id="flash-sale" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#ead7bd] bg-[#fff8ef] shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#ead7bd] bg-white/75 px-5 py-5 sm:px-7 sm:py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c65a12]">
              Flash sale
            </p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Săn deal hôm nay
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Giá tốt trong ngày, số lượng có hạn, chốt đơn nhanh.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 self-start rounded-2xl border border-[#ead7bd] bg-white px-4 py-3 shadow-sm md:self-auto">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Kết thúc sau
            </span>
            <div className="flex items-center gap-1.5 text-sm font-black text-slate-950">
              <TimeBox value="01" />
              <span>:</span>
              <TimeBox value="56" />
              <span>:</span>
              <TimeBox value="48" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:p-6 xl:grid-cols-4">
          {products.map((product) => (
            <DemoProductCard
              key={product.id}
              product={product}
              variant="sale"
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeBox({ value }: { value: string }) {
  return (
    <span className="inline-flex min-w-[38px] items-center justify-center rounded-xl bg-[#fff7ed] px-2.5 py-2 text-sm font-black text-[#c65a12]">
      {value}
    </span>
  );
}
