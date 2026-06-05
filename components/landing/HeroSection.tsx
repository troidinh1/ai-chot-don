const heroStats = [
  {
    value: "3 bước",
    label: "tạo shop mini",
  },
  {
    value: "AI",
    label: "viết nội dung",
  },
  {
    value: "Mobile",
    label: "dùng như app",
  },
];

const activityItems = [
  {
    title: "Ngọc Anh vừa đặt hàng",
    desc: "Combo skincare sáng da - 399.000đ",
    time: "1 phút trước",
  },
  {
    title: "AI vừa tạo caption",
    desc: "Caption TikTok cho serum sáng da",
    time: "3 phút trước",
  },
  {
    title: "Shop có 8 đơn chờ gọi",
    desc: "Ưu tiên xác nhận trong hôm nay",
    time: "5 phút trước",
  },
];

const productCards = [
  {
    name: "Serum Glow",
    price: "189K",
    tag: "Hot",
  },
  {
    name: "Toner Fresh",
    price: "129K",
    tag: "New",
  },
  {
    name: "Sun Cream",
    price: "159K",
    tag: "Best",
  },
];

export default function HeroSection() {
  return (
    <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="absolute left-[-12%] top-20 h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-[130px]" />
      <div className="absolute right-[-10%] top-10 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[140px]" />
      <div className="absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange-400/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-black text-emerald-200 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 pulse-glow" />
              AI commerce workspace cho shop nhỏ
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Một nơi để{" "}
              <span className="gradient-text">bán hàng, chốt đơn</span> và tạo
              nội dung bằng AI.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Biến shop Facebook, TikTok, Zalo thành một web app bán hàng mini:
              có trang sản phẩm, form đặt hàng, dashboard quản lý và AI hỗ trợ
              viết caption, mô tả, tin nhắn chốt khách.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#product"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-emerald-500/20 transition hover:scale-[1.03] hover:bg-emerald-100"
              >
                Khám phá giao diện
                <span className="transition group-hover:translate-x-1">→</span>
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-4 text-sm font-black text-white backdrop-blur-2xl transition hover:scale-[1.03] hover:bg-white/14"
              >
                Xem cách hoạt động
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.1]"
                >
                  <p className="text-xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative min-h-[680px] lg:min-h-[720px]">
      <div className="absolute left-1/2 top-4 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.035] backdrop-blur-sm" />

      <div className="float-slow absolute left-1/2 top-8 z-20 w-[310px] -translate-x-1/2 rounded-[2.6rem] border border-white/15 bg-slate-950 p-3 shadow-2xl shadow-black/50 sm:w-[350px]">
        <div className="rounded-[2rem] bg-white p-4 text-slate-950">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-black">Luna Beauty</p>
              <p className="text-xs font-bold text-slate-500">
                Mini shop online
              </p>
            </div>

            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Open
            </div>
          </div>

          <div className="rounded-[1.7rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-700 p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              Flash deal
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight">
              Skincare sáng da cho nàng bận rộn
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-emerald-50">
              Combo bán chạy tuần này, shop gọi xác nhận nhanh.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {productCards.map((product) => (
              <div
                key={product.name}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black">{product.name}</p>
                  <p className="text-xs font-bold text-slate-500">
                    Mỹ phẩm chăm sóc da
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-700">
                    {product.price}
                  </p>
                  <p className="text-[10px] font-black text-orange-500">
                    {product.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-black text-white">
            Đặt hàng ngay
          </button>
        </div>
      </div>

      <div className="float-medium absolute left-0 top-20 z-30 hidden w-[285px] rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl md:block">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-black">AI Command</p>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-300">
            Ready
          </span>
        </div>

        <div className="rounded-2xl bg-black/25 p-3">
          <p className="text-xs font-bold text-slate-400">Yêu cầu</p>
          <p className="mt-2 text-sm font-bold leading-6">
            Viết caption TikTok cho serum sáng da, khách nữ 18-30 tuổi.
          </p>
        </div>

        <div className="mt-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3">
          <p className="text-xs font-bold text-emerald-200">AI trả về</p>
          <p className="mt-2 text-sm font-bold leading-6">
            “Da xỉn màu sau những ngày bận rộn? Đây là combo giúp nàng lấy lại
            vẻ căng mướt...”
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 right-0 z-30 hidden w-[320px] rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl md:block">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-black">Live Activity</p>
          <span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-black text-slate-950">
            8 đơn mới
          </span>
        </div>

        <div className="space-y-3">
          {activityItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black">{item.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-400">
                    {item.desc}
                  </p>
                </div>
                <p className="shrink-0 text-[10px] font-bold text-slate-500">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 h-24 w-[82%] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[70px]" />
    </div>
  );
}