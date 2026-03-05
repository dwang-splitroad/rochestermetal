"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            <MapPin className="h-4 w-4" />
            <span>Get in Touch</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Contact Us
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a question or ready to start your next project? 
            Reach out to our team and we will be happy to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded-lg p-5">
                <Phone className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                <a href="tel:574-223-3164" className="text-muted-foreground hover:text-primary transition-colors">
                  574-223-3164
                </a>
                <p className="text-sm text-muted-foreground mt-1">Fax: (574) 223-2326</p>
              </div>
              <div className="bg-background border border-border rounded-lg p-5">
                <Mail className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <a href="mailto:info@rochestermetals.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                  info@rochestermetals.com
                </a>
              </div>
              <div className="bg-background border border-border rounded-lg p-5">
                <MapPin className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground text-sm">
                  612 South Main Street<br />
                  Rochester, IN 46975
                </p>
              </div>
              <div className="bg-background border border-border rounded-lg p-5">
                <Clock className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday<br />
                  7:00 AM - 4:00 PM EST
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-background border border-border rounded-lg overflow-hidden h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.6!2d-86.2161!3d41.0649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8815e3c7c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sRochester%2C%20IN%2046975!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rochester Metal Products Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background border border-border rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Send Us a Message
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactCompany" className="text-foreground">
                      Company Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="contactCompany" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Your company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="contactName" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Full name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactTitle" className="text-foreground">Title</Label>
                    <Input 
                      id="contactTitle" 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Job title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-foreground">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="contactEmail" 
                      type="email" 
                      required 
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-foreground">Phone</Label>
                  <Input 
                    id="contactPhone" 
                    type="tel"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMessage" className="text-foreground">
                    How can we help? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea 
                    id="contactMessage" 
                    rows={5}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
