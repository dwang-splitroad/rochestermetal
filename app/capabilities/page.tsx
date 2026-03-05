import { Header } from "@/components/header"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Our Capabilities | Rochester Metal Products",
  description: "Explore Rochester Metal Products' manufacturing capabilities - gray and ductile iron casting, tooling, metallurgical lab, and quality control.",
}

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CapabilitiesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
