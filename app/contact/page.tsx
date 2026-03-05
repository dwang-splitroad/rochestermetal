import { Header } from "@/components/header"
import { ContactSection } from "@/components/contact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Contact Us | Rochester Metal Products",
  description: "Contact Rochester Metal Products for inquiries about gray and ductile iron castings. Located in Rochester, Indiana.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ContactSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
