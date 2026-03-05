import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/request-quote", label: "Request a Quote" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/history", label: "History" },
  { href: "/culture", label: "Culture" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                R<span className="text-primary">M</span>P
              </span>
              <span className="text-lg font-semibold tracking-wide text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                ROCHESTER METAL PRODUCTS
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              For over 90 years, Rochester Metal Products has been a trusted manufacturer 
              of quality gray and ductile iron castings for industries worldwide.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded text-sm text-primary font-medium">
              ISO9001:2015 Certified
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:574-223-3164" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  574-223-3164
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                Fax: (574) 223-2326
              </li>
              <li>
                <a 
                  href="mailto:info@rochestermetals.com" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  info@rochestermetals.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>
                  612 South Main Street<br />
                  Rochester, IN 46975
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Rochester Metal Products Corporation. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <span className="text-muted-foreground/50">|</span>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
