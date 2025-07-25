"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewBoard } from '@/supabase/queries/boardQueries';
import { toast } from 'sonner';

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewBoard,
    onSuccess: () => {
      toast.success('Board created successfully!');
      queryClient.invalidateQueries({
        queryKey: ["boards"]
      });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to create board');
    },
  });
}