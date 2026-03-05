import { NextRequest } from "next/server"

export function isAdminAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) return false

  const authHeader = req.headers.get("x-admin-secret")
  return authHeader === adminSecret
}
