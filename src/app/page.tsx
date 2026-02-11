import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Features } from "@/components/sections/features";
import { Architecture } from "@/components/sections/architecture";
import { HowItWorks } from "@/components/sections/how-it-works";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { WidgetShowcase } from "@/components/sections/widget-showcase";
import { Security } from "@/components/sections/security";
import { Quickstart } from "@/components/sections/quickstart";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2">
        <Hero />
        <TrustBar />
        <Features />
        <Architecture />
        <HowItWorks />
        <DashboardShowcase />
        <WidgetShowcase />
        <Security />
        <Quickstart />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
