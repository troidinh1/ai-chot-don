const navItems = [
  {
    label: "Sản phẩm",
    href: "#product",
  },
  {
    label: "Tính năng",
    href: "#features",
  },
  {
    label: "Phù hợp",
    href: "#usecases",
  },
  {
    label: "Triển khai",
    href: "#pricing",
  },
];

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-5">
        <a href="#" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition duration-300 group-hover:scale-105">
            AI
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-orange-400" />
          </div>

          <div>
            <p className="text-sm font-black tracking-tight text-white sm:text-base">
              AI Chốt Đơn
            </p>
            <p className="hidden text-xs font-semibold text-slate-400 sm:block">
              Nền tảng bán hàng mini cho shop nhỏ
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 text-sm font-bold lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-4 py-2 text-slate-300 transition duration-300 hover:bg-emerald-400/10 hover:text-emerald-300"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-300 transition-all duration-300 group-hover:w-6" />
            </a>
          ))}
        </nav>

        <a href="#pricing" className="btn-header-primary">
          Nhận tư vấn
        </a>
      </div>
    </header>
  );
}