const items = [
  {
    title: "Hàng chính hãng",
    desc: "Thông tin sản phẩm rõ ràng",
  },
  {
    title: "Giá niêm yết",
    desc: "Có giá sale và giá gốc",
  },
  {
    title: "Đặt hàng nhanh",
    desc: "Thêm giỏ trong vài chạm",
  },
  {
    title: "Shop xử lý đơn",
    desc: "Gọi/Zalo khi cần xác nhận",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#f7f5ef] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-black text-white shadow-lg shadow-emerald-700/15">
              ✓
            </div>

            <div>
              <p className="font-black text-slate-950">{item.title}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
