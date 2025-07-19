"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newBoard: {
      title: string
      description: string
      progress: number
      ownerId: string,
      projectColor: string
    }) => {
      const res = await fetch('/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBoard),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to create board')
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
