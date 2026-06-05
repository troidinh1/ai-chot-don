import { roadmapItems } from "@/data/landing";

export default function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl rounded-[2.6rem] border border-white/10 bg-white/[0.065] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
              Build roadmap
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Không làm quá rộng. Build đúng thứ có thể bán trước.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Bắt đầu bằng shop demo đẹp, sau đó thêm giỏ hàng, checkout,
              Supabase, admin thật và AI tools. Khi có khách trả tiền mới nâng
              thành nhiều shop.
            </p>
          </div>

          <div className="grid gap-3">
            {roadmapItems.map((item) => (
              <RoadmapItem
                key={item.number}
                number={item.number}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 text-sm font-black text-slate-950">
          {number}
        </div>
        <div>
          <p className="text-lg font-black">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}