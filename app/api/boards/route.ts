import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { boardSchema } from '@/schemas/boardSchema'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || '1')
  const limit = Number(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  const [boards, total] = await Promise.all([
    db.board.findMany({
      skip,
      take: limit,
      include: { owner: true, members: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.board.count(),
  ])

  return NextResponse.json({
    data: boards,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = boardSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Invalid data', errors: parsed.error.format() },
      { status: 400 }
    )
  }

  const board = await db.board.create({
    data: parsed.data,
  })

  return NextResponse.json(board, { status: 201 })
}