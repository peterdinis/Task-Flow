import { db } from '@/lib/prisma'
import { Hono } from 'hono'
import {z} from "zod"

const boardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ownerId: z.string(),
})

export const board = new Hono()

board.get('/', async (c) => {
  const boards = await db.board.findMany({
    include: { owner: true },
    orderBy: { createdAt: 'desc' },
  })
  return c.json(boards)
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