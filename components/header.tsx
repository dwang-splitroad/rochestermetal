"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, AlertCircle, Info, CheckCircle, ChevronRight, TrendingUp, Clock, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/request-quote", label: "Request a Quote" },
  { href: "/", label: "Home" },
  { href: "/careers", label: "Careers" },
  { href: "/history", label: "History" },
  { href: "/culture", label: "Culture" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
]

interface SurchargeData {
  ductile: number
  gray: number
}

interface AnnouncementData {
  enabled: boolean
  text: string
  link: string
  type: "info" | "warning" | "success"
}

interface AssetsData {
  leadTimePdf: string | null
  shutdownPdf: string | null
}

const announcementIcons = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
}

const announcementStyles = {
  info: "bg-blue-600 text-white",
  warning: "bg-amber-500 text-white",
  success: "bg-green-600 text-white",
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [surcharge, setSurcharge] = useState<SurchargeData | null>(null)
  const [announcement, setAnnouncement] = useState<AnnouncementData | null>(null)
  const [assets, setAssets] = useState<AssetsData>({ leadTimePdf: null, shutdownPdf: null })

  useEffect(() => {
    fetch("/api/surcharges")
      .then((r) => r.json())
      .then((d) => d.current && setSurcharge({ ductile: d.current.ductile, gray: d.current.gray }))
      .catch(() => {})

    fetch("/api/announcement")
      .then((r) => r.json())
      .then((d) => setAnnouncement(d))
      .catch(() => {})

    fetch("/api/upload")
      .then((r) => r.json())
      .then((d) => setAssets(d))
      .catch(() => {})
  }, [])

  const AnnouncementIcon = announcement ? announcementIcons[announcement.type] : Info

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">

      {/* Announcement bar */}
      {announcement?.enabled && announcement.text && (
        <div className={`px-4 py-2 text-sm font-medium ${announcementStyles[announcement.type]}`}>
          <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
            <AnnouncementIcon className="h-4 w-4 shrink-0" />
            <span>{announcement.text}</span>
            {announcement.link && (
              <a href={announcement.link} className="underline underline-offset-2 flex items-center gap-0.5 hover:opacity-80">
                Learn more <ChevronRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Info bar */}
      <div className="bg-card border-b border-border px-4 py-2">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-x-6 gap-y-1">

          {/* Phone */}
          <a href="tel:574-223-3164" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span className="font-medium">CALL: (574) 223-3164</span>
          </a>

          {/* Info links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold tracking-wide text-muted-foreground">

            {/* Iron Surcharge */}
            <Link href="/surcharge" className="flex items-center gap-1.5 hover:text-primary transition-colors group">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span>
                IRON SURCHARGE
                {surcharge && (
                  <span className="text-foreground/70 font-normal ml-1">
                    : Ductile: ${surcharge.ductile.toFixed(4)}&nbsp;&nbsp;Gray: ${surcharge.gray.toFixed(4)}
                  </span>
                )}
              </span>
            </Link>

            <span className="text-muted-foreground/40 hidden sm:inline">|</span>

            {/* Lead Times */}
            {assets.leadTimePdf ? (
              <a href={assets.leadTimePdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Clock className="h-3.5 w-3.5 text-primary" />
                LEAD TIMES
              </a>
            ) : (
              <span className="flex items-center gap-1.5 opacity-50 cursor-default">
                <Clock className="h-3.5 w-3.5" />
                LEAD TIMES
              </span>
            )}

            <span className="text-muted-foreground/40 hidden sm:inline">|</span>

            {/* Shut Down */}
            {assets.shutdownPdf ? (
              <a href={assets.shutdownPdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                SHUT DOWN
              </a>
            ) : (
              <span className="flex items-center gap-1.5 opacity-50 cursor-default">
                <Calendar className="h-3.5 w-3.5" />
                SHUT DOWN
              </span>
            )}

            <span className="text-muted-foreground/40 hidden sm:inline">|</span>

            {/* Board of Directors */}
            <Link href="/board-of-directors" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Users className="h-3.5 w-3.5 text-primary" />
              BOARD OF DIRECTORS
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                R<span className="text-primary">M</span>P
              </span>
              <div className="ml-3 hidden sm:block">
                <span className="text-lg font-semibold tracking-wide text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  ROCHESTER
                </span>
                <br />
                <span className="text-sm tracking-widest text-muted-foreground">METAL PRODUCTS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="secondary" size="sm" asChild>
              <a href="https://recruiting.paylocity.com/recruiting/jobs/All/8a1b0528-16f8-4a3e-bc2d-0883254fe7c7/Rochester-Metal-Products-Corp" target="_blank" rel="noopener noreferrer">
                Sales Rep Login
              </a>
            </Button>
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile info links */}
              <div className="border-t border-border pt-3 flex flex-col gap-2 text-xs font-semibold tracking-wide text-muted-foreground">
                <Link href="/surcharge" className="flex items-center gap-2 hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  IRON SURCHARGE
                  {surcharge && <span className="font-normal text-foreground/60">: Ductile ${surcharge.ductile.toFixed(4)} / Gray ${surcharge.gray.toFixed(4)}</span>}
                </Link>
                {assets.leadTimePdf && (
                  <a href={assets.leadTimePdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary py-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    LEAD TIMES
                  </a>
                )}
                {assets.shutdownPdf && (
                  <a href={assets.shutdownPdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary py-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    SHUT DOWN
                  </a>
                )}
                <Link href="/board-of-directors" className="flex items-center gap-2 hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>
                  <Users className="h-3.5 w-3.5 text-primary" />
                  BOARD OF DIRECTORS
                </Link>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="secondary" size="sm" asChild>
                  <a href="https://recruiting.paylocity.com/recruiting/jobs/All/8a1b0528-16f8-4a3e-bc2d-0883254fe7c7/Rochester-Metal-Products-Corp" target="_blank" rel="noopener noreferrer">
                    Sales Rep Login
                  </a>
                </Button>
                <Button variant="default" size="sm" className="bg-primary text-primary-foreground" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
