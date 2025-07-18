import authRoutes from "@/app/api/auth/route";
import boardRoutes from "@/app/api/boards/route";
import { Hono } from "hono";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authRoutes)
  .route("/boards", boardRoutes)

export type AppType = typeof routes;
export default app;