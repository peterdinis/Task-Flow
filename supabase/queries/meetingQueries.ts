"use server"

import { auth } from '@clerk/nextjs/server';
import { createClient } from '../setup/client';
import { createNewMeetingSchema, getAllMeetingsSchema } from '@/schemas/meetingSchema';

export async function createMeeting(input: unknown) {
    const parsed = createNewMeetingSchema.safeParse(input)
    if (!parsed.success) {
        throw new Error('Invalid input');
    }

    const {name, description, start_date, from, to, type} = parsed.data

    const { userId } = await auth();
    if (!userId) {
        throw new Error('Unauthorized');
    }

    const supabase = createClient();

    const {data, error} = await supabase.from("meetings")
    .insert({
        name,
        description,
        start_date,
        from,
        to,
        type
    }).select().single()

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getBoards(input: unknown) {
    const parsed = getAllMeetingsSchema.safeParse(input);
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
        data: meetings,
        error,
        count,
    } = await supabase
        .from('meetings')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return {
        meetings,
        total: count ?? 0,
        hasMore: (count ?? 0) > page * limit,
    };
}