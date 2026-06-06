"use client";

import ProductIcon from "./ProductIcon";
import type { DemoProduct, DemoShop } from "@/types/demo-shop";
import { formatCurrency, getDiscountPercent } from "@/lib/format";

type DemoHeroProps = {
  shop: DemoShop;
  products: DemoProduct[];
  totalProducts: number;
  onAddToCart: (product: DemoProduct) => void;
};

export default function DemoHero({
  shop,
  products,
  totalProducts,
  onAddToCart,
}: DemoHeroProps) {
  const mainProduct = products[0];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#fffaf3_0%,#ffffff_46%,#eefdf6_100%)] px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-200/30 blur-[120px]" />
      <div className="absolute -bottom-44 -left-40 h-[360px] w-[360px] rounded-full bg-amber-200/30 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-stretch gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-between rounded-[2rem] border border-white bg-white/95 p-5 shadow-xl shadow-slate-900/5 sm:p-7 lg:min-h-[520px]">
          <div>
            <div className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
              Deal online hôm nay
            </div>

            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.065em] text-slate-950 sm:text-6xl">
              Mỹ phẩm rõ giá, săn deal nhanh, đặt hàng dễ.
            </h1>

            <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-slate-600">
              {shop.description ??
                "Mini shop giúp khách xem sản phẩm, giá sale, tồn kho và gửi đơn nhanh ngay trên điện thoại."}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <HeroMetric value={`${totalProducts}+`} label="sản phẩm" />
              <HeroMetric value="-35%" label="ưu đãi" />
              <HeroMetric value="24h" label="xử lý đơn" />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#flash-sale"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
            >
              <span className="solid-white-text">Xem flash sale</span>
            </a>

            <a
              href={shop.zalo_url ?? "https://zalo.me/0768414111"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-6 py-4 text-sm font-black text-slate-950 shadow-sm transition hover:bg-stone-50"
            >
              Tư vấn qua Zalo
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-3 shadow-2xl shadow-slate-900/15 lg:min-h-[520px]">
          <div className="flex h-full flex-col">
            <div className="rounded-[1.6rem] bg-amber-700 p-6 text-white">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/80">
                    Deal đang hot
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                    Sản phẩm bán chạy hôm nay
                  </h2>
                  <p className="mt-2 text-sm font-bold text-white/85">
                    Hàng có sẵn, giá rõ, đặt nhanh trong vài chạm.
                  </p>
                </div>

                <div className="w-fit rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950">
                  Còn 01 : 56 : 48
                </div>
              </div>
            </div>

            <div className="grid gap-3 rounded-b-[1.6rem] bg-white p-3 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <TopDealCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                  Gợi ý hôm nay
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-slate-200">
                  Chọn combo bán chạy để tiết kiệm hơn và đặt hàng nhanh hơn.
                </p>
              </div>

              {mainProduct && (
                <button
                  type="button"
                  onClick={() => onAddToCart(mainProduct)}
                  className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 shadow-lg transition hover:bg-amber-50 sm:min-w-[220px]"
                >
                  Thêm deal vào giỏ
                </button>
              )}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <DealBenefit title="Giá rõ ràng" />
              <DealBenefit title="Còn hàng" />
              <DealBenefit title="Đặt nhanh" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
      <p className="text-3xl font-black tracking-[-0.04em] text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function TopDealCard({
  product,
  onAddToCart,
}: {
  product: DemoProduct;
  onAddToCart: (product: DemoProduct) => void;
}) {
  const percent = getDiscountPercent(product.price, product.oldPrice);

  return (
    <button
      type="button"
      onClick={() => onAddToCart(product)}
      className="group rounded-2xl border border-stone-200 bg-stone-50 p-3 text-left transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
    >
      <div className="relative flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50">
        <ProductIcon
          imageUrl={product.imageUrl}
          name={product.name}
          size="sm"
        />

        {percent && (
          <span className="absolute right-2 top-2 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-black text-amber-700">
            -{percent}%
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-slate-950">
        {product.name}
      </h3>

      <div className="mt-2 flex items-center gap-2">
        <p className="text-sm font-black text-rose-600">
          {formatCurrency(product.price)}
        </p>

        {product.oldPrice && (
          <p className="text-xs font-bold text-slate-400 line-through">
            {formatCurrency(product.oldPrice)}
          </p>
        )}
      </div>
    </button>
  );
}

function DealBenefit({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-white">
        {title}
      </p>
    </div>
  );
}
