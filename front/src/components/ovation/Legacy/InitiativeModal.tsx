// InitiativeModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface FormData {
    userId?: string;
    name: string;
    description: string;
    category: string;
}

interface User {
    name?: string;
    email?: string;
    image?: string;
    id: string;
}

const InitiativeModalContent = ({
    handleCloseModal,
}: {
    handleCloseModal: () => void;
}) => {
    const [nameError, setNameError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        category: "",
        description: "",
        userId: "",
    });

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (session) {
                const user = session.user as User;
                setFormData((prevState: FormData) => ({
                    ...prevState,
                    userId: user.id || "",
                }));
            }
        };
        fetchSession();
    }, []);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevState: FormData) => ({ ...prevState, [name]: value }));
    };

    const validateForm = (formData: FormData) => {
        let isValid = true;

        const isNameValid = formData.name.trim() !== "";
        setNameError(isNameValid ? false : true);
        if (!isNameValid) {
            console.log("name error");
            isValid = false;
        }

        const isCategoryValid = formData.category.trim() !== "";
        setCategoryError(isCategoryValid ? false : true);
        if (!isCategoryValid) {
            console.log("category error");
            isValid = false;
        }

        const isDescriptionValid = formData.description.trim() !== "";
        setDescriptionError(isDescriptionValid ? false : true);
        if (!isDescriptionValid) {
            console.log("description error");
            isValid = false;
        }

        return isValid;
    };
    const handleBlur = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        // Validate the field
        const isValid = value.trim() !== "";
        if (name === "name") {
            setNameError(!isValid);
        } else if (name === "category") {
            setCategoryError(!isValid);
        } else if (name === "description") {
            setDescriptionError(!isValid);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValid = validateForm(formData);
        if (!isValid) {
            return;
        }
        const response = await fetch("/api/initiativePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // Handle response
        handleCloseModal();
    };
    const categories = [
        { id: 1, name: "Twitter Space - Speak" },
        { id: 2, name: "Twitter Space - Cohost" },
        { id: 3, name: "Open for Hire" },
        { id: 4, name: "Hiring" },
        { id: 5, name: "Open for Mentorship" },
        { id: 6, name: "Podcast" },
        { id: 7, name: "Open to Collaborate" },
        { id: 8, name: "Grants" },
        { id: 9, name: "Partnerships" },
    ];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="font-semibold text-lg">Add Initiative</div>
                <div className="px-2 text-sm mb-2 text-neutral-400">
                    Initiatives are a social feature that allows users to
                    collaborate over mutual synergies. After creating an
                    initiative, this is posted to your profil and searchable on
                    the initiative page!
                </div>
                <div className="font-semibold text-lg">Title</div>
                <input
                    onBlur={handleBlur}
                    className={`form-input w-full bg-ovtealdull rounded-xl p-2 ${nameError ? "border-2 border-red-500" : ""}`}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Title"
                />{" "}
                <div className="font-semibold text-lg">Initiative Category</div>
                {categories.map((category) => {
                    return (
                        <div className="flex items-center" key={category.id}>
                            <input
                                onBlur={handleBlur}
                                className={`form-input mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3 ${categoryError ? "border-2 border-red-500" : ""}`}
                                type="radio"
                                id={category.name.toString()}
                                name="category"
                                value={category.name}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor={category.name.toString()}
                                className="cursor-pointer"
                            >
                                {category.name}
                            </label>
                        </div>
                    );
                })}
                <div className="font-semibold mt-2 text-lg">Initiative</div>
                <textarea
                    onBlur={handleBlur}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full bg-ovtealdull rounded-xl p-2 ${descriptionError ? "border-2 border-red-500" : ""}`}
                    placeholder="Add detail . . ."
                ></textarea>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-full px-6 py-1.5 bg-ovteal text-bgcolor rounded-full hover:bg-opacity-80 mt-2 items font-semibold outline-none"
                    >
                        Post Initiative
                    </button>
                </div>
            </form>
        </>
    );
};

export default InitiativeModalContent;
