import { formatCurrency } from "@/lib/format";
import type { DemoProduct, DemoShop } from "@/types/demo-shop";
import ProductIcon from "./ProductIcon";

type DemoHeroProps = {
  shop: DemoShop;
  products: DemoProduct[];
};

export default function DemoHero({ shop, products }: DemoHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute right-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-emerald-200 blur-[120px]" />
      <div className="absolute left-[-10%] bottom-0 h-[420px] w-[420px] rounded-full bg-orange-100 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-black text-orange-700">
            🔥 Flash sale online hôm nay
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl">
            Mỹ phẩm rõ giá, ưu đãi nổi bật, đặt hàng nhanh.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {shop.description} Khách xem sản phẩm, săn deal, thêm vào giỏ và
            gửi thông tin đặt hàng ngay trên điện thoại.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#flash-sale"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-lg transition hover:bg-emerald-700"
              style={{ color: "#ffffff" }}
            >
              Xem flash sale
            </a>

            <a
              href={shop.zalo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
              style={{ color: "#020617" }}
            >
              Tư vấn qua Zalo
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <MiniStat value="8+" label="sản phẩm" />
            <MiniStat value="-35%" label="ưu đãi" />
            <MiniStat value="24h" label="xác nhận" />
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-slate-950 p-4 shadow-2xl shadow-slate-300">
          <div className="rounded-[2rem] bg-white p-5">
            <div className="rounded-[1.6rem] bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-100">
                Deal nổi bật
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Combo skincare sáng da chỉ từ 299K
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-orange-50">
                Chỉ còn vài suất ưu đãi cho khách đặt online hôm nay.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700">
                    <ProductIcon />
                  </div>
                  <p className="mt-3 line-clamp-1 text-sm font-black">
                    {product.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-sm font-black text-red-600">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs font-bold text-slate-400 line-through">
                      {formatCurrency(product.oldPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}