import { metrics, orders } from "@/data/landing";

export default function DashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute -left-8 top-8 hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl xl:block">
        <p className="text-xs font-bold text-slate-400">AI vừa tạo caption</p>
        <p className="mt-2 max-w-[210px] text-sm font-black leading-6">
          “Da sáng hơn mỗi ngày với combo skincare bán chạy nhất tuần này...”
        </p>
      </div>

      <div className="glass-card app-shadow rounded-[2.2rem] p-3">
        <div className="rounded-[1.7rem] border border-white/10 bg-[#0b1020] p-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-black">Dashboard Luna Beauty</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Tổng quan bán hàng hôm nay
              </p>
            </div>

            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-black text-emerald-300">
              Live
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-4"
              >
                <p className="text-xs font-bold text-slate-500">
                  {item.label}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-2xl font-black">{item.value}</p>
                  <p className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-black text-emerald-300">
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-black">Đơn hàng mới</p>
                <p className="text-xs font-bold text-emerald-300">Xem tất cả</p>
              </div>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.customer}
                    className="rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black">{order.customer}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {order.product}
                        </p>
                      </div>

                      <p className="text-right text-sm font-black text-emerald-300">
                        {order.amount}
                      </p>
                    </div>

                    <div className="mt-3 inline-flex rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-slate-300">
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/18 to-teal-400/8 p-4">
              <p className="text-sm font-black">AI Sales Assistant</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Nhập sản phẩm, AI sẽ tạo caption, mô tả, tin nhắn inbox và kịch
                bản TikTok.
              </p>

              <div className="mt-5 rounded-2xl bg-black/25 p-3">
                <p className="text-xs font-bold text-slate-500">Input</p>
                <p className="mt-2 text-sm font-bold leading-6">
                  Serum sáng da, giá 189k, khách nữ 18-30 tuổi
                </p>
              </div>

              <div className="mt-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3">
                <p className="text-xs font-bold text-emerald-200">Output AI</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">
                  “Da xỉn màu, thiếu sức sống? Thử serum sáng da đang được hội
                  chị em săn nhiều tuần này...”
                </p>
              </div>

              <button className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
                Tạo nội dung mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 right-2 hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400 font-black text-slate-950">
            8
          </div>
          <div>
            <p className="text-sm font-black">Đơn chờ xác nhận</p>
            <p className="text-xs font-bold text-slate-400">
              Ưu tiên gọi trong 15 phút
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}