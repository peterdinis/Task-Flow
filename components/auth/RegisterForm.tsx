"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, Merge } from "lucide-react"

import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "@/components/ui/texture-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TextureButton } from "@/components/ui/texture-button"
import { useRegister } from "@/hooks/auth/useRegister"

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const mutation = useRegister()

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data);
	reset()
  }

  return (
    <div className="flex items-center justify-center py-4">
      <div className="dark:bg-primary h-full rounded-md">
        <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg p-2 md:p-8">
          <div className="col-span-1 grid items-start gap-6 lg:col-span-1">
            <TextureCardStyled>
              <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
                <div className="p-3 bg-neutral-950 rounded-full mb-3">
                  <Merge className="h-7 w-7 stroke-neutral-200" />
                </div>
                <TextureCardTitle>Create your account</TextureCardTitle>
                <p className="text-center">
                  Welcome! Please fill in the details to get started.
                </p>
              </TextureCardHeader>
              <TextureSeparator />
              <TextureCardContent>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex justify-between gap-2">
                    <div className="w-full">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" {...register("firstName")} />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" {...register("lastName")} />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" {...register("username")} />
                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <TextureButton
                    type="submit"
                    variant="accent"
                    className="w-full mt-4"
                    disabled={mutation.isPending}
                  >
                    <div className="flex gap-1 items-center justify-center">
                      {mutation.isPending ? "Loading..." : "Continue"}
                      <ArrowRight className="h-4 w-4 text-neutral-50 mt-[1px]" />
                    </div>
                  </TextureButton>
                </form>
              </TextureCardContent>
              <TextureSeparator />
              <TextureCardFooter className="border-b rounded-b-sm">
                <div className="text-center text-sm w-full">
                  Already have an account?{" "}
                  <span className="text-primary cursor-pointer">
                    Sign in
                  </span>
                </div>
              </TextureCardFooter>
              <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden">
                <div className="py-2 px-2 text-center text-xs">
                  Secured by Supabase
                </div>
              </div>
            </TextureCardStyled>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
