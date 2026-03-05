import { Heart, Shield, Users, Lightbulb, Target, Handshake } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "The safety of our employees is our top priority. We maintain rigorous safety protocols and continuous training programs."
  },
  {
    icon: Target,
    title: "Quality Focus",
    description: "We are committed to delivering the highest quality castings through continuous improvement and attention to detail."
  },
  {
    icon: Users,
    title: "Team Excellence",
    description: "Our success is built on the dedication and expertise of our team members who take pride in their craftsmanship."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously invest in new technologies and processes to stay at the forefront of the foundry industry."
  },
  {
    icon: Handshake,
    title: "Customer Partnership",
    description: "We view our customers as partners and work closely with them to understand and meet their unique needs."
  },
  {
    icon: Heart,
    title: "Community",
    description: "We are proud to be part of the Rochester, Indiana community and committed to being a responsible corporate citizen."
  }
]

export function CultureSection() {
  return (
    <section id="culture" className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <Heart className="h-4 w-4" />
              <span>Our Culture</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Built on Values, Driven by Excellence
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Rochester Metal Products, our culture is the foundation of everything we do. 
              We believe that our people are our greatest asset, and we foster an environment 
              where safety, quality, and teamwork are paramount.
            </p>
          </div>

          <div className="bg-background border border-border rounded-lg p-8">
            <blockquote className="text-xl text-foreground italic mb-4">
              &quot;Our commitment to our employees and customers has been the cornerstone 
              of our success for over nine decades.&quot;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Leadership Team</div>
                <div className="text-sm text-muted-foreground">Rochester Metal Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div 
              key={value.title}
              className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <value.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
