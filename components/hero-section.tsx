import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Factory, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <Award className="h-4 w-4" />
              <span>ISO9001:2015 Certified</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
              Precision Gray & Ductile Iron Castings
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              For over 90 years, Rochester Metal Products has delivered exceptional quality castings 
              for automotive, agricultural, and industrial applications. Our commitment to excellence 
              and customer satisfaction sets us apart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/request-quote">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary" asChild>
                <Link href="/capabilities">Our Capabilities</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>90+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>500+</div>
                <div className="text-sm text-muted-foreground">Customers Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>24/7</div>
                <div className="text-sm text-muted-foreground">Production Ready</div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Factory className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Modern Manufacturing
              </h3>
              <p className="text-muted-foreground">
                State-of-the-art foundry equipment and processes ensure consistent, high-quality castings 
                for every order.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Award className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Quality Assured
              </h3>
              <p className="text-muted-foreground">
                ISO9001:2015 certified with rigorous quality control at every step of the manufacturing process.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Expert Team
              </h3>
              <p className="text-muted-foreground">
                Experienced metallurgists and engineers work alongside our skilled craftsmen to deliver excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
