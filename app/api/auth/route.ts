import { Hono } from "hono";
import { JwtPayload, signToken, verifyToken } from '@/lib/jwt'
import { compare, hash } from 'bcryptjs'
import { db } from '@/lib/prisma'

const authRoutes = new Hono()
  .post("/signup", async (c) => {
    const { email, password, name } = await c.req.json()

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) return c.json({ error: 'Email already in use' }, 400)

    const hashed = await hash(password, 10)
    const user = await db.user.create({
      data: { email, password: hashed, name },
    })

    const token = await signToken({ id: user.id, email: user.email })
    return c.json({ token, user: { id: user.id, email: user.email } })
  })
  .post("/login", async (c) => {
    const { email, password } = await c.req.json()

    const user = await db.user.findUnique({ where: { email } })
    if (!user || !(await compare(password, user.password))) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    const token = await signToken({ id: user.id, email: user.email })
    return c.json({ token, user: { id: user.id, email: user.email } })
  })
  .get("/profile", async (c) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = authHeader.split(' ')[1]
    let payload: JwtPayload
    try {
      payload = await verifyToken(token)
    } catch {
      return c.json({ error: 'Invalid token' }, 401)
    }

    const user = await db.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true },
    })

    if (!user) return c.json({ error: 'User not found' }, 404)

    return c.json({ user })
  })


export default authRoutes