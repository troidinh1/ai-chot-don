import { formatCurrency } from "@/lib/format";
import type { DemoProduct } from "@/types/demo-shop";
import ProductIcon from "./ProductIcon";

type DemoProductGridProps = {
  products: DemoProduct[];
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onAddToCart: (product: DemoProduct) => void;
};

export default function DemoProductGrid({
  products,
  categories,
  activeCategory,
  onCategoryChange,
  onAddToCart,
}: DemoProductGridProps) {
  return (
    <section id="products" className="scroll-mt-32 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              Sản phẩm
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Sản phẩm nổi bật
            </h2>

            <p className="mt-2 text-sm font-semibold text-slate-500">
              {products.length} sản phẩm phù hợp với tìm kiếm của bạn.
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-orange-100 bg-[#fff7e8] px-4 py-3 text-sm font-black text-orange-700">
            Freeship từ 299K
          </div>
        </div>

        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-black transition ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                  style={{
                    color: isActive ? "#ffffff" : "#334155",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <EmptyProducts />
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: DemoProduct;
  onAddToCart: (product: DemoProduct) => void;
}) {
  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const totalStock = product.sold + product.stock;
  const stockPercent = Math.max(
    12,
    Math.min(100, Math.round((product.stock / totalStock) * 100))
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-[#f7fbf8] via-[#f8fbfa] to-[#fff7ec] text-emerald-600">
        <ProductIcon />

        {product.isFlashSale && (
          <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-black text-white">
            Flash
          </span>
        )}

        <span className="absolute right-2 top-2 rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-red-600 shadow-sm">
          -{discountPercent}%
        </span>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 min-h-[44px] text-sm font-bold leading-5 text-slate-950">
          {product.name}
        </h3>

        <div className="mt-2 flex items-end gap-2">
          <p className="text-lg font-black text-red-600">
            {formatCurrency(product.price)}
          </p>

          <p className="text-xs font-bold text-slate-400 line-through">
            {formatCurrency(product.oldPrice)}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs font-bold">
          <span className="text-red-500">-{discountPercent}%</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">Đã bán {product.sold}</span>
        </div>

        <div className="mt-3 overflow-hidden rounded-full bg-slate-100">
          <div className="relative h-5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300"
              style={{ width: `${stockPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-slate-800">
              🔥 Còn {product.stock}/{totalStock} suất
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Mua ngay
        </button>
      </div>
    </article>
  );
}

function EmptyProducts() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
        <SearchEmptyIcon />
      </div>

      <p className="mt-5 text-xl font-black text-slate-950">
        Không tìm thấy sản phẩm
      </p>

      <p className="mt-2 text-sm font-semibold leading-7 text-slate-500">
        Thử nhập từ khóa khác hoặc chọn lại danh mục.
      </p>
    </div>
  );
}

function SearchEmptyIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
      <path d="M8.5 8.5l5 5" />
      <path d="M13.5 8.5l-5 5" />
    </svg>
  );
}