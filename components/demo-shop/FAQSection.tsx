import type { DemoFaq } from "@/types/demo-shop";

type FAQSectionProps = {
  faqs: DemoFaq[];
};

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section
      id="faq"
      className="scroll-mt-32 px-4 py-14 pb-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-[2rem] border border-slate-200 bg-white p-6"
            >
              <p className="text-lg font-black">{item.question}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}