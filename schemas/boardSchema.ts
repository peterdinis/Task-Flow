import z from 'zod';

export const createNewBoardSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    color: z.string().optional(),
    user_id: z.string().min(1),
});

export const getBoardsSchema = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
});

export const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    color: z.string().optional(),
    user_id: z.string() 
});

export type FormValues = z.infer<typeof formSchema>;