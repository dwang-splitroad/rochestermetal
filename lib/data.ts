/**
 * Data access layer.
 * - In development (no KV_REST_API_URL): reads/writes a local JSON file at data/site-data.json
 * - In production on Vercel (KV_REST_API_URL present): uses @vercel/kv
 */

import type { SiteData, SurchargeEntry, AnnouncementData } from "./data-types"

export type { SiteData, SurchargeEntry, AnnouncementData }

// Re-export types that pages import directly
export { formatSurchargeDate } from "./data-types"

const KV_KEY = "site-data"

const defaultData: SiteData = {
  announcement: {
    enabled: false,
    text: "",
    link: "",
    type: "info",
  },
  surcharges: [
    {
      date: "2026-03",
      ductile: 0.4627,
      gray: 0.3904,
    },
  ],
  assets: {
    leadTimePdf: null,
    shutdownPdf: null,
  },
}

// ─── KV (Vercel production) ──────────────────────────────────────────────────

async function kvRead(): Promise<SiteData> {
  const { kv } = await import("@vercel/kv")
  const stored = await kv.get<SiteData>(KV_KEY)
  return stored ? { ...defaultData, ...stored } : defaultData
}

async function kvWrite(data: SiteData): Promise<void> {
  const { kv } = await import("@vercel/kv")
  await kv.set(KV_KEY, data)
}

// ─── Filesystem (local development) ─────────────────────────────────────────

async function fsRead(): Promise<SiteData> {
  const fs = await import("fs")
  const path = await import("path")
  const filePath = path.join(process.cwd(), "data", "site-data.json")
  try {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
      return defaultData
    }
    const raw = fs.readFileSync(filePath, "utf-8")
    return { ...defaultData, ...JSON.parse(raw) } as SiteData
  } catch {
    return defaultData
  }
}

async function fsWrite(data: SiteData): Promise<void> {
  const fs = await import("fs")
  const path = await import("path")
  const filePath = path.join(process.cwd(), "data", "site-data.json")
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// ─── Public API ───────────────────────────────────────────────────────────────

function useKv(): boolean {
  return !!process.env.KV_REST_API_URL
}

export async function readData(): Promise<SiteData> {
  return useKv() ? kvRead() : fsRead()
}

export async function writeData(data: SiteData): Promise<void> {
  return useKv() ? kvWrite(data) : fsWrite(data)
}

export async function getCurrentSurcharge(): Promise<SurchargeEntry | null> {
  const data = await readData()
  if (!data.surcharges.length) return null
  const sorted = [...data.surcharges].sort((a, b) => b.date.localeCompare(a.date))
  return sorted[0]
}

export async function getHistoricalSurcharges(months = 6): Promise<SurchargeEntry[]> {
  const data = await readData()
  const sorted = [...data.surcharges].sort((a, b) => b.date.localeCompare(a.date))
  return sorted.slice(1, months + 1)
}
