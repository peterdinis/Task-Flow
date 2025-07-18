import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { db } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json()

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const hashed = await hash(password, 10)
  const user = await db.user.create({
    data: { email, password: hashed, name },
  })

  const token = await signToken({ id: user.id, email: user.email })

  return NextResponse.json({ token, user: { id: user.id, email: user.email } })
}
