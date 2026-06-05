const faqs = [
  {
    q: "Đặt hàng xong có cần gọi xác nhận không?",
    a: "Không bắt buộc. Đơn sẽ được gửi vào hệ thống, shop có thể gọi hoặc nhắn Zalo nếu cần xác nhận thêm thông tin giao hàng.",
  },
  {
    q: "Sản phẩm trên trang có lấy từ database không?",
    a: "Có. Danh mục, sản phẩm, giá, tồn kho và trạng thái đang lấy trực tiếp từ Supabase.",
  },
  {
    q: "Bước tiếp theo của web app là gì?",
    a: "Làm checkout thật để lưu orders, order_items và customers vào Supabase.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#07111f] p-5 text-white shadow-xl shadow-slate-900/10 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
              FAQ
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
              Giúp khách hiểu rõ cách đặt hàng và giúp chủ shop giảm thời gian
              trả lời lặp lại.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((item) => (
              <article
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="font-black text-white">{item.q}</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-300">
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
