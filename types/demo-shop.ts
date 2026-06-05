export type DemoProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  badge: string;
  stock: number;
  sold: number;
  rating: number;
  isFlashSale: boolean;
  description: string;
};

export type DemoShop = {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  zalo: string;
  facebook: string;
  address: string;
};

export type DemoTestimonial = {
  name: string;
  content: string;
};

export type DemoFaq = {
  question: string;
  answer: string;
};