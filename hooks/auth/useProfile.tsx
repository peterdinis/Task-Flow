"use client"

import { useQuery } from '@tanstack/react-query'

export const useProfile = (token?: string | null) => {
  return useQuery({
    queryKey: ['myProfile', token],
    queryFn: async () => {
      const res = await fetch('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Unauthorized')
      return res.json()
    },
    enabled: !!token,
  })
}