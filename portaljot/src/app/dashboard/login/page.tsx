"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/dashboard/authProvider";

const LOGIN_URL = "login/";

interface LoginResponse {
	username?: string;
}

export default function Page() {
	const auth = useAuth();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const objectFromForm = Object.fromEntries(formData);
		const jsonData = JSON.stringify(objectFromForm);

		console.log("LOGIN JSON DATA >>>", jsonData);

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: jsonData,
		};

		const response = await fetch(LOGIN_URL, requestOptions);
		let data: LoginResponse = {};

		try {
			data = await response.json();
		} catch (error) {
			console.error("Error parsing JSON", error);
		}

		if (response.ok) {
			console.log("logged in");
			if (data.username) {
				auth.login(data.username);
			}
		} else {
			console.log(await response.json());
		}
	}
	return (
		<div className="w-full lg:grid lg:min-h-[85vh]  lg:grid-cols-2 xl:min-h-[90vh]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<div className="grid gap-4">
						<form onSubmit={handleSubmit}>
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="username"
									name="username"
									placeholder="Your username"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<Link
										href="/dashboard/forgot-password"
										className="hidden"
									>
										Forgot your password?
									</Link>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</form>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="#" className="underline">
							Sign up
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<Image
					src="/placeholder.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
