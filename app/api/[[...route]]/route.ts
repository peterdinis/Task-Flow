import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { auth } from '../auth/route'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({ message: 'Hello Next.js!' })
})

app.route('/auth', auth)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)