"use client";
import { useToast } from "@/hooks/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schema/spread/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
	const { toast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const methods = useForm<UserLoginProps>({
		resolver: zodResolver(UserLoginSchema),
		mode: "onChange",
	});

	const onHandleSubmit = methods.handleSubmit(
		async (values: UserLoginProps) => {
			try {
				setLoading(true);

				// Call NextAuth's signIn function with credentials
				const result = await signIn("credentials", {
					redirect: false,
					email: values.email,
					password: values.password,
				});

				if (result?.error) {
					// Handle sign-in errors
					toast({
						title: "Authentication Failed",
						description: result.error,
					});
					setLoading(false);
				} else if (result?.ok) {
					// Sign-in successful
					toast({
						title: "Success",
						description: "Welcome back!",
					});
					setLoading(false);
					router.push("/spread/dashboard");
				}
			} catch (error: any) {
				console.error("SignIn Error:", error);
				toast({
					title: "Error",
					description:
						"An unexpected error occurred. Please try again.",
				});
				setLoading(false);
			}
		}
	);

	return {
		methods,
		onHandleSubmit,
		loading,
	};
};
