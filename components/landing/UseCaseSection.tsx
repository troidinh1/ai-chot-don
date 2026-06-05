import { shopTypes } from "@/data/landing";

export default function UseCaseSection() {
  return (
    <section id="usecases" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card rounded-[2.3rem] p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
            Target market
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em]">
            Tập trung vào shop nhỏ đang bán qua mạng xã hội.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-400">
            Không cạnh tranh trực tiếp với Shopee. App này giúp shop nhỏ có kênh
            bán riêng, gom thông tin, nhận đơn và chăm sóc khách tốt hơn.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {shopTypes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-black"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.3rem] border border-white/10 bg-white/[0.065] p-6">
          <div className="rounded-[1.8rem] bg-slate-950 p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-black">Customer Journey</p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Từ xem sản phẩm đến chốt đơn
                </p>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                Optimized
              </div>
            </div>

            <div className="space-y-4">
              <JourneyStep
                step="01"
                title="Khách thấy video TikTok/Facebook"
                description="Bấm vào link shop mini trong bio hoặc bài đăng."
              />
              <JourneyStep
                step="02"
                title="Xem sản phẩm và ưu đãi"
                description="Giao diện mobile-first, giá rõ, ảnh đẹp, CTA nổi bật."
              />
              <JourneyStep
                step="03"
                title="Gửi đơn hoặc nhắn Zalo"
                description="Khách đặt hàng nhanh, shop nhận thông tin rõ ràng."
              />
              <JourneyStep
                step="04"
                title="Admin xử lý và chăm sóc lại"
                description="Lưu khách, theo dõi đơn, AI hỗ trợ viết tin nhắn."
              />
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
    <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.055] p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">
        {step}
      </div>
      <div>
        <p className="text-sm font-black">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}