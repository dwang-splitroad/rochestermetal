import { Header } from "@/components/header"
import { CultureSection } from "@/components/culture-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Our Culture | Rochester Metal Products",
  description: "Learn about the values and culture that drive Rochester Metal Products - safety, quality, teamwork, and innovation.",
}

export default function CulturePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CultureSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
