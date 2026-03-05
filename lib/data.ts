/**
 * Data access layer — storage backend priority:
 *   1. Neon PostgreSQL  (DATABASE_URL is set)       → production on Vercel
 *   2. Filesystem JSON  (fallback)                  → local development
 */

export type { SiteData, SurchargeEntry, AnnouncementData } from "./data-types"
export { formatSurchargeDate } from "./data-types"

import type { SiteData } from "./data-types"
import type { SurchargeEntry } from "./data-types"

const defaultData: SiteData = {
  announcement: { enabled: false, text: "", link: "", type: "info" },
  surcharges: [{ date: "2026-03", ductile: 0.4627, gray: 0.3904 }],
  assets: { leadTimePdf: null, shutdownPdf: null },
}

// ─── Neon PostgreSQL ──────────────────────────────────────────────────────────

async function ensureTable(): Promise<void> {
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    CREATE TABLE IF NOT EXISTS site_data (
      id      INTEGER PRIMARY KEY DEFAULT 1,
      data    JSONB   NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `
}

async function neonRead(): Promise<SiteData> {
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(process.env.DATABASE_URL!)
  await ensureTable()
  const rows = await sql`SELECT data FROM site_data WHERE id = 1`
  if (!rows.length) return defaultData
  return { ...defaultData, ...(rows[0].data as SiteData) }
}

async function neonWrite(data: SiteData): Promise<void> {
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(process.env.DATABASE_URL!)
  await ensureTable()
  await sql`
    INSERT INTO site_data (id, data, updated_at)
    VALUES (1, ${JSON.stringify(data)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE
      SET data       = EXCLUDED.data,
          updated_at = now()
  `
}

// ─── Filesystem (local development) ──────────────────────────────────────────

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

function useNeon(): boolean {
  return !!process.env.DATABASE_URL
}

export async function readData(): Promise<SiteData> {
  return useNeon() ? neonRead() : fsRead()
}

export async function writeData(data: SiteData): Promise<void> {
  return useNeon() ? neonWrite(data) : fsWrite(data)
}

export async function getCurrentSurcharge(): Promise<SurchargeEntry | null> {
  const data = await readData()
  if (!data.surcharges.length) return null
  return [...data.surcharges].sort((a, b) => b.date.localeCompare(a.date))[0]
}

export async function getHistoricalSurcharges(months = 6): Promise<SurchargeEntry[]> {
  const data = await readData()
  const sorted = [...data.surcharges].sort((a, b) => b.date.localeCompare(a.date))
  return sorted.slice(1, months + 1)
}
