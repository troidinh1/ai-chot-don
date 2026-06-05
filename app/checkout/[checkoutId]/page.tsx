import { notFound } from "next/navigation";
import CheckoutForm from "@/components/demo-shop/CheckoutForm";
import { getCheckoutSession } from "@/lib/supabase/queries";

type CheckoutPageProps = {
  params: Promise<{
    checkoutId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { checkoutId } = await params;

  try {
    const checkout = await getCheckoutSession(checkoutId);

    if (!checkout.items.length) {
      notFound();
    }

    return <CheckoutForm checkout={checkout} />;
  } catch {
    notFound();
  }
}
