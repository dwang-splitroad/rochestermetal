import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "site-data.json")

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

const defaultData: SiteData = {
  announcement: {
    enabled: false,
    text: "",
    link: "",
    type: "info",
  },
  surcharges: [
    {
      date: new Date().toISOString().slice(0, 7),
      ductile: 0.4627,
      gray: 0.3904,
    },
  ],
  assets: {
    leadTimePdf: null,
    shutdownPdf: null,
  },
}

export function readData(): SiteData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dir = path.dirname(DATA_FILE)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2))
      return defaultData
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8")
    return { ...defaultData, ...JSON.parse(raw) } as SiteData
  } catch {
    return defaultData
  }
}

export function writeData(data: SiteData): void {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

export function getCurrentSurcharge(): SurchargeEntry | null {
  const data = readData()
  if (!data.surcharges.length) return null
  // Sort by date descending and return the most recent
  const sorted = [...data.surcharges].sort((a, b) => b.date.localeCompare(a.date))
  return sorted[0]
}

export function getHistoricalSurcharges(months = 6): SurchargeEntry[] {
  const data = readData()
  const sorted = [...data.surcharges].sort((a, b) => b.date.localeCompare(a.date))
  // Skip the current (first) entry, return the next N
  return sorted.slice(1, months + 1)
}

export function formatSurchargeDate(dateStr: string): string {
  const [year, month] = dateStr.split("-")
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)
  return date.toLocaleString("en-US", { month: "long", year: "numeric" })
}
