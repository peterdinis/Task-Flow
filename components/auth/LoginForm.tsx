"use client";

import { ArrowRight, Merge } from "lucide-react";
import type { FC } from "react";
import {
	TextureCardContent,
	TextureCardFooter,
	TextureCardHeader,
	TextureCardStyled,
	TextureCardTitle,
	TextureSeparator,
} from "@/components/ui/texture-card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TextureButton } from "../ui/texture-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLogin } from "@/hooks/auth/useLogin";

const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm: FC = () => {
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const login = useLogin();

	const onSubmit = async (data: LoginSchema) => {
		try {
			await login.mutateAsync(data);
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center py-4">
			<div className="dark:bg-stone-950 h-full rounded-md">
				<div className="items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1">
					<div className="col-span-1 grid items-start gap-6 lg:col-span-1">
						<div>
							<TextureCardStyled>
								<TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
									<div className="p-3 bg-neutral-950 rounded-full mb-3">
										<Merge className="h-7 w-7 stroke-neutral-200" />
									</div>
									<TextureCardTitle>Sign in to your account</TextureCardTitle>
									<p className="text-center">Welcome back! Please login.</p>
								</TextureCardHeader>

								<TextureSeparator />
								<TextureCardContent>
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="flex flex-col gap-6"
									>
										<div>
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												{...register("email")}
												disabled={isSubmitting}
											/>
											{errors.email && (
												<p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
											)}
										</div>

										<div>
											<Label htmlFor="password">Password</Label>
											<Input
												id="password"
												type="password"
												{...register("password")}
												disabled={isSubmitting}
											/>
											{errors.password && (
												<p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
											)}
										</div>

										<TextureButton
											variant="accent"
											className="w-full mt-4"
											disabled={isSubmitting}
										>
											<div className="flex gap-1 items-center justify-center">
												{isSubmitting ? "Signing in..." : "Continue"}
												<ArrowRight className="h-4 w-4 text-neutral-50 mt-[1px]" />
											</div>
										</TextureButton>
									</form>
								</TextureCardContent>

								<TextureSeparator />
								<TextureCardFooter className="border-b rounded-b-sm">
									<div className="text-center text-sm w-full">
										Don't have an account? <span className="text-primary">Sign up</span>
									</div>
								</TextureCardFooter>
								<div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden ">
									<div className="flex flex-col items-center justify-center py-2 px-2 text-center text-xs">
										Secured by Supabase
									</div>
								</div>
							</TextureCardStyled>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
