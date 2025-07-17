import { sign, verify } from 'hono/jwt'

const JWT_SECRET = process.env.JWT_SECRET!

export type JwtPayload = {
  id: string
  email: string
}

export function signToken(payload: JwtPayload): Promise<string> {
  return sign(payload, JWT_SECRET)
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const payload = await verify(token, JWT_SECRET)

  if (typeof payload !== 'object' || !payload.id || !payload.email) {
    throw new Error('Invalid token payload')
  }

  return payload as JwtPayload
}