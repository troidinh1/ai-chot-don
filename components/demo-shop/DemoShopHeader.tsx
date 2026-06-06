"use client";

import type { DemoShop } from "@/types/demo-shop";

type DemoShopHeaderProps = {
  shop: DemoShop;
  searchValue: string;
  cartCount: number;
  onSearchChange: (value: string) => void;
  onOpenCart: () => void;
};

export default function DemoShopHeader({
  shop,
  searchValue,
  cartCount,
  onSearchChange,
  onOpenCart,
}: DemoShopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/10">
            LB
          </div>

          <div className="min-w-0">
            <p className="truncate text-lg font-black tracking-[-0.03em] text-slate-950">
              {shop.name}
            </p>
            <p className="hidden text-xs font-extrabold text-emerald-700 sm:block">
              Mini shop commerce
            </p>
          </div>
        </a>

        <div className="hidden max-w-[480px] flex-1 items-center rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 shadow-sm lg:flex">
          <span className="mr-3 text-slate-400">⌕</span>
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm serum, combo, skincare..."
            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          <a
            href="#products"
            className="text-sm font-black text-slate-700 transition hover:text-slate-950"
          >
            Sản phẩm
          </a>
          <a
            href="#flash-sale"
            className="text-sm font-black text-slate-700 transition hover:text-slate-950"
          >
            Flash Sale
          </a>
          <a
            href="#feedback"
            className="text-sm font-black text-slate-700 transition hover:text-slate-950"
          >
            Feedback
          </a>
          <a
            href="#faq"
            className="text-sm font-black text-slate-700 transition hover:text-slate-950"
          >
            FAQ
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-stone-50 sm:px-5"
        >
          Giỏ hàng
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-black text-white">
              {cartCount}
            </span>
          )}
        </button>

        <a
          href={shop.zalo_url ?? "https://zalo.me/0768414111"}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-700/15 transition hover:bg-emerald-800 sm:inline-flex"
        >
          <span className="solid-white-text">Chat Zalo</span>
        </a>
      </div>

      <div className="border-t border-stone-100 px-4 py-3 lg:hidden">
        <input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tìm sản phẩm..."
          className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>
    </header>
  );
}
