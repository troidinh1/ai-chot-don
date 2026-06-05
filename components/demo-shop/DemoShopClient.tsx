"use client";

import { useMemo, useState } from "react";
import CartDrawer from "./CartDrawer";
import DemoHero from "./DemoHero";
import DemoProductGrid from "./DemoProductGrid";
import DemoShopHeader from "./DemoShopHeader";
import FAQSection from "./FAQSection";
import FeedbackSection from "./FeedbackSection";
import FlashSaleSection from "./FlashSaleSection";
import MobileCTA from "./MobileCTA";
import TrustStrip from "./TrustStrip";
import type { DemoCategory, DemoProduct, DemoShop } from "@/types/demo-shop";

export type CartLine = {
  product: DemoProduct;
  quantity: number;
};

type DemoShopClientProps = {
  shop: DemoShop;
  categories: DemoCategory[];
  products: DemoProduct[];
};

export default function DemoShopClient({
  shop,
  categories,
  products,
}: DemoShopClientProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("tat-ca");
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const featuredProducts = useMemo(() => {
    const featured = products.filter((product) => product.isFeatured);
    return featured.length > 0 ? featured : products.slice(0, 4);
  }, [products]);

  const flashSaleProducts = useMemo(() => {
    const flash = products.filter((product) => product.isFlashSale);
    return flash.length > 0 ? flash : products.slice(0, 6);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return products.filter((product) => {
      const matchSearch =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.shortDescription?.toLowerCase().includes(keyword) ||
        product.description?.toLowerCase().includes(keyword) ||
        product.categoryName?.toLowerCase().includes(keyword);

      const matchCategory =
        activeCategory === "tat-ca" || product.categorySlug === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [products, searchValue, activeCategory]);

  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);

  const subtotal = cartLines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  function handleAddToCart(product: DemoProduct) {
    setCartLines((current) => {
      const existed = current.find((line) => line.product.id === product.id);

      if (existed) {
        return current.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    setIsCartOpen(true);
  }

  function handleChangeQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      setCartLines((current) =>
        current.filter((line) => line.product.id !== productId),
      );
      return;
    }

    setCartLines((current) =>
      current.map((line) =>
        line.product.id === productId ? { ...line, quantity } : line,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f2ec] pb-24 text-slate-950 lg:pb-0">
      <DemoShopHeader
        shop={shop}
        searchValue={searchValue}
        cartCount={cartCount}
        onSearchChange={setSearchValue}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <DemoHero
        shop={shop}
        products={featuredProducts}
        totalProducts={products.length}
        onAddToCart={handleAddToCart}
      />

      <TrustStrip />

      <FlashSaleSection
        products={flashSaleProducts}
        onAddToCart={handleAddToCart}
      />

      <DemoProductGrid
        categories={categories}
        products={filteredProducts}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddToCart={handleAddToCart}
      />

      <FeedbackSection />
      <FAQSection />

      <MobileCTA
        cartCount={cartCount}
        subtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cartLines={cartLines}
        onClose={() => setIsCartOpen(false)}
        onChangeQuantity={handleChangeQuantity}
      />
    </main>
  );
}
