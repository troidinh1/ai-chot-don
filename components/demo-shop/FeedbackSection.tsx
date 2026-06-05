import type { DemoTestimonial } from "@/types/demo-shop";

type FeedbackSectionProps = {
  testimonials: DemoTestimonial[];
};

export default function FeedbackSection({ testimonials }: FeedbackSectionProps) {
  return (
    <section
      id="feedback"
      className="scroll-mt-32 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
            Feedback
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            Khách hàng nói gì?
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5"
            >
              <p className="text-sm leading-7 text-slate-300">
                “{item.content}”
              </p>
              <p className="mt-5 font-black">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}