export interface SurchargeEntry {
  date: string // YYYY-MM format
  ductile: number
  gray: number
}

export interface AnnouncementData {
  enabled: boolean
  text: string
  link: string
  type: "info" | "warning" | "success"
}

export interface SiteData {
  announcement: AnnouncementData
  surcharges: SurchargeEntry[]
  assets: {
    leadTimePdf: string | null
    shutdownPdf: string | null
  }
}

export function formatSurchargeDate(dateStr: string): string {
  const [year, month] = dateStr.split("-")
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)
  return date.toLocaleString("en-US", { month: "long", year: "numeric" })
}
