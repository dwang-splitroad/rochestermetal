import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Board of Directors | Rochester Metal Products",
  description: "Rochester Metal Products Corporation Board of Directors.",
}

export default function BoardOfDirectorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold tracking-widest uppercase mb-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            RMP
          </div>
          <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Board of Directors
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Rochester Metal Products Corporation is guided by an experienced board committed to excellence in iron casting manufacturing.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          <p>Board of Directors information coming soon.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
