import { features } from "@/data/landing";

export default function FeatureSection() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
            Core features
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Xây app theo hướng bán được cho khách thật.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.065] p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.1]"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
                {feature.eyebrow}
              </p>
              <h3 className="mt-5 text-2xl font-black leading-tight">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>

              <div className="mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition group-hover:w-28" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}