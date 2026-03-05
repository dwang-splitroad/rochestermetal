import { NextRequest, NextResponse } from "next/server"
import { readData, writeData } from "@/lib/data"
import { isAdminAuthorized } from "@/lib/auth"

const VALID_FIELDS = ["leadTimePdf", "shutdownPdf"] as const
type PdfField = (typeof VALID_FIELDS)[number]

const PDF_NAMES: Record<PdfField, string> = {
  leadTimePdf: "lead-times.pdf",
  shutdownPdf: "shutdown-schedule.pdf",
}

async function saveToBlob(file: File, field: PdfField): Promise<string> {
  const { put } = await import("@vercel/blob")
  const blob = await put(PDF_NAMES[field], file, { access: "public", addRandomSuffix: false })
  return blob.url
}

async function saveToFs(file: File, field: PdfField): Promise<string> {
  const { writeFile, mkdir } = await import("fs/promises")
  const path = await import("path")
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, PDF_NAMES[field])
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filePath, buffer)
  return `/uploads/${PDF_NAMES[field]}`
}

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

  if (!fieldName || !(VALID_FIELDS as readonly string[]).includes(fieldName)) {
    return NextResponse.json({ error: "Field must be leadTimePdf or shutdownPdf" }, { status: 400 })
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
  }

  const MAX_SIZE = 10 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 400 })
  }

  const field = fieldName as PdfField
  const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN

  if (!useBlob && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "PDF uploads require Vercel Blob to be configured. Add BLOB_READ_WRITE_TOKEN to your environment variables." },
      { status: 503 }
    )
  }

  const url = useBlob ? await saveToBlob(file, field) : await saveToFs(file, field)

  const data = await readData()
  data.assets[field] = url
  await writeData(data)

  return NextResponse.json({ success: true, url })
}

export async function GET() {
  const data = await readData()
  return NextResponse.json(data.assets)
}
