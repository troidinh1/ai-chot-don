"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Sản phẩm", href: "#product" },
  { label: "Tính năng", href: "#features" },
  { label: "Phù hợp", href: "#usecases" },
  { label: "Triển khai", href: "#pricing" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-full border border-white/12 bg-[#061326]/72 px-5 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-5">
            <Link
              href="/"
              className="group flex min-w-0 cursor-pointer items-center gap-3"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#19dbc4] text-base font-black text-slate-950 transition duration-200 group-hover:scale-[1.03] group-hover:bg-emerald-300">
                AI
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xl font-extrabold tracking-[-0.03em] text-white">
                  AI Chốt Đơn
                </p>
                <p className="truncate text-sm font-semibold text-slate-400 transition group-hover:text-slate-300">
                  Nền tảng bán hàng mini cho shop nhỏ
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="cursor-pointer rounded-full px-4 py-2.5 text-base font-extrabold text-white transition duration-200 hover:bg-white/10 hover:text-emerald-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center lg:flex">
              <a
                href="https://zalo.me/0768414111"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[220px] cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-emerald-400/15"
              >
                <span className="solid-dark-text">SĐT/Zalo: 0768414111</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/14 lg:hidden"
              aria-label="Mở menu"
            >
              <MenuIcon />
            </button>
          </div>

          {isOpen && (
            <div className="mt-4 border-t border-white/10 pt-4 lg:hidden">
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4">
                <a
                  href="https://zalo.me/0768414111"
                  target="_blank"
                  rel="noreferrer"
                  className="block cursor-pointer rounded-2xl bg-white px-4 py-3 text-center text-sm font-extrabold transition hover:bg-emerald-50"
                >
                  <span className="solid-dark-text">SĐT/Zalo: 0768414111</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}
