"use client"

import { useMutation } from "@tanstack/react-query"

export const useRegister = () =>
  useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Registration failed')
      }

      const result = await res.json()
      localStorage.setItem('token', result.token)
      return result
    },
  })