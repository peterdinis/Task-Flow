import { db } from '@/lib/prisma'
import { boardSchema } from '@/schemas/boardSchema'
import { Hono } from 'hono'

export const board = new Hono()

board.get('/', async (c) => {
  const page = Number(c.req.query('page') || '1')
  const limit = Number(c.req.query('limit') || '10')

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

  return c.json({
    data: boards,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  })
})


board.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = boardSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ message: 'Invalid data', errors: parsed.error.format() }, 400)
  }

  const board = await db.board.create({
    data: parsed.data,
  })

  return c.json(board, 201)
})