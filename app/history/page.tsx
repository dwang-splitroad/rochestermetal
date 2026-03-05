import { Header } from "@/components/header"
import { HistorySection } from "@/components/history-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Our History | Rochester Metal Products",
  description: "Discover the rich history of Rochester Metal Products - over 90 years of excellence in iron casting manufacturing.",
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HistorySection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
