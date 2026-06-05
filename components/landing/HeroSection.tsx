import Link from "next/link";

const quickStats = [
  { value: "01", label: "Link bán hàng riêng" },
  { value: "AI", label: "Hỗ trợ nội dung" },
  { value: "24/7", label: "Khách xem mọi lúc" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pt-40">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-ai-commerce-bg.png')",
        }}
      />

      <div className="absolute inset-0 bg-[#061326]/48" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(16,214,163,0.2),transparent_30%),radial-gradient(circle_at_80%_45%,rgba(56,213,255,0.14),transparent_28%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111f] to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid min-h-[calc(100vh-9rem)] items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-white/8 px-5 py-2.5 text-sm font-extrabold text-emerald-200 shadow-lg backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              Web app bán hàng mini cho shop nhỏ
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-[0.92] tracking-[-0.06em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl xl:text-[86px]">
              Biến shop online thành{" "}
              <span className="text-emerald-300">cỗ máy chốt đơn</span> gọn nhẹ.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-100/95 sm:text-xl">
              AI Chốt Đơn giúp shop có trang bán hàng riêng, nhận đơn qua form,
              quản lý khách hàng trong dashboard và dùng AI để tạo nội dung bán
              hàng nhanh hơn trên Facebook, TikTok, Zalo.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-extrabold shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <span className="solid-dark-text">Xem shop mẫu</span>
                <span className="solid-dark-text ml-2">→</span>
              </Link>

              <a
                href="https://zalo.me/0768414111"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-md"
              >
                Zalo tư vấn nhanh
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/10 backdrop-blur-md"
                >
                  <p className="text-4xl font-extrabold tracking-[-0.05em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-200">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-[560px]">
              <div className="glow-soft pointer-events-none absolute right-8 top-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-[90px]" />

              <div className="float-soft relative mx-auto max-w-[430px] rounded-[2.6rem] border border-white/12 bg-white/[0.08] p-4 shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="rounded-[2.1rem] bg-[#f8fafc] p-4">
                  <div className="rounded-[1.8rem] border-[7px] border-[#07111f] bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950">
                          Shop của bạn
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          Mini shop online
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-extrabold text-emerald-700">
                        Đang mở
                      </span>
                    </div>

                    <div className="mt-5 rounded-[1.6rem] bg-[#065f46] p-6 text-white">
                      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-100/90">
                        Deal hôm nay
                      </p>

                      <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.04em]">
                        Sản phẩm nổi bật, đặt hàng trong vài chạm
                      </h3>

                      <p className="mt-3 text-sm font-medium leading-6 text-emerald-50/90">
                        Có sản phẩm, giá, ưu đãi và nút đặt hàng rõ ràng.
                      </p>
                    </div>

                    <div className="mt-5 space-y-3">
                      <ProductRow
                        title="Combo bán chạy"
                        subtitle="Có sẵn tại shop"
                      />
                      <ProductRow
                        title="Ưu đãi hôm nay"
                        subtitle="Có sẵn tại shop"
                      />
                    </div>

                    <button className="mt-5 w-full rounded-full bg-[#07111f] px-5 py-4 text-sm font-extrabold text-white">
                      Đặt hàng ngay
                    </button>
                  </div>
                </div>
              </div>

              <div className="float-soft-delay absolute -right-2 top-8 hidden w-[250px] rounded-[1.7rem] border border-white/14 bg-[#092033]/88 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:block">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                  AI gợi ý
                </p>
                <p className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-white">
                  Tạo caption bán hàng
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Viết nội dung tự nhiên, dễ hiểu và có CTA chốt đơn.
                </p>
              </div>

              <div className="float-soft-delay absolute -left-2 bottom-10 hidden w-[250px] rounded-[1.7rem] border border-white/14 bg-[#092033]/88 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:block">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Đơn mới
                  </p>
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                    8 đơn
                  </span>
                </div>

                <p className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-white">
                  Khách vừa đặt hàng
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Đơn được gửi qua form, shop xử lý trong dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3">
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-emerald-200" />
      <div>
        <p className="font-extrabold text-slate-900">{title}</p>
        <p className="text-sm font-medium text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
