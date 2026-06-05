type DemoShopHeaderProps = {
  shopName: string;
  zaloUrl: string;
  searchQuery: string;
  cartCount: number;
  onSearchChange: (value: string) => void;
  onOpenCart: () => void;
};

export default function DemoShopHeader({
  shopName,
  zaloUrl,
  searchQuery,
  cartCount,
  onSearchChange,
  onOpenCart,
}: DemoShopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-gradient-to-r from-[#fffdf8]/95 via-[#fffaf1]/95 to-[#f4fff8]/95 shadow-sm shadow-emerald-100/50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex min-w-[175px] shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-md shadow-slate-200">
            LB
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black text-slate-950">
              {shopName}
            </p>
            <p className="truncate text-xs font-bold text-emerald-700">
              Mini shop commerce
            </p>
          </div>
        </a>

        <div className="relative hidden w-[300px] shrink-0 md:block lg:w-[350px] xl:w-[390px]">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>

          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm sản phẩm..."
            className="h-12 w-full rounded-2xl border border-emerald-100 bg-white pl-12 pr-4 text-sm font-bold text-slate-900 outline-none shadow-sm shadow-emerald-100/30 transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-2 text-sm font-bold text-slate-700 lg:flex">
          <a
            href="#products"
            className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            Sản phẩm
          </a>

          <a
            href="#flash-sale"
            className="whitespace-nowrap rounded-full bg-orange-50 px-3 py-2 text-orange-700 transition hover:bg-orange-100"
          >
            Flash Sale
          </a>

          <a
            href="#feedback"
            className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            Feedback
          </a>

          <a
            href="#faq"
            className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            FAQ
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative hidden h-12 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 shadow-sm shadow-slate-100 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 md:inline-flex"
        >
          <CartIcon />
          <span>Giỏ hàng</span>
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-black text-white shadow-sm">
            {cartCount}
          </span>
        </button>

        <a
          href={zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-emerald-700 md:inline-flex"
          style={{ color: "#ffffff" }}
        >
          Chat Zalo
        </a>
      </div>

      <div className="mx-auto block max-w-7xl px-4 pb-3 sm:px-6 md:hidden lg:px-8">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>

          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm sản phẩm..."
            className="h-12 w-full rounded-2xl border border-emerald-100 bg-white pl-12 pr-4 text-sm font-bold text-slate-900 outline-none shadow-sm shadow-emerald-100/30 transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6h15l-2 9H8L6 6z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}