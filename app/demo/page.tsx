import DemoShopClient from "@/components/demo-shop/DemoShopClient";
import {
  getDemoCategories,
  getDemoProducts,
  getDemoShop,
} from "@/lib/supabase/queries";
import {
  mapCategoryToDemoCategory,
  mapProductToDemoProduct,
  mapShopToDemoShop,
} from "@/lib/demo-shop/mappers";

export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const [shop, categories, products] = await Promise.all([
    getDemoShop(),
    getDemoCategories(),
    getDemoProducts(),
  ]);

  return (
    <DemoShopClient
      shop={mapShopToDemoShop(shop)}
      categories={categories.map(mapCategoryToDemoCategory)}
      products={products.map(mapProductToDemoProduct)}
    />
  );
}
