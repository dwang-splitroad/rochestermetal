import { Header } from "@/components/header"
import { CareersSection } from "@/components/careers-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Careers | Rochester Metal Products",
  description: "Join the Rochester Metal Products team. View current job openings and career opportunities.",
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CareersSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
