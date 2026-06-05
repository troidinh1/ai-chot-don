import { formatCurrency } from "@/lib/format";
import type { DemoProduct } from "@/types/demo-shop";
import ProductIcon from "./ProductIcon";

type FlashSaleSectionProps = {
  products: DemoProduct[];
  onAddToCart: (product: DemoProduct) => void;
};

export default function FlashSaleSection({
  products,
  onAddToCart,
}: FlashSaleSectionProps) {
  return (
    <section
      id="flash-sale"
      className="scroll-mt-32 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-orange-100 bg-[#fff8ea] shadow-lg shadow-orange-100/70">
        <div className="flex flex-col justify-between gap-5 border-b border-orange-100 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">
              Flash sale
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
              Săn deal hôm nay
            </h2>
          </div>

          <div className="grid w-fit grid-cols-2 overflow-hidden rounded-2xl border border-orange-100 bg-slate-100 shadow-sm">
            <div className="bg-orange-500 px-5 py-3 text-center text-white">
              <p className="text-xs font-semibold">Chỉ còn</p>
              <div className="mt-1 flex items-center justify-center gap-1">
                <TimeBox value="01" />
                <span className="text-sm font-black">:</span>
                <TimeBox value="18" />
                <span className="text-sm font-black">:</span>
                <TimeBox value="51" />
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 text-center">
              <p className="text-xs font-semibold text-slate-500">
                Sắp diễn ra
              </p>
              <p className="mt-1 text-sm font-black text-slate-700">18:00</p>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-3 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.slice(0, 10).map((product) => (
              <FlashSaleCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="p-5">
            <div className="rounded-[2rem] bg-white p-8 text-center">
              <p className="text-xl font-black text-slate-950">
                Chưa có sản phẩm flash sale
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Bạn có thể bật flash sale trong dữ liệu sản phẩm sau.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FlashSaleCard({
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
    <article className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-[#fff6ea] to-[#f4fbf7] text-orange-500">
        <ProductIcon />

        <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-black text-white">
          SALE
        </span>

        <span className="absolute right-2 top-2 rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-orange-600 shadow-sm">
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

        <div className="mt-3 overflow-hidden rounded-full bg-slate-200">
          <div className="relative h-5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-300"
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
          className="mt-3 w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-orange-600"
          style={{ color: "#ffffff" }}
        >
          Mua ngay
        </button>
      </div>
    </article>
  );
}

function TimeBox({ value }: { value: string }) {
  return (
    <span className="rounded-md bg-white px-1.5 py-1 text-xs font-black text-orange-600">
      {value}
    </span>
  );
}