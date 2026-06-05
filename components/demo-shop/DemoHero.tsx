import { formatCurrency } from "@/lib/format";
import type { DemoProduct, DemoShop } from "@/types/demo-shop";
import ProductIcon from "./ProductIcon";

type DemoHeroProps = {
  shop: DemoShop;
  products: DemoProduct[];
};

export default function DemoHero({ shop, products }: DemoHeroProps) {
  const heroProducts = products.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#f8f6ef] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="absolute right-[-8%] top-0 h-[420px] w-[420px] rounded-full bg-emerald-100 blur-[130px]" />
      <div className="absolute left-[-8%] bottom-0 h-[420px] w-[420px] rounded-full bg-orange-50 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white via-[#f7fbf8] to-[#eefaf4] p-6 shadow-xl shadow-emerald-100/60 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
                Flash sale online
              </span>

              <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black text-orange-700 shadow-sm">
                Hôm nay giảm đến 35%
              </span>
            </div>

            <h1 className="mt-8 max-w-2xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 sm:text-6xl">
              Săn deal mỹ phẩm, rõ giá, đặt hàng nhanh.
            </h1>

            <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-slate-600">
              {shop.description} Xem sản phẩm, chọn deal, thêm vào giỏ và gửi
              đơn ngay trên điện thoại.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <VoucherBox
                title="Mã giảm"
                value="BEAUTY35"
                accentClass="text-emerald-700"
              />
              <VoucherBox
                title="Freeship"
                value="Từ 299K"
                accentClass="text-orange-700"
              />
              <VoucherBox
                title="Xác nhận"
                value="Trong 24h"
                accentClass="text-sky-700"
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#flash-sale"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-emerald-700"
                style={{ color: "#ffffff" }}
              >
                Xem flash sale
              </a>

              <a
                href={shop.zalo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
                style={{ color: "#020617" }}
              >
                Tư vấn qua Zalo
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-orange-100 bg-[#fff8e9] shadow-xl shadow-orange-100/70">
            <div className="flex flex-col justify-between gap-4 border-b border-orange-100 bg-white p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600">
                  Deal đang hot
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
                  Sản phẩm bán chạy hôm nay
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
                  <p className="mt-1 text-sm font-black text-slate-700">
                    18:00
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroProducts.map((product) => (
                <HeroProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem title="Hàng chính hãng" desc="Thông tin rõ ràng" />
          <TrustItem title="Giá niêm yết" desc="Có giá sale và giá gốc" />
          <TrustItem title="Đặt hàng nhanh" desc="Thêm giỏ trong vài chạm" />
          <TrustItem title="Shop xác nhận" desc="Gọi/Zalo trước khi giao" />
        </div>
      </div>
    </section>
  );
}

function HeroProductCard({ product }: { product: DemoProduct }) {
  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const totalStock = product.sold + product.stock;
  const stockPercent = Math.max(
    12,
    Math.min(100, Math.round((product.stock / totalStock) * 100))
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-orange-50 text-emerald-600">
        <ProductIcon />

        <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-black text-white">
          -{discountPercent}%
        </span>
      </div>

      <div className="p-2">
        <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-slate-950">
          {product.name}
        </h3>

        <div className="mt-2 flex items-end gap-2">
          <p className="text-base font-black text-red-600">
            {formatCurrency(product.price)}
          </p>
          <p className="text-xs font-bold text-slate-400 line-through">
            {formatCurrency(product.oldPrice)}
          </p>
        </div>

        <div className="mt-2 overflow-hidden rounded-full bg-slate-200">
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
      </div>
    </article>
  );
}

function VoucherBox({
  title,
  value,
  accentClass,
}: {
  title: string;
  value: string;
  accentClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${accentClass}`}
      >
        {title}
      </p>
      <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function TrustItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-black text-white">
          ✓
        </span>
        <div>
          <p className="text-sm font-black text-slate-950">{title}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ value }: { value: string }) {
  return (
    <span className="rounded-md bg-white px-1.5 py-1 text-xs font-black text-orange-600">
      {value}
    </span>
  );
}