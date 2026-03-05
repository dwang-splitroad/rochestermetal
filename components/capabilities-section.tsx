import { Cog, Factory, FlaskConical, Ruler, Truck, Wrench } from "lucide-react"

const capabilities = [
  {
    icon: Factory,
    title: "Gray Iron Castings",
    description: "High-quality gray iron castings ranging from small precision parts to large industrial components. Classes 20-50."
  },
  {
    icon: Cog,
    title: "Ductile Iron Castings",
    description: "Superior ductile iron castings with excellent strength and durability. Grades 60-45-10 through 120-90-02."
  },
  {
    icon: Wrench,
    title: "Pattern & Tooling",
    description: "In-house pattern shop capabilities for new tooling development, modifications, and maintenance."
  },
  {
    icon: FlaskConical,
    title: "Metallurgical Lab",
    description: "Fully equipped metallurgical laboratory for spectrographic analysis, tensile testing, and microstructure analysis."
  },
  {
    icon: Ruler,
    title: "Quality Inspection",
    description: "CMM inspection, dimensional verification, and non-destructive testing to ensure specifications are met."
  },
  {
    icon: Truck,
    title: "Machining & Finishing",
    description: "Secondary machining operations, coating, painting, and assembly services for complete solutions."
  }
]

const specs = [
  { label: "Weight Range", value: "1 lb - 500+ lbs" },
  { label: "Molding Methods", value: "Green Sand, No-Bake" },
  { label: "Annual Capacity", value: "15,000+ Tons" },
  { label: "Certifications", value: "ISO9001:2015" },
]

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            <Factory className="h-4 w-4" />
            <span>What We Do</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Our Capabilities
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Rochester Metal Products offers a comprehensive range of foundry services, 
            from initial design consultation through final delivery. Our state-of-the-art 
            facilities and experienced team ensure exceptional results every time.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map((capability) => (
            <div 
              key={capability.title}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <capability.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {capability.title}
              </h3>
              <p className="text-muted-foreground">{capability.description}</p>
            </div>
          ))}
        </div>

        {/* Specs Banner */}
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {spec.value}
                </div>
                <div className="text-sm text-muted-foreground">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries Served */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Industries We Serve
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Automotive", "Agricultural", "Construction", "Industrial Equipment", "Hydraulics", "Pumps & Valves", "Mining", "Heavy Truck"].map((industry) => (
              <span 
                key={industry}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
