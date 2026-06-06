export default function AdminCustomersHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
          AI Chốt Đơn CRM
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
          Khách hàng
        </h1>

        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
          Quản lý khách hàng thật từ đơn hàng, xem lịch sử mua và dùng AI để
          chăm sóc lại khách, gợi ý ưu đãi, tăng tỷ lệ mua lại.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="/admin/orders"
          className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-stone-50"
        >
          Xem đơn hàng
        </a>

        <a
          href="/admin/products"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
        >
          <span className="solid-white-text">Quản lý sản phẩm</span>
        </a>
      </div>
    </div>
  );
}
