"use client";

import { usePathname } from "next/navigation";
import { adminNavItems, isAdminNavActive } from "./admin-nav";

export default function AdminMobileTabbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-2 pt-2 shadow-[0_-12px_30px_rgba(15,23,42,0.10)] backdrop-blur-xl xl:hidden">
      <div className="grid grid-cols-4 gap-1">
        {adminNavItems.map((item) => {
          const active = isAdminNavActive(pathname, item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2.5 text-center transition ${
                active
                  ? "bg-slate-950 text-white"
                  : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="text-base font-black leading-none">
                {item.icon}
              </span>
              <span className="mt-1 text-[11px] font-black leading-none">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
