"use client";

import { useMemo, useState } from "react";
import CartDrawer from "@/components/demo-shop/CartDrawer";
import DemoHero from "@/components/demo-shop/DemoHero";
import DemoProductGrid from "@/components/demo-shop/DemoProductGrid";
import DemoShopHeader from "@/components/demo-shop/DemoShopHeader";
import FAQSection from "@/components/demo-shop/FAQSection";
import FeedbackSection from "@/components/demo-shop/FeedbackSection";
import FlashSaleSection from "@/components/demo-shop/FlashSaleSection";
import MobileCTA from "@/components/demo-shop/MobileCTA";
import TrustStrip from "@/components/demo-shop/TrustStrip";
import {
  demoCategories,
  demoFaqs,
  demoProducts,
  demoShop,
  demoTestimonials,
} from "@/data/demo-shop";
import {
  addProductToCart,
  decreaseCartItem,
  getCartQuantity,
  increaseCartItem,
  removeCartItem,
} from "@/lib/cart";
import type { CartItem } from "@/types/cart";
import type { DemoProduct } from "@/types/demo-shop";

export default function DemoShopPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = getCartQuantity(cartItems);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return demoProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "Tất cả" ||
        product.category === activeCategory ||
        (activeCategory === "Flash Sale" && product.isFlashSale) ||
        (activeCategory === "Bán chạy" && product.sold >= 50);

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const flashSaleProducts = demoProducts.filter((product) => product.isFlashSale);

  const handleAddToCart = (product: DemoProduct) => {
    setCartItems((currentItems) => addProductToCart(currentItems, product));
    setIsCartOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-slate-950">
      <DemoShopHeader
        shopName={demoShop.name}
        zaloUrl={demoShop.zalo}
        searchQuery={searchQuery}
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <DemoHero shop={demoShop} products={demoProducts} />

      <FlashSaleSection
        products={flashSaleProducts}
        onAddToCart={handleAddToCart}
      />

      <TrustStrip />

      <DemoProductGrid
        products={filteredProducts}
        categories={demoCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddToCart={handleAddToCart}
      />

      <FeedbackSection testimonials={demoTestimonials} />

      <FAQSection faqs={demoFaqs} />

      <MobileCTA
        shop={demoShop}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onIncrease={(productId) =>
          setCartItems((currentItems) =>
            increaseCartItem(currentItems, productId)
          )
        }
        onDecrease={(productId) =>
          setCartItems((currentItems) =>
            decreaseCartItem(currentItems, productId)
          )
        }
        onRemove={(productId) =>
          setCartItems((currentItems) => removeCartItem(currentItems, productId))
        }
      />
    </main>
  );
}