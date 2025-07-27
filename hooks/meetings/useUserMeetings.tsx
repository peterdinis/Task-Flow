"use client"

import { getMeetings } from '@/supabase/queries/meetingQueries';
import { useQuery } from '@tanstack/react-query';

export function useUserMeetings({ page = 1, limit = 10 }) {
    return useQuery({
        queryKey: ['meetings', page, limit],
        queryFn: () => getMeetings({ page, limit }),
    });
}