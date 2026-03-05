import { Clock, Award, Milestone, TrendingUp } from "lucide-react"

const milestones = [
  {
    year: "1931",
    title: "Foundation",
    description: "Rochester Metal Products Corporation was founded in Rochester, Indiana, beginning our legacy of quality iron casting."
  },
  {
    year: "1950s",
    title: "Post-War Expansion",
    description: "Expanded operations to meet growing demand from the automotive and agricultural industries."
  },
  {
    year: "1980s",
    title: "Modernization",
    description: "Invested heavily in modern foundry equipment and computerized process control systems."
  },
  {
    year: "2000s",
    title: "ISO Certification",
    description: "Achieved ISO9001 certification, demonstrating our commitment to quality management systems."
  },
  {
    year: "Today",
    title: "Industry Leader",
    description: "Continuing to innovate with state-of-the-art technology while maintaining our tradition of excellence."
  }
]

export function HistorySection() {
  return (
    <section id="history" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            <Clock className="h-4 w-4" />
            <span>Our Heritage</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Over 90 Years of Excellence
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From our humble beginnings in 1931 to becoming a leader in gray and ductile iron castings, 
            Rochester Metal Products has built a legacy of quality, innovation, and customer satisfaction.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                    <div className="text-2xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary z-10" />
                
                {/* Empty space */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>90+</div>
            <div className="text-sm text-muted-foreground">Years in Business</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Milestone className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>3</div>
            <div className="text-sm text-muted-foreground">Generations</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>500+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>1931</div>
            <div className="text-sm text-muted-foreground">Founded</div>
          </div>
        </div>
      </div>
    </section>
  )
}
