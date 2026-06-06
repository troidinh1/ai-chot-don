"use client";

import { useEffect, useState } from "react";
import type {
  AdminProductFormPayload,
  Category,
  ProductWithCategory,
} from "@/types/database";

type ProductEditorProps = {
  product: ProductWithCategory | null;
  categories: Category[];
  isCreatingNew: boolean;
  isSaving: boolean;
  onSave: (payload: AdminProductFormPayload) => void;
  onCancelNew: () => void;
};

export default function ProductEditor({
  product,
  categories,
  isCreatingNew,
  isSaving,
  onSave,
  onCancelNew,
}: ProductEditorProps) {
  const [form, setForm] = useState<AdminProductFormPayload>(() =>
    getInitialForm(product),
  );

  useEffect(() => {
    setForm(getInitialForm(product));
  }, [product]);

  const title = isCreatingNew ? "Thêm sản phẩm mới" : "Thông tin sản phẩm";

  function updateField<K extends keyof AdminProductFormPayload>(
    key: K,
    value: AdminProductFormPayload[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm.");
      return;
    }

    if (form.price <= 0) {
      alert("Giá sản phẩm phải lớn hơn 0.");
      return;
    }

    if (form.stock < 0) {
      alert("Tồn kho không được nhỏ hơn 0.");
      return;
    }

    onSave({
      ...form,
      slug: form.slug || slugify(form.name),
    });
  }

  if (!product && !isCreatingNew) {
    return (
      <section className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
        <p className="text-xl font-black text-slate-950">Chọn một sản phẩm</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Chi tiết sản phẩm sẽ hiển thị ở đây.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
            Product editor
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
            {title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Dữ liệu sản phẩm sẽ được lưu trực tiếp vào Supabase.
          </p>
        </div>

        {isCreatingNew && (
          <button
            type="button"
            onClick={onCancelNew}
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-stone-50"
          >
            Hủy thêm mới
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Field
          label="Tên sản phẩm"
          value={form.name}
          onChange={(value) => updateField("name", value)}
          placeholder="Ví dụ: Serum sáng da Glow C"
        />

        <Field
          label="Slug"
          value={form.slug ?? ""}
          onChange={(value) => updateField("slug", value)}
          placeholder="serum-sang-da-glow-c"
        />

        <div>
          <label className="text-sm font-black text-slate-700">Danh mục</label>
          <select
            value={form.categoryId ?? ""}
            onChange={(event) =>
              updateField("categoryId", event.target.value || null)
            }
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-slate-950 focus:bg-white"
          >
            <option value="">Chưa chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Badge"
          value={form.badge ?? ""}
          onChange={(value) => updateField("badge", value || null)}
          placeholder="Hot, New, -20%..."
        />

        <NumberField
          label="Giá bán"
          value={form.price}
          onChange={(value) => updateField("price", value)}
        />

        <NumberField
          label="Giá gốc"
          value={form.oldPrice ?? 0}
          onChange={(value) =>
            updateField("oldPrice", value > 0 ? value : null)
          }
        />

        <NumberField
          label="Tồn kho"
          value={form.stock}
          onChange={(value) => updateField("stock", value)}
        />

        <Field
          label="Link ảnh sản phẩm"
          value={form.imageUrl ?? ""}
          onChange={(value) => updateField("imageUrl", value || null)}
          placeholder="https://..."
        />
      </div>

      <div className="mt-4 grid gap-4">
        <TextareaField
          label="Mô tả ngắn"
          value={form.shortDescription ?? ""}
          onChange={(value) => updateField("shortDescription", value || null)}
          placeholder="Mô tả ngắn hiển thị ngoài card sản phẩm..."
          rows={3}
        />

        <TextareaField
          label="Mô tả chi tiết"
          value={form.description ?? ""}
          onChange={(value) => updateField("description", value || null)}
          placeholder="Mô tả chi tiết, công dụng, đối tượng phù hợp..."
          rows={5}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <ToggleBox
          label="Đang bán"
          active={form.isActive}
          onClick={() => updateField("isActive", !form.isActive)}
        />
        <ToggleBox
          label="Sản phẩm nổi bật"
          active={form.isFeatured}
          onClick={() => updateField("isFeatured", !form.isFeatured)}
        />
        <ToggleBox
          label="Flash sale"
          active={form.isFlashSale}
          onClick={() => updateField("isFlashSale", !form.isFlashSale)}
        />
      </div>

      <button
        type="button"
        disabled={isSaving}
        onClick={handleSubmit}
        className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        <span className="solid-white-text">
          {isSaving
            ? "Đang lưu..."
            : isCreatingNew
              ? "Thêm sản phẩm"
              : "Lưu thay đổi"}
        </span>
      </button>
    </section>
  );
}

function getInitialForm(
  product: ProductWithCategory | null,
): AdminProductFormPayload {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    categoryId: product?.category_id ?? null,
    shortDescription: product?.short_description ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    oldPrice: product?.old_price ?? null,
    stock: product?.stock ?? 0,
    badge: product?.badge ?? "",
    imageUrl: product?.image_url ?? "",
    isFeatured: product?.is_featured ?? false,
    isFlashSale: product?.is_flash_sale ?? false,
    isActive: product?.is_active ?? true,
  };
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-sm font-black text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-black text-slate-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-slate-950 focus:bg-white"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <div>
      <label className="text-sm font-black text-slate-700">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-bold leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
      />
    </div>
  );
}

function ToggleBox({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-stone-200 bg-stone-50 text-slate-500"
      }`}
    >
      <p className="font-black">{label}</p>
      <p className="mt-1 text-xs font-semibold">
        {active ? "Đang bật" : "Đang tắt"}
      </p>
    </button>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
