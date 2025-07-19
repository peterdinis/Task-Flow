"use client"

import { useEffect, useState } from "react"
import { useProfile } from "./useProfile"

export function useAuthenticatedProfile() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) setToken(storedToken)
  }, [])

  const { data, isLoading, isError } = useProfile(token)

  const user = data?.user ?? null

  return { user, isLoading, isError }
}