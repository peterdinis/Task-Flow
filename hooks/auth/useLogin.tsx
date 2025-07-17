"use client"

import { useMutation } from "@tanstack/react-query"

export const useLogin = () =>
  useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Login failed')
      }

      const result = await res.json()
      localStorage.setItem('token', result.token)
      return result
    },
  })