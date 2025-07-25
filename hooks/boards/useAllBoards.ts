"use client"

import { getAllBoards } from '@/supabase/queries/boardQueries';
import { useQuery } from '@tanstack/react-query';

export function useAllBoards() {
  return useQuery({
    queryKey: ['allBoards'],
    queryFn: () => getAllBoards(),  // ale toto bude fungovať len v server komponentách, nie v klientovi
    staleTime: 5 * 60 * 1000,
  });
}