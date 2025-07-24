'use server';

import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/supabase/client';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

const inputSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  color: z.string().optional(),
});

export const createNewBoard = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    const { title, description = '', color = '#ffffff' } = parsedInput;

    const { userId } = await auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const supabase = createClient();

    const { data, error } = await supabase.from('boards').insert({
      title,
      description,
      color,
      user_id: userId,
    }).select().single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
