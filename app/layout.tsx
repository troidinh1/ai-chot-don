import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chốt Đơn - Web app bán hàng mini cho shop nhỏ",
  description:
    "AI Chốt Đơn giúp shop nhỏ tạo web app bán hàng, quản lý đơn hàng, khách hàng và dùng AI để tạo nội dung chốt đơn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}