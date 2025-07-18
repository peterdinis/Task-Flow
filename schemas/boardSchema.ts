import {z} from "zod"

export const boardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  progress: z.number(),
  projectColor: z.string(),
  ownerId: z.string(),
})