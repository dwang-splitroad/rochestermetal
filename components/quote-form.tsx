"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload, CheckCircle } from "lucide-react"

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <section id="quote" className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <FileText className="h-4 w-4" />
              <span>Free Quote</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Request a Free Quote
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tell us about your project and we will get back to you as soon as possible. 
              Our team of experts is ready to help you find the perfect casting solution for your needs.
            </p>

            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>Quick response within 24-48 hours</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>Competitive pricing on all orders</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>Expert guidance from our engineering team</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>Flexible production capabilities</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-background border border-border rounded-lg p-6 md:p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground">Your quote request has been submitted. We will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground">
                      Company Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="company" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-foreground">
                      Contact Person <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="contact" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partNumber" className="text-foreground">Part Number</Label>
                  <Input 
                    id="partNumber" 
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    placeholder="If you have multiple part numbers OR any models, please list them"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material" className="text-foreground">Material</Label>
                    <Input 
                      id="material" 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="e.g., Gray Iron"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-foreground">Weight</Label>
                    <Input 
                      id="weight" 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="lbs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eau" className="text-foreground">EAU</Label>
                    <Input 
                      id="eau" 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Annual usage"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantities" className="text-foreground">Order Quantities</Label>
                  <Input 
                    id="quantities" 
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    placeholder="Expected order quantities"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-foreground">Additional Comments & List of ALL Existing Tooling</Label>
                  <Textarea 
                    id="comments" 
                    rows={4}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Any additional information about your project..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Attach Drawings</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="drawings"
                      className="hidden"
                      accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="drawings" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      {fileName ? (
                        <p className="text-sm text-primary">{fileName}</p>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, DWG, DXF, STEP, IGES, JPG, PNG</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Quote Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
