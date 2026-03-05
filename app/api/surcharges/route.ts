import { NextRequest, NextResponse } from "next/server"
import { readData, writeData, getCurrentSurcharge, getHistoricalSurcharges } from "@/lib/data"
import { isAdminAuthorized } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const months = parseInt(searchParams.get("months") ?? "6", 10)

  const [current, historical] = await Promise.all([
    getCurrentSurcharge(),
    getHistoricalSurcharges(months),
  ])

  return NextResponse.json({ current, historical })
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { date, ductile, gray } = body

  if (!date || typeof ductile !== "number" || typeof gray !== "number") {
    return NextResponse.json(
      { error: "Invalid data. Requires date (YYYY-MM), ductile, and gray numbers." },
      { status: 400 }
    )
  }

  const dateRegex = /^\d{4}-\d{2}$/
  if (!dateRegex.test(date)) {
    return NextResponse.json({ error: "Date must be in YYYY-MM format" }, { status: 400 })
  }

  const data = await readData()

  const existingIndex = data.surcharges.findIndex((s) => s.date === date)
  if (existingIndex >= 0) {
    data.surcharges[existingIndex] = { date, ductile, gray }
  } else {
    data.surcharges.push({ date, ductile, gray })
  }

  await writeData(data)
  return NextResponse.json({ success: true, entry: { date, ductile, gray } })
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")

  if (!date) {
    return NextResponse.json({ error: "Date parameter required" }, { status: 400 })
  }

  const data = await readData()
  const before = data.surcharges.length
  data.surcharges = data.surcharges.filter((s) => s.date !== date)

  if (data.surcharges.length === before) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 })
  }

  await writeData(data)
  return NextResponse.json({ success: true })
}
