"use client";

import { useState } from "react";
import AdminDashboardHeader from "./AdminDashboardHeader";
import AdminMetricGrid from "./AdminMetricGrid";
import AdminWorkFolders from "./AdminWorkFolders";
import DashboardAIBox from "./DashboardAIBox";
import type {
  AdminDashboardAIResult,
  AdminDashboardData,
} from "@/types/database";

type AdminDashboardClientProps = {
  data: AdminDashboardData;
};

export default function AdminDashboardClient({
  data,
}: AdminDashboardClientProps) {
  const [aiResult, setAiResult] = useState<AdminDashboardAIResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerateAI() {
    setIsGenerating(true);
    setAiResult(null);

    try {
      const response = await fetch("/api/admin/dashboard/ai", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không tạo được gợi ý AI hôm nay.");
        return;
      }

      setAiResult(result.data);
    } catch {
      alert("Có lỗi xảy ra khi tạo gợi ý AI.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminDashboardHeader />

        <AdminMetricGrid data={data} />

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <AdminWorkFolders data={data} />

          <DashboardAIBox
            data={data}
            aiResult={aiResult}
            isGenerating={isGenerating}
            onGenerate={handleGenerateAI}
          />
        </div>
      </div>
    </main>
  );
}
