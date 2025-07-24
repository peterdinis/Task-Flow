'use server';

import { actionClient } from '@/lib/safe-action';
import { createNewBoardSchema, getBoardsSchema } from '@/schemas/boardSchema';
import { createClient } from '@/supabase/client';
import { auth } from '@clerk/nextjs/server';


export const createNewBoard = actionClient
    .inputSchema(createNewBoardSchema)
    .action(async ({ parsedInput }) => {
        const { title, description = '', color = '#ffffff', user_id } = parsedInput;

        const { userId } = await auth();
        if (!userId) {
            throw new Error('Unauthorized');
        }

        const supabase = createClient();

        const { data, error } = await supabase
            .from('boards')
            .insert({
                title,
                description,
                color,
                user_id: userId,
            })
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    });


export const getBoards = actionClient
    .inputSchema(getBoardsSchema)
    .action(async ({ parsedInput }) => {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('Unauthorized');
        }

        const { page, limit } = parsedInput;
        const offset = (page - 1) * limit;

        const supabase = createClient();

        const { data: boards, error, count } = await supabase
            .from('boards')
            .select('*', { count: 'exact' })
            .eq('user_id', userId)
            .range(offset, offset + limit - 1)
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return {
            boards,
            total: count ?? 0,
            hasMore: (count ?? 0) > page * limit,
        };
    });