"use client";

import { useToast } from "@/hooks/use-toast";
import {
	UserRegistrationProps,
	UserRegistrationSchema,
} from "@/schema/spread/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignUpForm = () => {
	const { toast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const methods = useForm<UserRegistrationProps>({
		resolver: zodResolver(UserRegistrationSchema),
		defaultValues: {
			type: "owner",
		},
		mode: "onChange",
	});

	const onHandleSubmit = methods.handleSubmit(
		async (values: UserRegistrationProps) => {
			try {
				setLoading(true);

				// Call the registration API
				const response = await fetch("/api/auth/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fullname: values.fullname,
						email: values.email,
						password: values.password,
						type: values.type,
					}),
				});

				const data = await response.json();

				if (!response.ok) {
					// Registration failed
					toast({
						title: "Registration Failed",
						description: data.message || "Something went wrong.",
					});
					setLoading(false);
					return;
				}

				// Optionally, sign in the user immediately after registration
				const signInResponse = await signIn("credentials", {
					redirect: false,
					email: values.email,
					password: values.password,
				});

				if (signInResponse?.error) {
					toast({
						title: "Sign In Failed",
						description: signInResponse.error,
					});
					setLoading(false);
					return;
				}

				if (signInResponse?.ok) {
					toast({
						title: "Success",
						description: "Registration successful!",
					});
					setLoading(false);
					router.push("/spread/dashboard");
				}
			} catch (error: any) {
				console.error("Registration Error:", error);
				toast({
					title: "Error",
					description: error.message || "Something went wrong.",
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
