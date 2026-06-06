"use client";

import { useMemo, useState } from "react";
import AdminProductsHeader from "./AdminProductsHeader";
import AdminProductsStats from "./AdminProductsStats";
import ProductAIBox from "./ProductAIBox";
import ProductEditor from "./ProductEditor";
import ProductList from "./ProductList";
import type {
  AdminProductAIResult,
  AdminProductFormPayload,
  Category,
  ProductWithCategory,
} from "@/types/database";

type AdminProductsClientProps = {
  initialProducts: ProductWithCategory[];
  categories: Category[];
};

type ProductFilter = "all" | "active" | "hidden" | "flash" | "featured";

export default function AdminProductsClient({
  initialProducts,
  categories,
}: AdminProductsClientProps) {
  const [products, setProducts] =
    useState<ProductWithCategory[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    initialProducts[0]?.id ?? null,
  );
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [aiResult, setAiResult] = useState<AdminProductAIResult | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const selectedProduct = useMemo(() => {
    if (isCreatingNew) return null;
    return products.find((product) => product.id === selectedProductId) ?? null;
  }, [products, selectedProductId, isCreatingNew]);

  const filteredProducts = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return products.filter((product) => {
      const matchSearch =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.slug.toLowerCase().includes(keyword) ||
        product.short_description?.toLowerCase().includes(keyword) ||
        product.description?.toLowerCase().includes(keyword) ||
        product.category?.name.toLowerCase().includes(keyword);

      const matchFilter =
        filter === "all" ||
        (filter === "active" && product.is_active) ||
        (filter === "hidden" && !product.is_active) ||
        (filter === "flash" && product.is_flash_sale) ||
        (filter === "featured" && product.is_featured);

      return matchSearch && matchFilter;
    });
  }, [products, searchValue, filter]);

  async function handleSaveProduct(payload: AdminProductFormPayload) {
    setIsSaving(true);

    try {
      const isUpdate = Boolean(selectedProduct?.id);
      const endpoint = isUpdate
        ? `/api/admin/products/${selectedProduct?.id}`
        : "/api/admin/products";

      const response = await fetch(endpoint, {
        method: isUpdate ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không lưu được sản phẩm.");
        return;
      }

      const savedProduct = result.product as ProductWithCategory;

      setProducts((current) => {
        if (isUpdate) {
          return current.map((product) =>
            product.id === savedProduct.id ? savedProduct : product,
          );
        }

        return [savedProduct, ...current];
      });

      setSelectedProductId(savedProduct.id);
      setIsCreatingNew(false);
      setAiResult(null);

      alert(isUpdate ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm mới.");
    } catch {
      alert("Có lỗi xảy ra khi lưu sản phẩm.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggleActive(product: ProductWithCategory) {
    const nextActive = !product.is_active;

    await handleQuickUpdate(product.id, {
      name: product.name,
      slug: product.slug,
      categoryId: product.category_id,
      shortDescription: product.short_description,
      description: product.description,
      price: product.price,
      oldPrice: product.old_price,
      stock: product.stock,
      badge: product.badge,
      imageUrl: product.image_url,
      isFeatured: product.is_featured,
      isFlashSale: product.is_flash_sale,
      isActive: nextActive,
    });
  }

  async function handleQuickUpdate(
    productId: string,
    payload: AdminProductFormPayload,
  ) {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không cập nhật được sản phẩm.");
        return;
      }

      const savedProduct = result.product as ProductWithCategory;

      setProducts((current) =>
        current.map((product) =>
          product.id === savedProduct.id ? savedProduct : product,
        ),
      );
    } catch {
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  }

  async function handleGenerateAI(productId: string) {
    setIsGeneratingAI(true);
    setAiResult(null);

    try {
      const response = await fetch(`/api/admin/products/${productId}/ai`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không tạo được nội dung AI.");
        return;
      }

      setAiResult(result.data);
    } catch {
      alert("Có lỗi xảy ra khi tạo nội dung AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  }

  function handleCreateNew() {
    setIsCreatingNew(true);
    setSelectedProductId(null);
    setAiResult(null);
  }

  function handleSelectProduct(productId: string) {
    setSelectedProductId(productId);
    setIsCreatingNew(false);
    setAiResult(null);
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminProductsHeader onCreateNew={handleCreateNew} />

        <AdminProductsStats products={products} />

        <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
          <ProductList
            products={filteredProducts}
            totalProducts={products.length}
            selectedProductId={selectedProductId}
            searchValue={searchValue}
            filter={filter}
            onSearchChange={setSearchValue}
            onFilterChange={setFilter}
            onSelectProduct={handleSelectProduct}
            onToggleActive={handleToggleActive}
          />

          <div className="space-y-6">
            <ProductEditor
              key={selectedProduct?.id ?? "new-product"}
              product={selectedProduct}
              categories={categories}
              isCreatingNew={isCreatingNew}
              isSaving={isSaving}
              onSave={handleSaveProduct}
              onCancelNew={() => {
                setIsCreatingNew(false);
                setSelectedProductId(products[0]?.id ?? null);
              }}
            />

            {selectedProduct && (
              <ProductAIBox
                product={selectedProduct}
                aiResult={aiResult}
                isGenerating={isGeneratingAI}
                onGenerate={() => handleGenerateAI(selectedProduct.id)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
