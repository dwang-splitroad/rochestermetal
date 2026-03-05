"use client"

import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote: "Rochester Metal Products has been our trusted casting supplier for over 15 years. Their quality and consistency are unmatched in the industry.",
    author: "Manufacturing Director",
    company: "Major Agricultural Equipment Manufacturer",
  },
  {
    quote: "The team at RMP goes above and beyond to meet our demanding delivery schedules while maintaining exceptional quality standards.",
    author: "Purchasing Manager",
    company: "Automotive Parts Supplier",
  },
  {
    quote: "Their metallurgical expertise and engineering support have helped us optimize our casting designs, resulting in significant cost savings.",
    author: "Engineering Manager",
    company: "Industrial Equipment Manufacturer",
  },
  {
    quote: "We value RMP as a true partner. Their responsive customer service and technical capabilities make them our go-to foundry.",
    author: "Supply Chain Director",
    company: "Heavy Truck Components Supplier",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
            <Quote className="h-4 w-4" />
            <span>Testimonials</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            What Our Customers Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Content */}
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
            <Quote className="h-12 w-12 text-primary/30 mb-6" />
            
            <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
              &quot;{testimonials[currentIndex].quote}&quot;
            </blockquote>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-semibold text-foreground">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].company}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="border-border text-foreground hover:bg-secondary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="border-border text-foreground hover:bg-secondary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
