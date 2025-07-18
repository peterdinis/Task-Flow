import { Hono } from "hono";
import {handle} from "hono/vercel"
import authRoutes from "../auth/route";
import boardRoutes from "../boards/route";

export const runtime = "edge"

const app = new Hono().basePath("/api")

const routes = app
.route("/auth", authRoutes)
.route("/boards", boardRoutes)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes