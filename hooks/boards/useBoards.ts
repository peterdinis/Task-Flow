'use client';

import { useQuery } from '@tanstack/react-query';
import { getBoards } from '@/supabase/queries/boardQueries';
import { Board } from '@/types/Board';

export function useBoards(page: number, enabled: boolean) {
    return useQuery<{ boards: Board[] }, Error>({
        queryKey: ['boards', page],
        queryFn: () => getBoards({ page, limit: 10 }),
        enabled,
    });
}
