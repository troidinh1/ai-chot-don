const plans = [
  {
    name: "Starter",
    price: "Từ 1.5 triệu",
    description: "Phù hợp shop nhỏ cần một trang bán hàng gọn để gửi khách.",
    features: [
      "Trang bán hàng mobile-first",
      "Hiển thị sản phẩm và giá",
      "Nút Zalo / Facebook / Gọi điện",
      "Form nhận thông tin khách",
    ],
    highlight: false,
    cta: "Bắt đầu gọn",
  },
  {
    name: "Pro",
    price: "Từ 4 triệu",
    description:
      "Phù hợp shop bán đều, cần quản lý đơn hàng và sản phẩm rõ ràng hơn.",
    features: [
      "Tất cả tính năng Starter",
      "Dashboard quản lý đơn",
      "Quản lý sản phẩm",
      "Quản lý khách hàng",
      "Báo cáo doanh thu cơ bản",
    ],
    highlight: true,
    cta: "Gói nên chọn",
  },
  {
    name: "AI Growth",
    price: "Từ 8 triệu",
    description:
      "Phù hợp shop muốn kết hợp bán hàng, nội dung TikTok/Facebook và AI.",
    features: [
      "Tất cả tính năng Pro",
      "AI tạo caption bán hàng",
      "AI tạo mô tả sản phẩm",
      "AI tạo tin nhắn inbox",
      "AI tạo kịch bản video ngắn",
    ],
    highlight: false,
    cta: "Tăng trưởng với AI",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="absolute left-1/2 top-12 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
            Gói triển khai
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl">
            Chọn gói theo mức độ shop cần: có trang bán hàng, có admin, hoặc có
            AI hỗ trợ tăng trưởng.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Phần này nên dùng để bán dịch vụ thật: khách hàng nhìn vào biết ngay
            mình sẽ nhận được gì và nên bắt đầu từ gói nào.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative overflow-hidden rounded-[2.5rem] border p-6 transition duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? "border-emerald-300/30 bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-white/[0.06] shadow-2xl shadow-emerald-500/15"
                  : "border-white/10 bg-white/[0.06] shadow-2xl shadow-black/15"
              }`}
            >
              {plan.highlight && (
                <div className="absolute right-5 top-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-black text-slate-950">
                  Đề xuất
                </div>
              )}

              <div className="mb-8">
                <p className="text-lg font-black text-white">{plan.name}</p>
                <h3 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white">
                  {plan.price}
                </h3>
                <p className="mt-4 min-h-[72px] text-sm leading-7 text-slate-400">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3">
                {plan.features.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                        plan.highlight
                          ? "bg-emerald-400 text-slate-950"
                          : "bg-white text-slate-950"
                      }`}
                    >
                      ✓
                    </span>
                    <span className="text-sm font-semibold leading-6 text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://zalo.me/0896456068"
                target="_blank"
                rel="noreferrer"
                className={plan.highlight ? "btn-primary mt-8 w-full" : "btn-secondary mt-8 w-full"}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 text-center">
          <p className="text-sm font-bold leading-7 text-slate-400">
            Có thể bắt đầu bằng gói nhỏ để có sản phẩm demo, sau đó nâng cấp
            thêm admin, AI, thanh toán, nhiều shop và PWA khi có khách trả tiền.
          </p>
        </div>
      </div>
    </section>
  );
}