"use client"

import { LoginSchema } from "@/components/auth/LoginForm"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export const useLogin = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (data: LoginSchema) => {
            const res = await fetch('/login', {
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
        onSuccess: () => {
            toast.success("Login successful")
            router.push("/dashboard")
        },
    })
}