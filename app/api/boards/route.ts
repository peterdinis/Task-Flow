import { db } from '@/lib/prisma'
import { Hono } from 'hono'

export const board = new Hono()

board.get('/', async (c) => {
  const boards = await db.board.findMany({
    include: { owner: true },
    orderBy: { createdAt: 'desc' },
  })
  return c.json(boards)
})
