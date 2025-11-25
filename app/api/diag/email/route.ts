import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

// Single implementation: verify SMTP connectivity & auth
export async function GET() {
  try {
    const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
    const port = Number(process.env.EMAIL_PORT || 587)
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!user || !pass) {
      return NextResponse.json(
        { ok: false, reason: 'Missing EMAIL_USER or EMAIL_PASS', present: { user: !!user, pass: !!pass } },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })

    await transporter.verify()
    return NextResponse.json({ ok: true, host, port })
  } catch (err: any) {
    return NextResponse.json({ ok: false, code: err.code, message: err.message }, { status: 500 })
  }
}
