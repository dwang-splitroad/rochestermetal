import { NextRequest, NextResponse } from "next/server"
import { readData, writeData } from "@/lib/data"
import { isAdminAuthorized } from "@/lib/auth"

export async function GET() {
  const data = readData()
  return NextResponse.json(data.announcement)
}

export async function PUT(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { enabled, text, link, type } = body

  const validTypes = ["info", "warning", "success"]
  if (type && !validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid type. Must be: info, warning, or success" }, { status: 400 })
  }

  const data = readData()
  data.announcement = {
    enabled: enabled ?? data.announcement.enabled,
    text: text ?? data.announcement.text,
    link: link ?? data.announcement.link,
    type: type ?? data.announcement.type,
  }

  writeData(data)
  return NextResponse.json({ success: true, announcement: data.announcement })
}
