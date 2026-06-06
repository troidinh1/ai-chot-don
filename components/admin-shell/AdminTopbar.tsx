"use client";

import { usePathname } from "next/navigation";
import { adminNavItems, isAdminNavActive } from "./admin-nav";

export default function AdminTopbar() {
  const pathname = usePathname();

  const currentPage =
    adminNavItems.find((item) => isAdminNavActive(pathname, item.href)) ??
    adminNavItems[0];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl xl:ml-[280px]">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <a href="/admin" className="flex items-center gap-3 xl:hidden">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-black text-slate-950">
              AI
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-orange-400 ring-2 ring-white" />
            </div>
          </a>

          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
              {currentPage.label}
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-500">
              {currentPage.description}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="/admin"
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            Dashboard
          </a>

          <a
            href="/demo"
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            Shop mẫu
          </a>

          <a
            href="/"
            className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
          >
            <span className="solid-white-text">Trang chủ</span>
          </a>
        </div>

        <a
          href="/"
          className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 lg:hidden"
        >
          <span className="solid-white-text">Home</span>
        </a>
      </div>
    </header>
  );
}
