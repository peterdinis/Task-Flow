import { useQuery } from '@tanstack/react-query'

export const useAllBoards = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ['boards', page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/boards?page=${page}&limit=${limit}`, {
        method: "GET"
      })
      if (!res.ok) throw new Error('Failed to fetch boards')
      return res.json()
    },
    staleTime: Infinity
  })
}