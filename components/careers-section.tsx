import { Briefcase, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "Competitive wages and benefits",
  "Health, dental, and vision insurance",
  "401(k) retirement plan with company match",
  "Paid time off and holidays",
  "Life and disability insurance",
  "Training and development opportunities",
  "Safe and supportive work environment",
  "Employee assistance program"
]

export function CareersSection() {
  return (
    <section id="careers" className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <Briefcase className="h-4 w-4" />
              <span>Join Our Team</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Build Your Career With Us
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Rochester Metal Products is always looking for talented individuals who share our 
              commitment to quality and excellence. Join our team and be part of a company with 
              over 90 years of success in the foundry industry.
            </p>

            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a 
                href="https://recruiting.paylocity.com/recruiting/jobs/All/8a1b0528-16f8-4a3e-bc2d-0883254fe7c7/Rochester-Metal-Products-Corp" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Open Positions
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="bg-background border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Employee Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
