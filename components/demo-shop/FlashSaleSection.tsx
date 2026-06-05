import { formatCurrency } from "@/lib/format";
import type { DemoProduct } from "@/types/demo-shop";
import ProductIcon from "./ProductIcon";

type FlashSaleSectionProps = {
  products: DemoProduct[];
  onAddToCart: () => void;
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
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-orange-100 bg-orange-50 shadow-xl shadow-orange-100">
        <div className="flex flex-col justify-between gap-5 border-b border-orange-100 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">
              Flash sale
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
              Săn deal hôm nay
            </h2>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white">
            <span className="text-sm font-bold text-slate-300">
              Kết thúc sau
            </span>
            <TimeBox value="01" />
            <span className="font-black">:</span>
            <TimeBox value="56" />
            <span className="font-black">:</span>
            <TimeBox value="48" />
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <FlashSaleCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlashSaleCard({
  product,
  onAddToCart,
}: {
  product: DemoProduct;
  onAddToCart: () => void;
}) {
  const soldPercent = Math.max(
    18,
    Math.min(
      100,
      Math.round((product.sold / (product.sold + product.stock)) * 100)
    )
  );

  return (
    <article className="overflow-hidden rounded-[1.6rem] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-40 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-orange-100 to-emerald-100 text-orange-600">
        <ProductIcon />
        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
          SALE
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-orange-600">
          Hot
        </span>
      </div>

      <div className="p-2 pt-4">
        <h3 className="line-clamp-2 min-h-[48px] text-sm font-black leading-6">
          {product.name}
        </h3>

        <div className="mt-2">
          <p className="text-xl font-black text-red-600">
            {formatCurrency(product.price)}
          </p>
          <p className="text-sm font-bold text-slate-400 line-through">
            {formatCurrency(product.oldPrice)}
          </p>
        </div>

        <div className="mt-3 rounded-2xl bg-orange-50 p-3">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="text-orange-600">Đã bán {product.sold}</span>
            <span className="text-slate-500">Còn {product.stock}</span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-orange-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
              style={{ width: `${soldPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onAddToCart}
          className="mt-3 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:scale-[1.01]"
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
    <span className="rounded-lg bg-white px-2 py-1 text-sm font-black text-orange-600">
      {value}
    </span>
  );
}