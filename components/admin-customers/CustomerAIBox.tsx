"use client";

import type {
  AdminCustomerAIResult,
  AdminCustomerWithOrders,
} from "@/types/database";

type CustomerAIBoxProps = {
  customer: AdminCustomerWithOrders;
  aiResult: AdminCustomerAIResult | null;
  isGenerating: boolean;
  onGenerate: () => void;
};

export default function CustomerAIBox({
  customer,
  aiResult,
  isGenerating,
  onGenerate,
}: CustomerAIBoxProps) {
  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Đã copy nội dung.");
    } catch {
      alert("Không copy được. Bạn hãy copy thủ công.");
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10 sm:p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
            AI chăm sóc khách
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
            Trợ lý CRM bán hàng
          </h3>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
            AI dựa trên lịch sử mua, tổng chi tiêu và ghi chú để phân loại
            khách, tạo tin nhắn chăm sóc lại và gợi ý ưu đãi phù hợp cho{" "}
            <span className="text-white">{customer.name}</span>.
          </p>
        </div>

        <button
          type="button"
          disabled={isGenerating}
          onClick={onGenerate}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isGenerating ? "Đang tạo..." : "Tạo gợi ý AI"}
        </button>
      </div>

      {aiResult ? (
        <div className="mt-5 grid gap-4">
          <AIResultCard
            title="Phân loại khách"
            content={aiResult.customerSegment}
            onCopy={() => copyText(aiResult.customerSegment)}
          />

          <AIResultCard
            title="Tin nhắn chăm sóc lại"
            content={aiResult.careMessage}
            onCopy={() => copyText(aiResult.careMessage)}
          />

          <AIResultCard
            title="Gợi ý ưu đãi / combo"
            content={aiResult.offerSuggestion}
            onCopy={() => copyText(aiResult.offerSuggestion)}
          />
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-black text-white">Chưa có gợi ý AI</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
            Bấm “Tạo gợi ý AI” để sinh phân loại khách, tin nhắn chăm sóc và gợi
            ý ưu đãi phù hợp.
          </p>
        </div>
      )}
    </section>
  );
}

function AIResultCard({
  title,
  content,
  onCopy,
}: {
  title: string;
  content: string;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-black text-white">{title}</p>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white/15"
        >
          Copy
        </button>
      </div>

      <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-200">
        {content}
      </p>
    </div>
  );
}
