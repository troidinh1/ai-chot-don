"use client";

import type {
  AdminDashboardAIResult,
  AdminDashboardData,
} from "@/types/database";

type DashboardAIBoxProps = {
  data: AdminDashboardData;
  aiResult: AdminDashboardAIResult | null;
  isGenerating: boolean;
  onGenerate: () => void;
};

export default function DashboardAIBox({
  data,
  aiResult,
  isGenerating,
  onGenerate,
}: DashboardAIBoxProps) {
  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Đã copy nội dung.");
    } catch {
      alert("Không copy được. Bạn hãy copy thủ công.");
    }
  }

  return (
    <aside className="rounded-[2rem] border border-slate-800 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10 sm:p-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
          AI gợi ý hôm nay
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
          Việc nên làm để bán tốt hơn
        </h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
          AI sẽ đọc dữ liệu đơn hàng, sản phẩm, khách hàng để gợi ý việc cần ưu
          tiên trong ngày.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        <MiniStat label="Đơn hàng" value={data.orders.length.toString()} />
        <MiniStat label="Sản phẩm" value={data.products.length.toString()} />
        <MiniStat label="Khách hàng" value={data.customers.length.toString()} />
      </div>

      <button
        type="button"
        disabled={isGenerating}
        onClick={onGenerate}
        className="mt-5 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isGenerating ? "Đang phân tích..." : "Tạo gợi ý AI hôm nay"}
      </button>

      {aiResult ? (
        <div className="mt-5 grid gap-4">
          <AIResultCard
            title="Hôm nay nên xử lý đơn nào?"
            content={aiResult.orderFocus}
            onCopy={() => copyText(aiResult.orderFocus)}
          />
          <AIResultCard
            title="Sản phẩm nào nên đẩy sale?"
            content={aiResult.productFocus}
            onCopy={() => copyText(aiResult.productFocus)}
          />
          <AIResultCard
            title="Khách nào nên chăm lại?"
            content={aiResult.customerFocus}
            onCopy={() => copyText(aiResult.customerFocus)}
          />
          <AIResultCard
            title="Caption gợi ý hôm nay"
            content={aiResult.todayCaption}
            onCopy={() => copyText(aiResult.todayCaption)}
          />
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-black text-white">Chưa có gợi ý hôm nay</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
            Bấm nút phía trên để AI tạo kế hoạch xử lý đơn, đẩy sản phẩm, chăm
            khách và caption bán hàng trong ngày.
          </p>
        </div>
      )}
    </aside>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-sm font-bold text-slate-300">{label}</p>
      <p className="text-lg font-black text-white">{value}</p>
    </div>
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
