"use client";

import { useRef, FormEvent } from "react";

interface ProfileFormProps {
    onChangePassword: (passwords: {
        oldPassword: string;
        newPassword: string;
    }) => void;
    passwordResponse: { message: string };
}

function ProfileForm({ onChangePassword, passwordResponse }: ProfileFormProps) {
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
            <div className="inputBox">
                <p>{passwordResponse.message}</p>
                <input
                    title="newpass"
                    className="input input-glass-container"
                    type="password"
                    placeholder="new password"
                    id="new-password"
                    required
                    ref={newPasswordRef}
                />
            </div>
            <div className="inputBox">
                <input
                    title="oldpass"
                    className="input input-glass-container"
                    type="password"
                    placeholder="old password"
                    id="old-password"
                    required
                    ref={oldPasswordRef}
                />
            </div>
            <div className="inputBox">
                <input
                    title="changepass"
                    className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/90 dark:bg-gray-300/90 max-w-[12.25em] cursor-pointer mb-[1.25em] font-semibold"
                    type="submit"
                    value="Change Password"
                />
            </div>
        </form>
    );
}

export default ProfileForm;
