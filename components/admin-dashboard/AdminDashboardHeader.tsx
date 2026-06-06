export default function AdminDashboardHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
          AI Chốt Đơn Command Center
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-slate-950 sm:text-5xl">
          Tổng quan vận hành
        </h1>

        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
          Trung tâm điều hành shop: xem đơn cần xử lý, sản phẩm cần đẩy bán,
          khách cần chăm sóc và nhận gợi ý AI cho việc nên làm hôm nay.
        </p>
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-white px-5 py-4 shadow-xl shadow-slate-900/5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
          Hôm nay
        </p>
        <p className="mt-1 text-lg font-black text-slate-950">
          {new Intl.DateTimeFormat("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date())}
        </p>
      </div>
    </div>
  );
}
