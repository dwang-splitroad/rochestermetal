"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Lock,
  LogOut,
  TrendingUp,
  Megaphone,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Plus,
  Upload,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface SurchargeEntry {
  date: string
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

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split("-")
  const d = new Date(parseInt(year), parseInt(month) - 1, 1)
  return d.toLocaleString("en-US", { month: "long", year: "numeric" })
}

function apiHeaders(token: string) {
  return { "Content-Type": "application/json", "x-admin-secret": token }
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPw, setShowPw] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("rmp_admin_token", data.token)
        onLogin(data.token)
      } else {
        setError("Invalid password. Please try again.")
      }
    } catch {
      setError("Connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            R<span className="text-primary">M</span>P
          </span>
          <h1 className="mt-3 text-xl font-semibold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage website content</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" /> Signing in…</span>
            ) : (
              <span className="flex items-center gap-2"><Lock className="h-4 w-4" /> Sign In</span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Set your password via the <code className="text-primary">ADMIN_SECRET</code> environment variable.
        </p>
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {type === "success" ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
      <span>{message}</span>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"surcharges" | "announcement" | "assets">("surcharges")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const [surcharges, setSurcharges] = useState<SurchargeEntry[]>([])
  const [newDate, setNewDate] = useState("")
  const [newDuctile, setNewDuctile] = useState("")
  const [newGray, setNewGray] = useState("")
  const [surchargeLoading, setSurchargeLoading] = useState(false)

  const [announcement, setAnnouncement] = useState<AnnouncementData>({
    enabled: false,
    text: "",
    link: "",
    type: "info",
  })
  const [announcementLoading, setAnnouncementLoading] = useState(false)

  const [assets, setAssets] = useState<AssetsData>({ leadTimePdf: null, shutdownPdf: null })
  const leadTimeRef = useRef<HTMLInputElement>(null)
  const shutdownRef = useRef<HTMLInputElement>(null)
  const [uploadingLead, setUploadingLead] = useState(false)
  const [uploadingShutdown, setUploadingShutdown] = useState(false)

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchSurcharges()
    fetchAnnouncement()
    fetchAssets()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchSurcharges() {
    const res = await fetch("/api/surcharges?months=12")
    const data = await res.json()
    const all: SurchargeEntry[] = []
    if (data.current) all.push(data.current)
    if (data.historical) all.push(...data.historical)
    setSurcharges(all)
  }

  async function fetchAnnouncement() {
    const res = await fetch("/api/announcement")
    const data = await res.json()
    setAnnouncement(data)
  }

  async function fetchAssets() {
    const res = await fetch("/api/upload")
    const data = await res.json()
    setAssets(data)
  }

  async function handleAddSurcharge(e: React.FormEvent) {
    e.preventDefault()
    if (!newDate || !newDuctile || !newGray) return
    setSurchargeLoading(true)
    try {
      const res = await fetch("/api/surcharges", {
        method: "POST",
        headers: apiHeaders(token),
        body: JSON.stringify({
          date: newDate,
          ductile: parseFloat(newDuctile),
          gray: parseFloat(newGray),
        }),
      })
      if (res.ok) {
        showToast("Surcharge entry saved successfully.", "success")
        setNewDate("")
        setNewDuctile("")
        setNewGray("")
        fetchSurcharges()
      } else {
        const err = await res.json()
        showToast(err.error ?? "Failed to save.", "error")
      }
    } catch {
      showToast("Connection error.", "error")
    } finally {
      setSurchargeLoading(false)
    }
  }

  async function handleDeleteSurcharge(date: string) {
    if (!confirm(`Delete surcharge entry for ${formatDate(date)}?`)) return
    const res = await fetch(`/api/surcharges?date=${date}`, {
      method: "DELETE",
      headers: { "x-admin-secret": token },
    })
    if (res.ok) {
      showToast("Entry deleted.", "success")
      fetchSurcharges()
    } else {
      showToast("Failed to delete.", "error")
    }
  }

  async function handleSaveAnnouncement(e: React.FormEvent) {
    e.preventDefault()
    setAnnouncementLoading(true)
    try {
      const res = await fetch("/api/announcement", {
        method: "PUT",
        headers: apiHeaders(token),
        body: JSON.stringify(announcement),
      })
      if (res.ok) {
        showToast("Announcement updated.", "success")
      } else {
        showToast("Failed to update announcement.", "error")
      }
    } catch {
      showToast("Connection error.", "error")
    } finally {
      setAnnouncementLoading(false)
    }
  }

  async function handleUpload(field: "leadTimePdf" | "shutdownPdf", file: File) {
    const setUploading = field === "leadTimePdf" ? setUploadingLead : setUploadingShutdown
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("field", field)
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-secret": token },
        body: formData,
      })
      if (res.ok) {
        showToast("File uploaded successfully.", "success")
        fetchAssets()
      } else {
        const err = await res.json()
        showToast(err.error ?? "Upload failed.", "error")
      }
    } catch {
      showToast("Upload error.", "error")
    } finally {
      setUploading(false)
    }
  }

  const tabs = [
    { id: "surcharges" as const, label: "Surcharge", icon: TrendingUp },
    { id: "announcement" as const, label: "Announcement", icon: Megaphone },
    { id: "assets" as const, label: "PDFs", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-foreground shrink-0" style={{ fontFamily: "var(--font-display)" }}>
            R<span className="text-primary">M</span>P
          </Link>
          <span className="text-muted-foreground text-sm font-medium hidden xs:inline">/ Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">View site</span>
          </Link>
          <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-1.5 text-xs sm:text-sm">
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Website Admin
        </h1>
        <p className="text-sm text-muted-foreground mb-6 sm:mb-8">Manage surcharges, announcements, and document uploads.</p>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 sm:mb-8 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Surcharges Tab ──────────────────────────────── */}
        {activeTab === "surcharges" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Add entry */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
              <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                Add / Update Entry
              </h2>
              <form onSubmit={handleAddSurcharge} className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-medium text-muted-foreground block mb-1">Month</label>
                    <input
                      type="month"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">Ductile ($)</label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={newDuctile}
                      onChange={(e) => setNewDuctile(e.target.value)}
                      placeholder="0.0000"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">Gray ($)</label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={newGray}
                      onChange={(e) => setNewGray(e.target.value)}
                      placeholder="0.0000"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={surchargeLoading} className="w-full sm:w-auto">
                  {surchargeLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-1.5" /> : <Save className="h-4 w-4 mr-1.5" />}
                  Save Entry
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                The most recent month is shown as the current surcharge on the website.
              </p>
            </div>

            {/* Existing entries */}
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="px-4 sm:px-5 py-3 bg-muted/50 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">All Entries</h2>
              </div>
              {surcharges.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">No entries yet.</div>
              ) : (
                <>
                  {/* Mobile: card layout */}
                  <div className="sm:hidden divide-y divide-border">
                    {surcharges.map((entry, i) => (
                      <div key={entry.date} className={`px-4 py-3 ${i === 0 ? "bg-primary/5" : ""}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {formatDate(entry.date)}
                            {i === 0 && <span className="ml-2 text-xs text-primary font-semibold">CURRENT</span>}
                          </span>
                          <button
                            onClick={() => handleDeleteSurcharge(entry.date)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex gap-4 text-sm font-mono text-muted-foreground">
                          <span>Ductile: <span className="text-foreground">${entry.ductile.toFixed(4)}</span></span>
                          <span>Gray: <span className="text-foreground">${entry.gray.toFixed(4)}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Desktop: table layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/20">
                          <th className="text-left px-5 py-3 font-medium text-muted-foreground">Period</th>
                          <th className="text-right px-5 py-3 font-medium text-muted-foreground">Ductile</th>
                          <th className="text-right px-5 py-3 font-medium text-muted-foreground">Gray</th>
                          <th className="text-right px-5 py-3 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {surcharges.map((entry, i) => (
                          <tr key={entry.date} className={`border-b border-border last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}>
                            <td className="px-5 py-3 font-medium text-foreground">
                              {formatDate(entry.date)}
                              {i === 0 && <span className="ml-2 text-xs text-primary font-semibold">CURRENT</span>}
                            </td>
                            <td className="px-5 py-3 text-right font-mono text-foreground">${entry.ductile.toFixed(4)}</td>
                            <td className="px-5 py-3 text-right font-mono text-foreground">${entry.gray.toFixed(4)}</td>
                            <td className="px-5 py-3 text-right">
                              <button
                                onClick={() => handleDeleteSurcharge(entry.date)}
                                className="text-muted-foreground hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Announcement Tab ────────────────────────────── */}
        {activeTab === "announcement" && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <h2 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-primary" />
              Announcement Bar
            </h2>

            <form onSubmit={handleSaveAnnouncement} className="space-y-5">
              {/* Enable toggle */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Show announcement bar</div>
                  <div className="text-xs text-muted-foreground">Display the announcement strip at the top of every page</div>
                </div>
                <button
                  type="button"
                  onClick={() => setAnnouncement((a) => ({ ...a, enabled: !a.enabled }))}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${announcement.enabled ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${announcement.enabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {/* Type */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Type</label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(["info", "warning", "success"] as const).map((t) => {
                    const icons = { info: Info, warning: AlertCircle, success: CheckCircle }
                    const colors = { info: "text-blue-600", warning: "text-amber-500", success: "text-green-600" }
                    const Icon = icons[t]
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setAnnouncement((a) => ({ ...a, type: t }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm capitalize transition-all ${
                          announcement.type === t ? "border-primary bg-primary/5 font-medium" : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${colors[t]}`} />
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Text */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Message</label>
                <textarea
                  value={announcement.text}
                  onChange={(e) => setAnnouncement((a) => ({ ...a, text: e.target.value }))}
                  rows={3}
                  placeholder="e.g. We will be closed December 23–January 1 for the holiday season."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Link */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Link URL (optional)</label>
                <input
                  type="url"
                  value={announcement.link}
                  onChange={(e) => setAnnouncement((a) => ({ ...a, link: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Preview */}
              {announcement.text && (
                <div className={`rounded-lg px-4 py-3 text-sm font-medium flex items-start gap-2 ${
                  announcement.type === "info" ? "bg-blue-600 text-white" :
                  announcement.type === "warning" ? "bg-amber-500 text-white" :
                  "bg-green-600 text-white"
                }`}>
                  {announcement.type === "info" && <Info className="h-4 w-4 shrink-0 mt-0.5" />}
                  {announcement.type === "warning" && <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />}
                  {announcement.type === "success" && <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />}
                  <span>{announcement.text}{announcement.link && <span className="underline ml-1">Learn more →</span>}</span>
                </div>
              )}

              <Button type="submit" disabled={announcementLoading} className="w-full sm:w-auto">
                {announcementLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Announcement
              </Button>
            </form>
          </div>
        )}

        {/* ── Assets Tab ──────────────────────────────────── */}
        {activeTab === "assets" && (
          <div className="space-y-5">
            {[
              {
                field: "leadTimePdf" as const,
                label: "Lead Times PDF",
                desc: 'Upload the current lead times schedule. Linked from the info bar as "LEAD TIMES".',
                ref: leadTimeRef,
                uploading: uploadingLead,
                current: assets.leadTimePdf,
              },
              {
                field: "shutdownPdf" as const,
                label: "Shutdown Schedule PDF",
                desc: 'Upload the plant shutdown / holiday schedule. Linked from the info bar as "SHUT DOWN".',
                ref: shutdownRef,
                uploading: uploadingShutdown,
                current: assets.shutdownPdf,
              },
            ].map(({ field, label, desc, ref, uploading, current }) => (
              <div key={field} className="rounded-xl border border-border bg-card p-4 sm:p-6">
                <h2 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {label}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                {current && (
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/30 border border-border">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground flex-1 truncate min-w-0">{current}</span>
                    <a href={current} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline shrink-0">
                      View
                    </a>
                  </div>
                )}
                <input
                  ref={ref}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleUpload(field, file)
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => ref.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  {uploading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {current ? "Replace PDF" : "Upload PDF"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("rmp_admin_token")
    if (stored) setToken(stored)
    setChecked(true)
  }, [])

  if (!checked) return null
  if (!token) return <LoginScreen onLogin={(t) => setToken(t)} />
  return <Dashboard token={token} onLogout={() => { localStorage.removeItem("rmp_admin_token"); setToken(null) }} />
}
