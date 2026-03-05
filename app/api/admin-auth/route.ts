import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminSecret) {
    return NextResponse.json({ error: "Admin secret not configured" }, { status: 500 })
  }

  if (password !== adminSecret) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  return NextResponse.json({ success: true, token: adminSecret })
}
