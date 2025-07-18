import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { auth } from '../auth/route'
import { board } from '../boards/route'

const app = new Hono()

app.route('/auth', auth)
app.route('/boards', board)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)