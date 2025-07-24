import z from 'zod';

export const createNewBoardSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    color: z.string().optional(),
    user_id: z.string().min(1),
});
