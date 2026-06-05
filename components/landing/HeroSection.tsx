const heroStats = [
  {
    value: "01",
    label: "Link bán hàng riêng",
  },
  {
    value: "AI",
    label: "hỗ trợ nội dung",
  },
  {
    value: "24/7",
    label: "khách xem mọi lúc",
  },
];

const activityItems = [
  {
    title: "Có đơn hàng mới",
    desc: "Khách vừa đặt combo sản phẩm qua form",
    time: "1 phút trước",
  },
  {
    title: "AI đã tạo nội dung",
    desc: "Caption bán hàng cho sản phẩm mới",
    time: "3 phút trước",
  },
  {
    title: "Đơn chờ xác nhận",
    desc: "Ưu tiên gọi khách trong hôm nay",
    time: "5 phút trước",
  },
];

const productCards = [
  {
    name: "Sản phẩm nổi bật",
    price: "189K",
    tag: "Hot",
  },
  {
    name: "Combo bán chạy",
    price: "299K",
    tag: "Best",
  },
  {
    name: "Ưu đãi hôm nay",
    price: "159K",
    tag: "Deal",
  },
];

export default function HeroSection() {
  return (
    <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="absolute left-[-12%] top-20 h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-[130px]" />
      <div className="absolute right-[-10%] top-10 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[140px]" />
      <div className="absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange-400/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-black text-emerald-200 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 pulse-glow" />
              Web app bán hàng mini cho shop nhỏ
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Biến shop online thành{" "}
              <span className="gradient-text">cỗ máy chốt đơn</span> gọn nhẹ.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              AI Chốt Đơn giúp shop có trang bán hàng riêng, nhận đơn qua form,
              quản lý khách hàng trong dashboard và dùng AI để viết nội dung bán
              hàng nhanh hơn trên Facebook, TikTok, Zalo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
             <a href="/demo" className="btn-primary group">
  <span>Xem shop mẫu</span>
  <span className="transition group-hover:translate-x-1">→</span>
</a>

<a href="#pricing" className="btn-secondary">
  Nhận tư vấn triển khai
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
              <p className="text-lg font-black">Shop của bạn</p>
              <p className="text-xs font-bold text-slate-500">
                Trang bán hàng online
              </p>
            </div>

            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Đang mở
            </div>
          </div>

          <div className="rounded-[1.7rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-700 p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              Ưu đãi hôm nay
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight">
              Sản phẩm nổi bật, khách đặt chỉ trong vài chạm
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-emerald-50">
              Hiển thị sản phẩm, giá, ưu đãi và nút đặt hàng rõ ràng.
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
                    Có sẵn tại shop
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

         <button className="btn-dark mt-4 w-full">
  Đặt hàng ngay
</button>
        </div>
      </div>

      <div className="float-medium absolute left-0 top-20 z-30 hidden w-[285px] rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl md:block">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-black">Trợ lý AI bán hàng</p>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-300">
            Sẵn sàng
          </span>
        </div>

        <div className="rounded-2xl bg-black/25 p-3">
          <p className="text-xs font-bold text-slate-400">Yêu cầu</p>
          <p className="mt-2 text-sm font-bold leading-6">
            Viết caption bán hàng cho sản phẩm mới, giọng tự nhiên, dễ chốt đơn.
          </p>
        </div>

        <div className="mt-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3">
          <p className="text-xs font-bold text-emerald-200">AI gợi ý</p>
          <p className="mt-2 text-sm font-bold leading-6">
            “Khách hỏi nhiều nhất tuần này đây ạ. Sản phẩm phù hợp cho ai muốn
            mua nhanh, xem rõ giá và đặt hàng tiện hơn...”
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 right-0 z-30 hidden w-[320px] rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl md:block">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-black">Hoạt động mới</p>
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