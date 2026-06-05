import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import PricingSection from "@/components/landing/PricingSection";
import ProductExperienceSection from "@/components/landing/ProductExperienceSection";
import UseCaseSection from "@/components/landing/UseCaseSection";
import Reveal from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <main className="noise-bg min-h-screen overflow-hidden text-white">
      <Header />

      <HeroSection />

      <Reveal>
        <ProductExperienceSection />
      </Reveal>

      <Reveal delay={120}>
        <FeatureSection />
      </Reveal>

      <Reveal delay={160}>
        <UseCaseSection />
      </Reveal>

      <Reveal delay={200}>
        <PricingSection />
      </Reveal>

      <Footer />
    </main>
  );
}