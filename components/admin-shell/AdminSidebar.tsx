"use client";

import { usePathname } from "next/navigation";
import { adminNavItems, isAdminNavActive } from "./admin-nav";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-slate-200 bg-white/95 backdrop-blur-xl xl:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-5 py-5">
          <a href="/admin" className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20">
              AI
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-orange-400 ring-2 ring-white" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-lg font-black tracking-[-0.04em] text-slate-950">
                AI Chốt Đơn
              </p>
              <p className="text-xs font-bold text-slate-500">
                Commerce Operating System
              </p>
            </div>
          </a>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          {adminNavItems.map((item) => {
            const active = isAdminNavActive(pathname, item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                className={`group flex items-start gap-3 rounded-2xl border px-4 py-4 transition ${
                  active
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                    : "border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                    active
                      ? "bg-white text-slate-950"
                      : "bg-slate-100 text-slate-700 group-hover:bg-white"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-black">{item.label}</span>
                  <span
                    className={`mt-1 block text-xs font-semibold leading-5 ${
                      active ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {item.description}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
              AI Sales Assistant
            </p>
            <p className="mt-2 text-sm font-black leading-6 text-slate-950">
              Hệ thống hỗ trợ shop xử lý đơn, viết nội dung và chăm khách.
            </p>
          </div>

          <a
            href="/demo"
            className="mt-3 flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            Xem shop mẫu
          </a>
        </div>
      </div>
    </aside>
  );
}
