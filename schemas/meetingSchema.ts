import z from 'zod';

export const createNewMeetingSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    start_date: z.date().min(1),
    from: z.date(),
    to: z.date(),
    type: z.string(),
    user_id: z.string()
});

export const getAllMeetingsSchema = z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
});


export const meetingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  start_date: z.string().min(1, "Date is required"),
  from: z.string().min(1, "Start time is required"),
  to: z.string().min(1, "End time is required"),
  type: z.string().min(1, "Type is required"),
  user_id: z.string().min(1)
});

export type MeetingFormData = z.infer<typeof meetingSchema>;