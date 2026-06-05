import { features } from "@/data/landing";

const extraFeatures = [
  {
    title: "Trang bán hàng riêng",
    description:
      "Mỗi shop có một giao diện bán hàng đẹp, dễ gửi cho khách qua Facebook, TikTok, Zalo hoặc Google Maps.",
  },
  {
    title: "Form đặt hàng nhanh",
    description:
      "Khách nhập tên, số điện thoại, địa chỉ và ghi chú để shop có đầy đủ thông tin xử lý đơn.",
  },
  {
    title: "Dashboard quản lý",
    description:
      "Chủ shop theo dõi sản phẩm, đơn hàng, khách hàng và doanh thu trong một khu vực quản trị rõ ràng.",
  },
  {
    title: "AI hỗ trợ nội dung",
    description:
      "Tạo caption, mô tả sản phẩm, tin nhắn trả lời khách và kịch bản TikTok chỉ từ vài thông tin cơ bản.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Đăng sản phẩm",
    description: "Shop thêm tên, ảnh, giá, ưu đãi và mô tả sản phẩm.",
  },
  {
    step: "02",
    title: "Khách đặt hàng",
    description: "Khách xem sản phẩm, bấm đặt hàng hoặc nhắn Zalo.",
  },
  {
    step: "03",
    title: "Shop xử lý đơn",
    description: "Admin nhận đơn, xác nhận, cập nhật trạng thái và chăm sóc lại.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[120px]" />
      <div className="absolute bottom-10 right-0 h-[360px] w-[360px] rounded-full bg-teal-400/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
              Tính năng chính
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Những gì shop nhỏ cần để bán hàng chuyên nghiệp hơn.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-400 lg:ml-auto">
            AI Chốt Đơn gom các phần quan trọng của một shop online vào một nơi:
            trang bán hàng, form đặt hàng, quản lý đơn, lưu khách hàng và công
            cụ AI hỗ trợ nội dung bán hàng.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/10 p-6 transition duration-300 hover:-translate-y-2 hover:border-emerald-300/30 ${
                index === 1
                  ? "bg-gradient-to-br from-emerald-400/18 via-white/[0.08] to-teal-400/10 shadow-2xl shadow-emerald-500/10"
                  : "bg-white/[0.065]"
              }`}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl transition group-hover:bg-emerald-300/20" />

              <div className="relative">
                <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
                  {feature.eyebrow}
                </p>

                <h3 className="mt-5 text-2xl font-black leading-tight text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-28" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-5 sm:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
                  Bộ công cụ bán hàng
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  Từ một link bán hàng đến hệ thống quản lý gọn nhẹ.
                </h3>
              </div>

              <div className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-200">
                Mobile-first
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {extraFeatures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/45 p-5 transition hover:bg-slate-950/70"
                >
                  <div className="mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400" />
                  <p className="text-base font-black text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/10 bg-slate-950/60 p-5 sm:p-6">
            <div className="mb-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-300">
                Quy trình sử dụng
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                Dễ hiểu cho cả chủ shop không rành công nghệ.
              </h3>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.055] p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">
                    {item.step}
                  </div>

                  <div>
                    <p className="text-base font-black text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-emerald-300/10 p-5">
              <p className="text-sm font-black text-emerald-200">
                Điểm khác biệt
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Không chỉ làm trang giới thiệu, AI Chốt Đơn hướng đến một web app
                thật: có dữ liệu, có quản trị, có đơn hàng và có AI hỗ trợ bán
                hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}