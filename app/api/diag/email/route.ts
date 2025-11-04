import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    const host = process.env.EMAIL_HOST
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS
    const port = parseInt(process.env.EMAIL_PORT || '587')

    if (!host || !user || !pass) {
      return NextResponse.json(
        { ok: false, reason: 'Missing EMAIL_* env vars', vars: { host: !!host, user: !!user, pass: !!pass } },
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

    const verified = await transporter.verify().then(() => true).catch(() => false)

    return NextResponse.json({ ok: verified, host, port })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'unknown' }, { status: 500 })
  }
}
