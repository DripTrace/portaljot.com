"use client";

import { useRef, type FormEvent } from "react";

interface UserProfileFormProps {
	onChangePassword: (passwords: {
		oldPassword: string;
		newPassword: string;
	}) => void;
	passwordResponse: { message: string };
}

function UserProfileForm({
	onChangePassword,
	passwordResponse,
}: UserProfileFormProps) {
	const oldPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);

	function submitHandler(event: FormEvent) {
		event.preventDefault();

		if (oldPasswordRef.current && newPasswordRef.current) {
			const enteredOldPassword = oldPasswordRef.current.value;
			const enteredNewPassword = newPasswordRef.current.value;

			onChangePassword({
				oldPassword: enteredOldPassword,
				newPassword: enteredNewPassword,
			});
		}
	}

	return (
		<form className="relative h-full max-w-[40%]" onSubmit={submitHandler}>
			<div className="glass-input-box">
				<p>{passwordResponse.message}</p>
				<input
					title="newpass"
					className="glass-input glass-input-container"
					type="password"
					placeholder="new password"
					id="new-password"
					required
					ref={newPasswordRef}
				/>
			</div>
			<div className="glass-input-box">
				<input
					title="oldpass"
					className="glass-input glass-input-container"
					type="password"
					placeholder="old password"
					id="old-password"
					required
					ref={oldPasswordRef}
				/>
			</div>
			<div className="glass-input-box">
				<input
					title="changepass"
					className="glass-input glass-input-container text-black dark:text-[#4C8EFF] bg-gray-800/90 dark:bg-gray-300/90 max-w-[12.25em] cursor-pointer mb-[1.25em] font-semibold"
					type="submit"
					value="Change Password"
				/>
			</div>
		</form>
	);
}

export default UserProfileForm;
