'use server';

import { createNewBoardSchema, getBoardsSchema } from '@/schemas/boardSchema';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '../setup/client';

export async function createNewBoard(input: unknown) {
    const parsed = createNewBoardSchema.safeParse(input);
    if (!parsed.success) {
        throw new Error('Invalid input');
    }

    const { title, description = '', color = '#ffffff' } = parsed.data;

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
}

export async function getBoards(input: unknown) {
    const parsed = getBoardsSchema.safeParse(input);
    if (!parsed.success) {
        throw new Error('Invalid input');
    }

    const { page, limit } = parsed.data;
    const offset = (page - 1) * limit;

    const { userId } = await auth();
    if (!userId) {
        throw new Error('Unauthorized');
    }

    const supabase = createClient();

    const {
        data: boards,
        error,
        count,
    } = await supabase
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
}

export async function getAllBoards() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('Unauthorized');
    }

    const supabase = createClient();

    const { data: boards, error } = await supabase
        .from('boards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return boards;
}
