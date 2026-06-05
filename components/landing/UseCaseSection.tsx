import { shopTypes } from "@/data/landing";

const painPoints = [
  {
    title: "Khách hỏi giá nhiều lần",
    description: "Sản phẩm, giá, ưu đãi và cách đặt hàng được gom về một link.",
  },
  {
    title: "Đơn nằm rải rác trong inbox",
    description: "Form đặt hàng giúp shop nhận thông tin khách rõ ràng hơn.",
  },
  {
    title: "Khó chăm sóc khách cũ",
    description: "Thông tin khách hàng được lưu lại để tư vấn và bán lại.",
  },
];

const journeySteps = [
  {
    step: "01",
    title: "Khách thấy sản phẩm",
    description: "Từ TikTok, Facebook, Zalo hoặc Google Maps.",
  },
  {
    step: "02",
    title: "Bấm vào link shop",
    description: "Xem sản phẩm, giá, ưu đãi và feedback trong một trang.",
  },
  {
    step: "03",
    title: "Gửi đơn nhanh",
    description: "Nhập tên, số điện thoại, địa chỉ và ghi chú cần tư vấn.",
  },
  {
    step: "04",
    title: "Shop xử lý trong admin",
    description: "Xem đơn, gọi xác nhận, cập nhật trạng thái và chăm sóc lại.",
  },
];

export default function UseCaseSection() {
  return (
    <section id="usecases" className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute right-0 top-16 h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-[130px]" />
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-300">
              Dành cho ai?
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
              Dành cho shop nhỏ muốn bán chuyên nghiệp hơn nhưng không muốn hệ
              thống phức tạp.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-400 lg:ml-auto">
            AI Chốt Đơn phù hợp với các shop đang bán qua mạng xã hội, cần một
            kênh bán hàng riêng để tăng độ tin tưởng, nhận đơn rõ ràng và giảm
            phụ thuộc vào inbox thủ công.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
                Nhóm shop phù hợp
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
                Bán qua Facebook, TikTok, Zalo đều dùng được.
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {shopTypes.map((item) => (
                <div
                  key={item}
                  className="group rounded-2xl border border-white/10 bg-slate-950/45 p-4 transition hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-slate-950/70"
                >
                  <div className="mb-4 h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/20" />
                  <p className="text-sm font-black text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-[1.8rem] border border-emerald-300/15 bg-emerald-300/10 p-5">
              <p className="text-sm font-black text-emerald-200">
                Không thay thế Shopee
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Đây là kênh bán riêng cho shop: dễ gửi khách, dễ xây thương hiệu
                và dễ chốt đơn từ nội dung TikTok, Facebook, Zalo.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2.4rem] border border-white/10 bg-slate-950/70 p-5 sm:p-6">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black text-white">
                    Vấn đề shop nhỏ thường gặp
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Và cách AI Chốt Đơn xử lý
                  </p>
                </div>

                <div className="w-fit rounded-full bg-orange-400 px-4 py-2 text-xs font-black text-slate-950">
                  Tối ưu chốt đơn
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {painPoints.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                  >
                    <p className="text-base font-black text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-white">
                    Hành trình khách hàng
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Từ xem sản phẩm đến gửi đơn
                  </p>
                </div>

                <div className="hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-200 sm:block">
                  Rõ ràng hơn inbox
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {journeySteps.map((item) => (
                  <JourneyStep key={item.step} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyStep({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-4 rounded-3xl border border-white/10 bg-slate-950/55 p-4 transition hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-slate-950/80">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">
        {step}
      </div>

      <div>
        <p className="text-base font-black text-white">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
    </div>
  );
}