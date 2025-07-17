"use client"

import { useQuery } from '@tanstack/react-query'

export const useAuth = (token?: string | null) => {
  return useQuery({
    queryKey: ['auth', token],
    queryFn: async () => {
      const res = await fetch('/api/auth/profile', {
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