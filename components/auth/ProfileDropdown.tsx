"use client"

import { FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import {toast} from "sonner"
import { useAuthenticatedProfile } from "@/hooks/auth/useAuthentificatedUser"

const ProfileDropdown: FC = () => {
  const router = useRouter()
  const {user, isLoading} = useAuthenticatedProfile()

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Succesfully logout")
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {user?.name?.[0] ?? user?.email?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {isLoading ? "Loading..." : user?.name || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
