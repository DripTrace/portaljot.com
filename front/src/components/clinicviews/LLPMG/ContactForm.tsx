"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import {
	pharmacies,
	providers,
	reasons,
	states,
} from "@/lib/clinicviews/constants";

export interface Provider {
	providerName: string;
	title: string;
	providerPhone: string;
	providerEmail: string;
	degree: string;
}

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	year: string;
	month: string;
	day: string;
	insurance: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	pharmacy: string;
	reason: string;
	customReason?: string;
	// suggestedAppointment: Date | null;
	consentGiven: boolean;
	suggestedProvider: string;
	providerPhone: string;
	providerEmail: string;
}

const ContactForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<FormData>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	// const watchSuggestedAppointment = watch("suggestedAppointment");
	const watchReason = watch("reason");
	const [theFormData, setTheFormData] = useState({});

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		setError("");

		const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
		if (isNaN(birthDate.getTime())) {
			setError("Invalid date of birth");
			setIsLoading(false);
			return;
		}

		const minAgeDate = new Date();
		minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

		if (birthDate > minAgeDate) {
			setError("Patient must be at least 2 years old.");
			setIsLoading(false);
			return;
		}

		// if (!isValidAppointmentTime(data.suggestedAppointment)) {
		//     setError(
		//         "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
		//     );
		//     setIsLoading(false);
		//     return;
		// }

		const formattedPhone = formatPhoneNumber(data.phone);

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			// if (key === "suggestedAppointment" && value) {
			//     formData.append(key, (value as Date).toISOString());
			// } else

			if (key === "phone") {
				formData.append(key, formattedPhone);
			} else if (
				key !== "year" &&
				key !== "month" &&
				key !== "day" &&
				key !== "customReason"
			) {
				formData.append(key, value as string);
			}
		});

		const formattedBirthday = `${data.month}-${data.day}-${data.year}`;
		formData.append("birthday", formattedBirthday);
		if (data.reason === "Other" && data.customReason) {
			formData.append("reason", data.customReason);
		}

		if (fileInputRef.current?.files?.[0]) {
			formData.append("pdf", fileInputRef.current.files[0]);
		}

		try {
			setTheFormData(formData);

			console.log("this is the form data:\n >>>> ", formData);
			const response = await fetch(
				"/api/clinicviews/llpmg/patient-register/route",
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("Failed to register patient");
			}

			alert(
				"Your information has been submitted successfully! Please check your email and phone for confirmation."
			);
			Object.keys(data).forEach((key) =>
				setValue(key as keyof FormData, "")
			);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (err) {
			setError(
				"An error occurred while submitting your information. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	// const isValidAppointmentTime = (date: Date | null): boolean => {
	//     if (!date) return false;
	//     const day = date.getDay();
	//     const hours = date.getHours();
	//     const isWeekday = day > 0 && day < 6;
	//     const isBusinessHours = hours >= 9 && hours < 17;
	//     const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
	//     return isWeekday && isBusinessHours && isFutureDate;
	// };

	const formatPhoneNumber = (phone: string): string => {
		const digitsOnly = phone.replace(/\D/g, "");
		return `+1${digitsOnly.slice(-10)}`;
	};

	const debouncedAddressSearch = debounce(async (input: string) => {
		if (input.length > 2) {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us`
				);
				const data = await response.json();
				const suggestions = data.map((item: any) => item.display_name);
				setAddressSuggestions(suggestions.slice(0, 5));
			} catch (error) {
				console.error("Error fetching address suggestions:", error);
			}
		} else {
			setAddressSuggestions([]);
		}
	}, 300);

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue("address", value);
		debouncedAddressSearch(value);
	};

	const handleAddressSelect = (selectedAddress: string) => {
		setValue("address", selectedAddress);
		setAddressSuggestions([]);
		const parts = selectedAddress.split(", ");
		if (parts.length >= 3) {
			setValue("city", parts[parts.length - 3]);
			const stateZip = parts[parts.length - 2].split(" ");
			setValue("state", stateZip[0]);
			setValue("zipCode", stateZip[1]);
		}
	};

	const formatProviderName = (provider: Provider): string => {
		let displayName = provider.providerName;
		// Prefix "Dr." to all provider names
		if (!displayName.startsWith("Dr. ")) {
			displayName = `Dr. ${displayName}`;
		}
		return displayName;
	};

	const handleSuggestedProviderChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const providerName = e.target.value;
		const selectedProvider = providers.find(
			(p) => p.providerName === providerName
		);

		if (selectedProvider) {
			// Set the form fields based on the selected provider
			setValue(
				"providerPhone",
				formatPhoneNumber(selectedProvider.providerPhone || "")
			);
			setValue("providerEmail", selectedProvider.providerEmail || "");
			console.log(selectedProvider);
		}
	};

	useEffect(() => {
		const scrollToTop = () => {
			window.scrollTo(0, 0);
		};

		// Attempt to scroll immediately
		scrollToTop();

		// Set a timeout to scroll again after a short delay
		const timeoutId = setTimeout(scrollToTop, 100);

		// Add an event listener for when the page has finished loading
		window.addEventListener("load", scrollToTop);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("load", scrollToTop);
		};
	}, []);

	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 100, damping: 15 },
		},
	};

	return (
		<div className="relative overflow-x-hidden w-full">
			<div className="fixed top-0 left-0 w-full h-screen z-0">
				<video
					autoPlay
					muted
					loop
					className="object-cover w-full h-full"
				>
					<source
						src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/2079217-uhd_3840_2160_30fps.mp4?alt=media&token=9af2dae7-9a26-411e-91ec-b8196e092ebb"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
			<div className="fixed top-0 left-0 w-full h-full bg-black/30 dark:bg-black/50 z-20"></div>
			<div className="relative z-20 w-full">
				<motion.form
					id="contact-form-top"
					onSubmit={handleSubmit(onSubmit)}
					className="max-w-7xl mx-auto p-6 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-md z-10"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{error && <p className="text-red-500 mb-4 z-10">{error}</p>}

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 z-10">
						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="firstName"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								First Name
							</label>
							<input
								id="firstName"
								{...register("firstName", {
									required: "First name is required",
								})}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
							/>
							{errors.firstName && (
								<span className="text-red-500 z-10">
									{errors.firstName.message}
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="lastName"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Last Name
							</label>
							<input
								id="lastName"
								{...register("lastName", {
									required: "Last name is required",
								})}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
							/>
							{errors.lastName && (
								<span className="text-red-500">
									{errors.lastName.message}
								</span>
							)}
						</motion.div>

						<motion.div className="mb-4" variants={itemVariants}>
							<label
								htmlFor="email"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
							/>
							{errors.email && (
								<span className="text-red-500 z-10">
									{errors.email.message}
								</span>
							)}
						</motion.div>

						<motion.div className="mb-4" variants={itemVariants}>
							<label
								htmlFor="phone"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Phone
							</label>
							<div className="flex">
								<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 z-10">
									+1
								</span>
								<input
									id="phone"
									type="tel"
									{...register("phone", {
										required: "Phone is required",
										pattern: {
											value: /^[2-9]\d{9}$/,
											message:
												"Invalid phone number. Please enter 10 digits without spaces or dashes.",
										},
									})}
									placeholder="1234567890"
									className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text z-10"
								/>
							</div>
							{errors.phone && (
								<span className="text-red-500">
									{errors.phone.message}
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 sm:col-span-2 xl:col-span-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="year"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Date of Birth
							</label>
							<div className="grid grid-cols-3 gap-2 z-10">
								<select
									id="year"
									{...register("year", {
										required: "Year is required",
									})}
									className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
								>
									<option value="">Year</option>
									{Array.from(
										{
											length:
												new Date().getFullYear() -
												1900 +
												1,
										},
										(_, i) => new Date().getFullYear() - i
									).map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
								<select
									id="month"
									{...register("month", {
										required: "Month is required",
									})}
									className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
								>
									<option value="">Month</option>
									{Array.from(
										{ length: 12 },
										(_, i) => i + 1
									).map((month) => (
										<option key={month} value={month}>
											{new Date(
												0,
												month - 1
											).toLocaleString("en-US", {
												month: "long",
											})}
										</option>
									))}
								</select>
								<select
									id="day"
									{...register("day", {
										required: "Day is required",
									})}
									className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
								>
									<option value="">Day</option>
									{Array.from(
										{ length: 31 },
										(_, i) => i + 1
									).map((day) => (
										<option key={day} value={day}>
											{day}
										</option>
									))}
								</select>
							</div>
							{(errors.year || errors.month || errors.day) && (
								<span className="text-red-500 z-10">
									Invalid date of birth
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="insurance"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Insurance Provider
							</label>
							<select
								id="insurance"
								{...register("insurance", {
									required: "Insurance provider is required",
								})}
								defaultValue=""
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
							>
								<option value="" disabled>
									Select your insurance provider
								</option>
								<option value="IEHP">IEHP</option>
								<option value="Blue Cross Blue Shield">
									Blue Cross Blue Shield
								</option>
								<option value="UnitedHealthcare">
									UnitedHealthcare
								</option>
								{/* <option value="Health Net">Health Net</option> */}
								<option value="Central Health Plan of California">
									Central Health Plan of California
								</option>
								<option value="Aetna">Aetna</option>
								<option value="Cigna">Cigna</option>
								<option value="Medicare">Medicare</option>
								<option value="Tricare">Tricare</option>
							</select>
							{errors.insurance && (
								<span className="text-red-500 z-10">
									{errors.insurance.message}
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 sm:col-span-2 xl:col-span-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="address"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Address
							</label>
							<input
								id="address"
								{...register("address", {
									required: "Address is required",
								})}
								onChange={handleAddressChange}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
							/>
							{addressSuggestions.length > 0 && (
								<ul className="mt-2 bg-white dark:bg-gray-800 border rounded z-10">
									{addressSuggestions.map(
										(suggestion, index) => (
											<li
												key={index}
												className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-gray-100 z-10"
												onClick={() =>
													handleAddressSelect(
														suggestion
													)
												}
											>
												{suggestion}
											</li>
										)
									)}
								</ul>
							)}
							{errors.address && (
								<span className="text-red-500 z-10">
									{errors.address.message}
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="city"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								City
							</label>
							<input
								id="city"
								{...register("city", {
									required: "City is required",
								})}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
							/>
							{errors.city && (
								<span className="text-red-500 z-10">
									{errors.city.message}
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="state"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								State
							</label>
							<select
								id="state"
								{...register("state", {
									required: "State is required",
								})}
								defaultValue=""
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
							>
								<option value="" disabled>
									Select your state
								</option>
								{states.map((state) => (
									<option key={state} value={state}>
										{state}
									</option>
								))}
							</select>
							{errors.state && (
								<span className="text-red-500 z-10">
									{errors.state.message}
								</span>
							)}
						</motion.div>

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="zipCode"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Zip Code
							</label>
							<input
								id="zipCode"
								{...register("zipCode", {
									required: "Zip code is required",
								})}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
							/>
							{errors.zipCode && (
								<span className="text-red-500 z-10">
									{errors.zipCode.message}
								</span>
							)}
						</motion.div>

						{/* <motion.div
                            className="mb-4 z-10"
                            variants={itemVariants}
                        >
                            <label
                                htmlFor="pharmacy"
                                className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
                            >
                                Preferred Pharmacy
                            </label>
                            <select
                                id="pharmacy"
                                {...register("pharmacy", {
                                    required: "Preferred pharmacy is required",
                                })}
                                defaultValue=""
                                className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
                            >
                                <option value="" disabled>
                                    Select your preferred pharmacy
                                </option>
                                {pharmacies.map((pharmacy) => (
                                    <option key={pharmacy} value={pharmacy}>
                                        {pharmacy}
                                    </option>
                                ))}
                            </select>
                            {errors.pharmacy && (
                                <span className="text-red-500 z-10">
                                    {errors.pharmacy.message}
                                </span>
                            )}
                        </motion.div> */}

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="reason"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Reason for Visit
							</label>
							<select
								id="reason"
								{...register("reason", {
									required: "Reason for visit is required",
								})}
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
							>
								<option value="" disabled>
									Select your reason for visit
								</option>
								{reasons.map((reason) => (
									<option key={reason} value={reason}>
										{reason}
									</option>
								))}
							</select>
							{watchReason === "Other" && (
								<textarea
									id="customReason"
									{...register("customReason", {
										required: "Please specify your reason",
									})}
									placeholder="Please specify your reason"
									className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text z-10"
								/>
							)}
							{errors.reason && (
								<span className="text-red-500 z-10">
									{errors.reason.message}
								</span>
							)}
							{watchReason === "Other" && errors.customReason && (
								<span className="text-red-500 z-10">
									{errors.customReason.message}
								</span>
							)}
						</motion.div>

						{/* <motion.div
                            className="mb-4 z-10"
                            variants={itemVariants}
                        >
                            <label
                                htmlFor="suggestedProvider"
                                className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
                            >
                                Suggested Provider
                            </label>
                            <select
                                id="suggestedProvider"
                                {...register("suggestedProvider", {
                                    required: "Suggested provider is required",
                                })}
                                onChange={handleSuggestedProviderChange}
                                className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
                            >
                                <option
                                    disabled
                                    value=""
                                    selected
                                    defaultValue=""
                                >
                                    Select a provider
                                </option>
                                {providers.map((provider) => (
                                    <option
                                        key={provider.providerName}
                                        value={provider.providerName}
                                    >
                                        {provider.providerName}{" "}
                                        {provider.degree}
                                    </option>
                                ))}
                            </select>

                            {errors.suggestedProvider && (
                                <span className="text-red-500 z-10">
                                    {errors.suggestedProvider.message}
                                </span>
                            )}
                        </motion.div> */}

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label
								htmlFor="pdf"
								className="block mb-2 text-gray-700 dark:text-gray-300 cursor-pointer z-10"
							>
								Upload PDF Document (optional)
							</label>
							<input
								type="file"
								id="pdf"
								ref={fileInputRef}
								accept=".pdf"
								className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer z-10"
							/>
						</motion.div>

						<motion.div
							className="mb-4 z-10"
							variants={itemVariants}
						>
							<label className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer z-10">
								<input
									type="checkbox"
									{...register("consentGiven", {
										required:
											"You must give consent to proceed",
									})}
									className="mr-2 cursor-pointer z-10"
								/>
								I consent to the processing of my personal data
							</label>
							{errors.consentGiven && (
								<span className="text-red-500 z-10">
									{errors.consentGiven.message}
								</span>
							)}
						</motion.div>

						<motion.button
							type="submit"
							disabled={isLoading}
							className={`w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:col-span-2 lg:col-span-3 xl:col-span-4 z-10 ${
								isLoading ? "opacity-50 cursor-not-allowed" : ""
							}`}
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{isLoading ? "Submitting..." : "SUBMIT"}
						</motion.button>
					</div>
				</motion.form>
			</div>
		</div>
	);
};

export default ContactForm;
