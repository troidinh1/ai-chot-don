const launchSteps = [
  {
    number: "01",
    title: "Dựng trang bán hàng",
    description:
      "Thiết kế giao diện riêng cho shop, có sản phẩm, ưu đãi, thông tin liên hệ và CTA đặt hàng rõ ràng.",
    result: "Có link shop để gửi khách",
  },
  {
    number: "02",
    title: "Tối ưu luồng đặt hàng",
    description:
      "Khách xem sản phẩm, điền thông tin và gửi đơn nhanh trên điện thoại, không cần tải app.",
    result: "Giảm hỏi đi hỏi lại",
  },
  {
    number: "03",
    title: "Thiết lập trang quản trị",
    description:
      "Chủ shop quản lý sản phẩm, đơn hàng, khách hàng, trạng thái xử lý và doanh thu cơ bản.",
    result: "Quản lý gọn hơn inbox",
  },
  {
    number: "04",
    title: "Kích hoạt AI bán hàng",
    description:
      "AI hỗ trợ tạo caption, mô tả sản phẩm, tin nhắn trả lời khách và kịch bản video ngắn.",
    result: "Ra nội dung nhanh hơn",
  },
];

const deliverables = [
  "Giao diện shop tối ưu mobile",
  "Trang sản phẩm và ưu đãi",
  "Form đặt hàng nhanh",
  "Nút Zalo / Facebook / Gọi điện",
  "Dashboard quản lý đơn",
  "Công cụ AI hỗ trợ nội dung",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/15 blur-[90px]" />

              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
                  Triển khai thực tế
                </p>

                <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl">
                  Từ shop đang bán thủ công thành hệ thống bán hàng gọn gàng.
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
                  Không làm phần mềm rườm rà. AI Chốt Đơn tập trung vào những gì
                  shop nhỏ cần nhất: có link bán hàng đẹp, khách dễ đặt, chủ shop
                  dễ quản lý và có AI hỗ trợ nội dung.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">
                        ✓
                      </span>
                      <span className="text-sm font-bold text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="tel:0896456068" className="btn-primary">
                    Gọi tư vấn
                  </a>

                  <a
                    href="https://zalo.me/0896456068"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    Nhắn Zalo
                  </a>
                </div>

                <p className="mt-4 text-xs font-semibold leading-6 text-slate-500">
                  Phù hợp để demo cho shop mỹ phẩm, thời trang, đặc sản, đồ ăn
                  vặt, phụ kiện và các mô hình bán qua Facebook/TikTok/Zalo.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:p-8">
              <div className="mb-5 flex items-center justify-between gap-4 px-2">
                <div>
                  <p className="text-sm font-black text-white">
                    Quy trình triển khai
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Rõ từng bước, dễ hiểu với chủ shop
                  </p>
                </div>

                <div className="hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-200 sm:block">
                  Mobile-first
                </div>
              </div>

              <div className="space-y-4">
                {launchSteps.map((item) => (
                  <LaunchStepCard key={item.number} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaunchStepCard({
  number,
  title,
  description,
  result,
}: {
  number: string;
  title: string;
  description: string;
  result: string;
}) {
  return (
    <article className="group rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-slate-950">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20">
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h3 className="text-lg font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </div>

            <div className="w-fit shrink-0 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-black text-emerald-200">
              {result}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}