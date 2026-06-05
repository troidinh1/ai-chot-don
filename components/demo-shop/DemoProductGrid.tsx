"use client";

import DemoProductCard from "./DemoProductCard";
import type { DemoCategory, DemoProduct } from "@/types/demo-shop";

type DemoProductGridProps = {
  categories: DemoCategory[];
  products: DemoProduct[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  onAddToCart: (product: DemoProduct) => void;
};

export default function DemoProductGrid({
  categories,
  products,
  activeCategory,
  onCategoryChange,
  onAddToCart,
}: DemoProductGridProps) {
  return (
    <section id="products" className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-[#eadfce] bg-[#fffdf8] shadow-xl shadow-slate-900/5">
          <div className="flex flex-col justify-between gap-5 border-b border-[#eadfce] bg-white/80 p-5 sm:p-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">
                Sản phẩm
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-950">
                Tất cả sản phẩm trong shop
              </h2>
            </div>

            <p className="max-w-xl text-sm font-semibold leading-7 text-slate-500">
              Giá, tồn kho và trạng thái sản phẩm đang lấy trực tiếp từ
              Supabase. Đây là nền để làm checkout thật ở bước tiếp theo.
            </p>
          </div>

          <div className="sticky top-[78px] z-20 border-b border-[#eadfce] bg-[#fffdf8]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.slug)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-sm font-black transition ${
                    activeCategory === category.slug
                      ? "border-[#07111f] bg-[#07111f] text-white"
                      : "border-[#eadfce] bg-white text-slate-700 hover:border-[#d8c8b5]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:p-6 xl:grid-cols-4">
            {products.map((product) => (
              <DemoProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="p-6">
              <div className="rounded-[2rem] border border-dashed border-[#d8c8b5] bg-white p-8 text-center">
                <p className="text-lg font-black text-slate-950">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
