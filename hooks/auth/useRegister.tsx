"use client"

import { RegisterFormValues } from '@/components/auth/RegisterForm'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to register')
      }

      return res.json()
    },
    onSuccess: () => {
      toast.success("Registration successful")
      router.push("/login")
    },
  })
}
