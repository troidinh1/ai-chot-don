const feedbacks = [
  {
    name: "Ngọc Anh",
    text: "Mua combo skincare rất nhanh, giá rõ và shop nhắn xác nhận thông tin giao hàng đầy đủ.",
  },
  {
    name: "Minh Thư",
    text: "Trang dễ xem trên điện thoại, sản phẩm nào cũng có giá và ưu đãi rõ ràng.",
  },
  {
    name: "Hoài Linh",
    text: "Đặt hàng tiện hơn nhắn qua inbox vì xem được sản phẩm, combo và tổng tiền ngay.",
  },
];

export default function FeedbackSection() {
  return (
    <section id="feedback" className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#eadfce] bg-[#fffdf8] p-5 shadow-xl shadow-slate-900/5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">
              Feedback
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-950">
              Khách mua dễ hơn khi thông tin rõ ràng
            </h2>
          </div>

          <p className="max-w-xl text-sm font-semibold leading-7 text-slate-500">
            Phần này giúp shop tăng độ tin cậy trước khi khách bấm đặt hàng.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {feedbacks.map((item) => (
            <article
              key={item.name}
              className="rounded-[1.5rem] border border-[#eadfce] bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#07111f] text-sm font-black text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="font-black text-slate-950">{item.name}</p>
                  <p className="text-xs font-bold text-[#c65a12]">
                    ★★★★★ Đã mua hàng
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                “{item.text}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
