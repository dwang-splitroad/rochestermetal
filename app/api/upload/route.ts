import { NextRequest, NextResponse } from "next/server"
import { readData, writeData } from "@/lib/data"
import { isAdminAuthorized } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const fieldName = formData.get("field") as string | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (!fieldName || !["leadTimePdf", "shutdownPdf"].includes(fieldName)) {
    return NextResponse.json({ error: "Field must be leadTimePdf or shutdownPdf" }, { status: 400 })
  }

  if (!file.name.endsWith(".pdf")) {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
  }

  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 400 })
  }

  await mkdir(UPLOAD_DIR, { recursive: true })

  const safeName = fieldName === "leadTimePdf" ? "lead-times.pdf" : "shutdown-schedule.pdf"
  const filePath = path.join(UPLOAD_DIR, safeName)
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filePath, buffer)

  const data = readData()
  data.assets[fieldName as "leadTimePdf" | "shutdownPdf"] = `/uploads/${safeName}`
  writeData(data)

  return NextResponse.json({ success: true, url: `/uploads/${safeName}` })
}

export async function GET() {
  const data = readData()
  return NextResponse.json(data.assets)
}
