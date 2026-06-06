"use client";

import type {
  AdminProductAIResult,
  ProductWithCategory,
} from "@/types/database";

type ProductAIBoxProps = {
  product: ProductWithCategory;
  aiResult: AdminProductAIResult | null;
  isGenerating: boolean;
  onGenerate: () => void;
};

export default function ProductAIBox({
  product,
  aiResult,
  isGenerating,
  onGenerate,
}: ProductAIBoxProps) {
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
            AI nội dung sản phẩm
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
            Trợ lý AI bán hàng
          </h3>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-300">
            AI dựa trên tên, giá, danh mục và mô tả hiện tại để tạo nội dung bán
            hàng cho sản phẩm:{" "}
            <span className="text-white">{product.name}</span>
          </p>
        </div>

        <button
          type="button"
          disabled={isGenerating}
          onClick={onGenerate}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isGenerating ? "Đang tạo..." : "Tạo nội dung AI"}
        </button>
      </div>

      {aiResult ? (
        <div className="mt-5 grid gap-4">
          <AIResultCard
            title="Mô tả sản phẩm"
            content={aiResult.productDescription}
            onCopy={() => copyText(aiResult.productDescription)}
          />

          <AIResultCard
            title="Caption bán hàng"
            content={aiResult.salesCaption}
            onCopy={() => copyText(aiResult.salesCaption)}
          />

          <AIResultCard
            title="Gợi ý combo / upsell"
            content={aiResult.upsellSuggestion}
            onCopy={() => copyText(aiResult.upsellSuggestion)}
          />
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-black text-white">Chưa có nội dung AI</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
            Bấm “Tạo nội dung AI” để sinh mô tả sản phẩm, caption bán hàng và
            gợi ý bán thêm.
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
