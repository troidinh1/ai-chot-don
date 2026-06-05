const items = [
  "Cam kết hàng chính hãng",
  "Gọi xác nhận trước khi giao",
  "Đổi trả nếu có lỗi",
  "Tư vấn nhanh qua Zalo",
];

export default function TrustStrip() {
  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 rounded-[2rem] border border-emerald-100 bg-gradient-to-r from-white via-[#fbfdfb] to-[#f7fff9] p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-black text-white">
              ✓
            </span>
            <p className="text-sm font-black text-slate-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}