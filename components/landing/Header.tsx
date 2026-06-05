export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/8 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-5">
        <a href="#" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 font-black text-slate-950 shadow-lg shadow-emerald-500/20">
            AI
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-orange-400" />
          </div>

          <div>
            <p className="text-sm font-black tracking-tight sm:text-base">
              AI Chốt Đơn
            </p>
            <p className="hidden text-xs font-semibold text-slate-400 sm:block">
              Mini shop operating system
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-300 lg:flex">
          <a href="#product" className="transition hover:text-white">
            Sản phẩm
          </a>
          <a href="#features" className="transition hover:text-white">
            Tính năng
          </a>
          <a href="#usecases" className="transition hover:text-white">
            Khách hàng
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Lộ trình
          </a>
        </nav>

        <a
          href="#product"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-100"
        >
          Xem demo
        </a>
      </div>
    </header>
  );
}