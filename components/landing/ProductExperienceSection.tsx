import { demoProducts } from "@/data/landing";

export default function ProductExperienceSection() {
  return (
    <section id="product" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
              Product experience
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Một sản phẩm có 2 mặt: khách mua hàng và chủ shop quản lý.
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-slate-400">
            Giao diện được thiết kế mobile-first để khách dễ mua, còn chủ shop
            có dashboard quản lý như một phần mềm thật.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <MobileShopMockup />
          <AdminFlowMockup />
        </div>
      </div>
    </section>
  );
}

function MobileShopMockup() {
  return (
    <div className="soft-card rounded-[2.3rem] p-5">
      <div className="mx-auto max-w-[340px] rounded-[2.6rem] border border-white/15 bg-slate-950 p-3 shadow-2xl">
        <div className="rounded-[2rem] bg-white p-4 text-slate-950">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-black">Luna Beauty</p>
              <p className="text-xs font-bold text-slate-500">
                Mỹ phẩm chính hãng
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Open
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100">
              Deal hôm nay
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight">
              Combo dưỡng da sáng mịn
            </h3>
            <p className="mt-3 text-sm font-semibold text-emerald-50">
              Giảm 20% cho khách đặt trong hôm nay.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {demoProducts.map((product) => (
              <ShopProduct
                key={product.name}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>

          <button className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            Đặt hàng qua form
          </button>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="rounded-2xl bg-emerald-100 px-3 py-3 text-xs font-black text-emerald-800">
              Zalo
            </button>
            <button className="rounded-2xl bg-blue-100 px-3 py-3 text-xs font-black text-blue-800">
              Facebook
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xl font-black">Shop mini trên điện thoại</p>
        <p className="mt-2 text-sm leading-7 text-slate-400">
          Khách vào link là xem sản phẩm, chọn mua và gửi đơn ngay, không cần
          tải app.
        </p>
      </div>
    </div>
  );
}

function ShopProduct({ name, price }: { name: string; price: string }) {
  return (
    <div className="rounded-2xl bg-slate-100 p-2">
      <div className="h-20 rounded-xl bg-gradient-to-br from-slate-200 to-emerald-100" />
      <p className="mt-2 text-xs font-black">{name}</p>
      <p className="text-xs font-black text-emerald-700">{price}</p>
    </div>
  );
}

function AdminFlowMockup() {
  return (
    <div className="soft-card rounded-[2.3rem] p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
          <p className="text-sm font-black text-emerald-300">01 / Products</p>
          <h3 className="mt-3 text-2xl font-black">Đăng sản phẩm nhanh</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Thêm tên, giá, ảnh, tồn kho, mô tả. Sản phẩm tự hiển thị ngoài shop.
          </p>

          <div className="mt-6 space-y-3">
            {["Serum sáng da", "Kem chống nắng", "Toner cấp ẩm"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl bg-black/20 p-3"
              >
                <span className="text-sm font-bold">{item}</span>
                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-black text-emerald-300">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
          <p className="text-sm font-black text-orange-300">02 / Orders</p>
          <h3 className="mt-3 text-2xl font-black">Chốt đơn rõ trạng thái</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Mỗi đơn có mã đơn, thông tin khách, sản phẩm và trạng thái xử lý.
          </p>

          <div className="mt-6 rounded-2xl bg-black/20 p-4">
            <p className="text-xs font-bold text-slate-500">Mã đơn</p>
            <p className="mt-1 text-lg font-black">ACD-2026-0081</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-orange-400 to-emerald-400" />
            </div>
            <div className="mt-3 flex justify-between text-[11px] font-bold text-slate-500">
              <span>Mới</span>
              <span>Xác nhận</span>
              <span>Đang giao</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 md:col-span-2">
          <p className="text-sm font-black text-teal-300">03 / AI Content</p>
          <div className="mt-3 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h3 className="text-2xl font-black">Tạo nội dung bán hàng</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Chủ shop chỉ cần nhập vài thông tin sản phẩm, AI gợi ý caption,
                mô tả, tin nhắn inbox và kịch bản TikTok.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
              <p className="text-xs font-bold text-emerald-200">
                Caption TikTok
              </p>
              <p className="mt-2 text-sm font-bold leading-6">
                “3 dấu hiệu da bạn đang thiếu ẩm và combo dưới 300K giúp phục
                hồi nhanh hơn mỗi ngày...”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}