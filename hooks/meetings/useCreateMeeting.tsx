'use client';

import { createMeeting } from '@/supabase/queries/meetingQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateMeeting() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMeeting,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
        },
        onError: (err) => {
            console.error('Failed to create meeting:', err);
        },
    });
}