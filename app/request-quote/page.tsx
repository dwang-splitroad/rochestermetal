import { Header } from "@/components/header"
import { QuoteForm } from "@/components/quote-form"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Request a Quote | Rochester Metal Products",
  description: "Request a free quote for gray and ductile iron castings from Rochester Metal Products Corporation.",
}

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <QuoteForm />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
