import z from 'zod';

export const createNewMeetingSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    start_date: z.date().min(1),
    from: z.date(),
    to: z.date(),
    type: z.string(),
});

export const getAllMeetingsSchema = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
});
