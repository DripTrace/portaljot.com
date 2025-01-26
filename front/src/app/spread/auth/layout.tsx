"use client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
	children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
	const session = await getServerSession(authOptions);

	if (session?.user) redirect("/spread/");

	return (
		<div className="h-screen flex w-full justify-center">
			<div className="w-[600px] lg:w-full flex flex-col items-start p-6">
				<Image
					src="/spread/images/logo.png"
					alt="LOGO"
					sizes="100vw"
					style={{
						width: "20%",
						height: "auto",
					}}
					width={200} // Provide actual width
					height={50} // Provide actual height
				/>
				{children}
			</div>
			<div className="hidden lg:flex flex-1 w-full max-h-full max-w-4xl overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
				<h2 className="text-gravel md:text-4xl font-bold">
					Hi, I’m your AI powered sales assistant, Spread!
				</h2>
				<p className="text-iridium md:text-sm mb-10">
					Spread is capable of capturing lead information without a
					form...
					<br />
					something never done before 😉
				</p>
				<Image
					src="/spread/images/app-ui.png"
					alt="app image"
					loading="lazy"
					sizes="30vw"
					className="absolute shrink-0 w-[1600px] top-48"
					width={1600} // Provide actual width
					height={900} // Provide actual height
				/>
			</div>
		</div>
	);
};

export default Layout;
