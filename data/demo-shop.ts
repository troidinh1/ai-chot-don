import type { DemoFaq, DemoProduct, DemoShop, DemoTestimonial } from "@/types/demo-shop";

export const demoShop: DemoShop = {
  name: "Luna Beauty",
  slogan: "Mỹ phẩm chính hãng cho nàng bận rộn",
  description:
    "Shop mỹ phẩm chăm sóc da, trang điểm nhẹ nhàng và combo làm đẹp phù hợp cho khách nữ 18-35 tuổi.",
  phone: "0896456068",
  zalo: "https://zalo.me/0896456068",
  facebook: "https://facebook.com",
  address: "Việt Nam",
};

export const demoCategories = [
  "Tất cả",
  "Flash Sale",
  "Skincare",
  "Makeup",
  "Combo",
  "Bán chạy",
];

export const demoProducts: DemoProduct[] = [
  {
    id: 1,
    name: "Serum sáng da Glow C",
    category: "Skincare",
    price: 189000,
    oldPrice: 239000,
    badge: "Bán chạy",
    stock: 9,
    sold: 42,
    rating: 4.9,
    isFlashSale: true,
    description:
      "Serum dưỡng sáng da, hỗ trợ làm đều màu da, phù hợp dùng hằng ngày.",
  },
  {
    id: 2,
    name: "Kem chống nắng nâng tone",
    category: "Skincare",
    price: 159000,
    oldPrice: 199000,
    badge: "Hot",
    stock: 12,
    sold: 58,
    rating: 4.8,
    isFlashSale: true,
    description:
      "Kem chống nắng mỏng nhẹ, nâng tone tự nhiên, phù hợp đi học, đi làm.",
  },
  {
    id: 3,
    name: "Toner cấp ẩm Fresh Skin",
    category: "Skincare",
    price: 129000,
    oldPrice: 169000,
    badge: "Mới",
    stock: 15,
    sold: 31,
    rating: 4.7,
    isFlashSale: false,
    description:
      "Toner cấp ẩm nhẹ, giúp da mềm hơn trước các bước dưỡng tiếp theo.",
  },
  {
    id: 4,
    name: "Sữa rửa mặt dịu nhẹ",
    category: "Skincare",
    price: 99000,
    oldPrice: 139000,
    badge: "Tiết kiệm",
    stock: 20,
    sold: 77,
    rating: 4.9,
    isFlashSale: false,
    description:
      "Làm sạch nhẹ nhàng, không gây khô căng, phù hợp nhiều loại da.",
  },
  {
    id: 5,
    name: "Son tint môi tự nhiên",
    category: "Makeup",
    price: 89000,
    oldPrice: 119000,
    badge: "Yêu thích",
    stock: 11,
    sold: 66,
    rating: 4.8,
    isFlashSale: true,
    description:
      "Chất son nhẹ môi, màu tự nhiên, phù hợp makeup hằng ngày.",
  },
  {
    id: 6,
    name: "Combo skincare sáng da",
    category: "Combo",
    price: 299000,
    oldPrice: 399000,
    badge: "Combo lời",
    stock: 5,
    sold: 93,
    rating: 5,
    isFlashSale: true,
    description:
      "Combo gồm serum, toner và sữa rửa mặt cho routine chăm sóc da cơ bản.",
  },
  {
    id: 7,
    name: "Set makeup đi học nhẹ nhàng",
    category: "Makeup",
    price: 219000,
    oldPrice: 289000,
    badge: "Bán chạy",
    stock: 8,
    sold: 39,
    rating: 4.8,
    isFlashSale: false,
    description:
      "Set trang điểm nhẹ gồm son tint, cushion mini và má hồng tự nhiên.",
  },
  {
    id: 8,
    name: "Combo cấp ẩm phục hồi",
    category: "Combo",
    price: 349000,
    oldPrice: 459000,
    badge: "Hot deal",
    stock: 6,
    sold: 51,
    rating: 4.9,
    isFlashSale: true,
    description:
      "Combo phù hợp cho da khô, thiếu ẩm, cần routine phục hồi đơn giản.",
  },
];

export const demoTestimonials: DemoTestimonial[] = [
  {
    name: "Minh Anh",
    content:
      "Shop tư vấn nhanh, sản phẩm dễ dùng, đặt hàng trên web rất tiện.",
  },
  {
    name: "Hoài Thương",
    content:
      "Mình thích nhất là xem được giá và combo rõ ràng, không cần hỏi lại nhiều.",
  },
  {
    name: "Ngọc Linh",
    content:
      "Giao diện dễ xem trên điện thoại, bấm đặt hàng rất nhanh.",
  },
];

export const demoFaqs: DemoFaq[] = [
  {
    question: "Shop có gọi xác nhận đơn không?",
    answer:
      "Có. Sau khi khách gửi đơn, shop sẽ gọi hoặc nhắn Zalo để xác nhận trước khi giao.",
  },
  {
    question: "Có thể đặt hàng qua Zalo không?",
    answer:
      "Có. Khách có thể bấm nút Zalo để được tư vấn nhanh hơn.",
  },
  {
    question: "Trang này có thể đổi thành shop của tôi không?",
    answer:
      "Có. Tên shop, màu sắc, sản phẩm, hình ảnh, số điện thoại và Zalo đều có thể thay đổi theo từng shop.",
  },
];