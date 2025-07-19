import { useQuery } from '@tanstack/react-query'

export const useAllBoards = ({ page, limit, ownerId }: { page: number; limit: number; ownerId?: string }) => {
  return useQuery({
    queryKey: ["boards", page, limit, ownerId],
    queryFn: async () => {
      const res = await fetch(`/api/boards?page=${page}&limit=${limit}${ownerId ? `&ownerId=${ownerId}` : ''}`);
      return res.json();
    },
    staleTime: Infinity,
  });
};