import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WidgetPreview } from "@/components/sections/widget-preview";
import { Quickstart } from "@/components/sections/quickstart";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2">
        <Hero />
        <Features />
        <HowItWorks />
        <WidgetPreview />
        <Quickstart />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
