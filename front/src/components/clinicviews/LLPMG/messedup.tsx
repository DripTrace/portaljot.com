// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { motion } from "framer-motion";
// import debounce from "lodash/debounce";

// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     year: string;
//     month: string;
//     day: string;
//     insurance: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     pharmacy: string;
//     reason: string;
//     customReason?: string;
//     suggestedAppointment: Date | null;
//     consentGiven: boolean;
// }

// const states = [
//     "AL",
//     "AK",
//     "AZ",
//     "AR",
//     "CA",
//     "CO",
//     "CT",
//     "DE",
//     "FL",
//     "GA",
//     "HI",
//     "ID",
//     "IL",
//     "IN",
//     "IA",
//     "KS",
//     "KY",
//     "LA",
//     "ME",
//     "MD",
//     "MA",
//     "MI",
//     "MN",
//     "MS",
//     "MO",
//     "MT",
//     "NE",
//     "NV",
//     "NH",
//     "NJ",
//     "NM",
//     "NY",
//     "NC",
//     "ND",
//     "OH",
//     "OK",
//     "OR",
//     "PA",
//     "RI",
//     "SC",
//     "SD",
//     "TN",
//     "TX",
//     "UT",
//     "VT",
//     "VA",
//     "WA",
//     "WV",
//     "WI",
//     "WY",
// ];

// const pharmacies = [
//     "CVS",
//     "Walgreens",
//     "Walmart",
//     "Rite Aid",
//     "Safeway",
//     "Kroger",
//     "Target Pharmacy",
//     "Costco Pharmacy",
//     "Albertsons",
//     "Vons",
// ];

// const reasons = [
//     "New Patient Registration",
//     "Follow-up Appointment",
//     "Prescription Refill",
//     "Mental Health Consultation",
//     "Therapy Session",
//     "Other",
// ];

// const ContactForm: React.FC = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         watch,
//     } = useForm<FormData>();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const watchSuggestedAppointment = watch("suggestedAppointment");
//     const watchReason = watch("reason");

//     const onSubmit = async (data: FormData) => {
//         setIsLoading(true);
//         setError("");

//         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
//         if (isNaN(birthDate.getTime())) {
//             setError("Invalid date of birth");
//             setIsLoading(false);
//             return;
//         }

//         const minAgeDate = new Date();
//         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

//         if (birthDate > minAgeDate) {
//             setError("Patient must be at least 2 years old.");
//             setIsLoading(false);
//             return;
//         }

//         if (!isValidAppointmentTime(data.suggestedAppointment)) {
//             setError(
//                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
//             );
//             setIsLoading(false);
//             return;
//         }

//         const formattedPhone = formatPhoneNumber(data.phone);

//         const formData = new FormData();
//         Object.entries(data).forEach(([key, value]) => {
//             if (key === "suggestedAppointment" && value) {
//                 formData.append(key, (value as Date).toISOString());
//             } else if (key === "phone") {
//                 formData.append(key, formattedPhone);
//             } else if (
//                 key !== "year" &&
//                 key !== "month" &&
//                 key !== "day" &&
//                 key !== "customReason"
//             ) {
//                 formData.append(key, value as string);
//             }
//         });

//         const formattedBirthday = `${data.month}-${data.day}-${data.year}`;
//         formData.append("birthday", formattedBirthday);
//         if (data.reason === "Other" && data.customReason) {
//             formData.append("reason", data.customReason);
//         }

//         if (fileInputRef.current?.files?.[0]) {
//             formData.append("pdf", fileInputRef.current.files[0]);
//         }

//         try {
//             const response = await fetch("/api/llpmg-register-patient/route", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to register patient");
//             }

//             alert(
//                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
//             );
//             Object.keys(data).forEach((key) =>
//                 setValue(key as keyof FormData, "")
//             );
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         } catch (err) {
//             setError(
//                 "An error occurred while submitting your information. Please try again."
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const isValidAppointmentTime = (date: Date | null): boolean => {
//         if (!date) return false;
//         const day = date.getDay();
//         const hours = date.getHours();
//         const isWeekday = day > 0 && day < 6;
//         const isBusinessHours = hours >= 9 && hours < 17;
//         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
//         return isWeekday && isBusinessHours && isFutureDate;
//     };

//     const formatPhoneNumber = (phone: string): string => {
//         const digitsOnly = phone.replace(/\D/g, "");
//         return `+1${digitsOnly.slice(-10)}`;
//     };

//     const debouncedAddressSearch = debounce(async (input: string) => {
//         if (input.length > 2) {
//             try {
//                 const response = await fetch(
//                     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us`
//                 );
//                 const data = await response.json();
//                 const suggestions = data.map((item: any) => item.display_name);
//                 setAddressSuggestions(suggestions.slice(0, 5));
//             } catch (error) {
//                 console.error("Error fetching address suggestions:", error);
//             }
//         } else {
//             setAddressSuggestions([]);
//         }
//     }, 300);

//     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setValue("address", value);
//         debouncedAddressSearch(value);
//     };

//     const handleAddressSelect = (selectedAddress: string) => {
//         setValue("address", selectedAddress);
//         setAddressSuggestions([]);
//         // Parse the selected address to fill in city, state, and zip code
//         const parts = selectedAddress.split(", ");
//         if (parts.length >= 3) {
//             setValue("city", parts[parts.length - 3]);
//             const stateZip = parts[parts.length - 2].split(" ");
//             setValue("state", stateZip[0]);
//             setValue("zipCode", stateZip[1]);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             debouncedAddressSearch.cancel();
//         };
//     }, []);

//     const containerVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 15,
//                 when: "beforeChildren",
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { type: "spring", stiffness: 100, damping: 15 },
//         },
//     };

//     return (
//         <motion.form
//             onSubmit={handleSubmit(onSubmit)}
//             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="firstName"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         First Name
//                     </label>
//                     <input
//                         id="firstName"
//                         {...register("firstName", {
//                             required: "First name is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                     />
//                     {errors.firstName && (
//                         <span className="text-red-500">
//                             {errors.firstName.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="lastName"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Last Name
//                     </label>
//                     <input
//                         id="lastName"
//                         {...register("lastName", {
//                             required: "Last name is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                     />
//                     {errors.lastName && (
//                         <span className="text-red-500">
//                             {errors.lastName.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="email"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         {...register("email", {
//                             required: "Email is required",
//                             pattern: {
//                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                 message: "Invalid email address",
//                             },
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                     />
//                     {errors.email && (
//                         <span className="text-red-500">
//                             {errors.email.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="phone"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Phone
//                     </label>
//                     <div className="flex">
//                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
//                             +1
//                         </span>
//                         <input
//                             id="phone"
//                             type="tel"
//                             {...register("phone", {
//                                 required: "Phone is required",
//                                 pattern: {
//                                     value: /^[2-9]\d{9}$/,
//                                     message:
//                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
//                                 },
//                             })}
//                             placeholder="1234567890"
//                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text"
//                         />
//                     </div>
//                     {errors.phone && (
//                         <span className="text-red-500">
//                             {errors.phone.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
//                     <label
//                         htmlFor="year"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Date of Birth
//                     </label>
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         <select
//                             id="year"
//                             {...register("year", {
//                                 required: "Year is required",
//                             })}
//                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                         >
//                             <option value="">Year</option>
//                             {Array.from(
//                                 { length: new Date().getFullYear() - 1900 + 1 },
//                                 (_, i) => new Date().getFullYear() - i
//                             ).map((year) => (
//                                 <option key={year} value={year}>
//                                     {year}
//                                 </option>
//                             ))}
//                         </select>
//                         <select
//                             id="month"
//                             {...register("month", {
//                                 required: "Month is required",
//                             })}
//                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                         >
//                             <option value="">Month</option>
//                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
//                                 (month) => (
//                                     <option key={month} value={month}>
//                                         {new Date(0, month - 1).toLocaleString(
//                                             "en-US",
//                                             { month: "long" }
//                                         )}
//                                     </option>
//                                 )
//                             )}
//                         </select>
//                         <select
//                             id="day"
//                             {...register("day", {
//                                 required: "Day is required",
//                             })}
//                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                         >
//                             <option value="">Day</option>
//                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
//                                 (day) => (
//                                     <option key={day} value={day}>
//                                         {day}
//                                     </option>
//                                 )
//                             )}
//                         </select>
//                     </div>
//                     {(errors.year || errors.month || errors.day) && (
//                         <span className="text-red-500">
//                             Invalid date of birth
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="insurance"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Insurance Provider
//                     </label>
//                     <select
//                         id="insurance"
//                         {...register("insurance", {
//                             required: "Insurance provider is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     >
//                         <option value="" disabled>
//                             Select your insurance provider
//                         </option>
//                         <option value="IEHP">IEHP</option>
//                         <option value="Blue Cross Blue Shield">
//                             Blue Cross Blue Shield
//                         </option>
//                         <option value="UnitedHealthcare">
//                             UnitedHealthcare
//                         </option>
//                         <option value="Health Net">Health Net</option>
//                         <option value="Central Health Plan of California">
//                             Central Health Plan of California
//                         </option>
//                         <option value="Aetna">Aetna</option>
//                         <option value="Cigna">Cigna</option>
//                         <option value="Medicare">Medicare</option>
//                     </select>
//                     {errors.insurance && (
//                         <span className="text-red-500">
//                             {errors.insurance.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="address"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Address
//                     </label>
//                     <input
//                         id="address"
//                         {...register("address", {
//                             required: "Address is required",
//                         })}
//                         onChange={handleAddressChange}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                     />
//                     {addressSuggestions.length > 0 && (
//                         <ul className="mt-2 bg-white dark:bg-gray-800 border rounded">
//                             {addressSuggestions.map((suggestion, index) => (
//                                 <li
//                                     key={index}
//                                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                                     onClick={() =>
//                                         handleAddressSelect(suggestion)
//                                     }
//                                 >
//                                     {suggestion}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                     {errors.address && (
//                         <span className="text-red-500">
//                             {errors.address.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="city"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         City
//                     </label>
//                     <input
//                         id="city"
//                         {...register("city", { required: "City is required" })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                     />
//                     {errors.city && (
//                         <span className="text-red-500">
//                             {errors.city.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="state"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         State
//                     </label>
//                     <select
//                         id="state"
//                         {...register("state", {
//                             required: "State is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     >
//                         <option value="" disabled>
//                             Select your state
//                         </option>
//                         {states.map((state) => (
//                             <option key={state} value={state}>
//                                 {state}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.state && (
//                         <span className="text-red-500">
//                             {errors.state.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="zipCode"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Zip Code
//                     </label>
//                     <input
//                         id="zipCode"
//                         {...register("zipCode", {
//                             required: "Zip code is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                     />
//                     {errors.zipCode && (
//                         <span className="text-red-500">
//                             {errors.zipCode.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="pharmacy"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Preferred Pharmacy
//                     </label>
//                     <select
//                         id="pharmacy"
//                         {...register("pharmacy", {
//                             required: "Preferred pharmacy is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     >
//                         <option value="" disabled>
//                             Select your preferred pharmacy
//                         </option>
//                         {pharmacies.map((pharmacy) => (
//                             <option key={pharmacy} value={pharmacy}>
//                                 {pharmacy}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.pharmacy && (
//                         <span className="text-red-500">
//                             {errors.pharmacy.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="reason"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Reason for Visit
//                     </label>
//                     <select
//                         id="reason"
//                         {...register("reason", {
//                             required: "Reason for visit is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     >
//                         <option value="" disabled>
//                             Select your reason for visit
//                         </option>
//                         {reasons.map((reason) => (
//                             <option key={reason} value={reason}>
//                                 {reason}
//                             </option>
//                         ))}
//                     </select>
//                     {watchReason === "Other" && (
//                         <textarea
//                             id="customReason"
//                             {...register("customReason", {
//                                 required: "Please specify your reason",
//                             })}
//                             placeholder="Please specify your reason"
//                             className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                         />
//                     )}
//                     {errors.reason && (
//                         <span className="text-red-500">
//                             {errors.reason.message}
//                         </span>
//                     )}
//                     {watchReason === "Other" && errors.customReason && (
//                         <span className="text-red-500">
//                             {errors.customReason.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="suggestedAppointment"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Suggested Appointment Time
//                     </label>
//                     <DatePicker
//                         selected={watchSuggestedAppointment}
//                         onChange={(date: Date | null) =>
//                             setValue("suggestedAppointment", date)
//                         }
//                         showTimeSelect
//                         timeIntervals={15}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//                         minDate={new Date()}
//                         placeholderText="Select a date and time"
//                         popperClassName="react-datepicker-popper"
//                         calendarClassName="react-datepicker-calendar"
//                     />
//                     {errors.suggestedAppointment && (
//                         <span className="text-red-500">
//                             {errors.suggestedAppointment.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="pdf"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Upload PDF Document (optional)
//                     </label>
//                     <input
//                         type="file"
//                         id="pdf"
//                         ref={fileInputRef}
//                         accept=".pdf"
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     />
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label className="flex items-center text-gray-700 dark:text-gray-300">
//                         <input
//                             type="checkbox"
//                             {...register("consentGiven", {
//                                 required: "You must give consent to proceed",
//                             })}
//                             className="mr-2 cursor-pointer"
//                         />
//                         I consent to the processing of my personal data
//                     </label>
//                     {errors.consentGiven && (
//                         <span className="text-red-500">
//                             {errors.consentGiven.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
//                         isLoading ? "opacity-50 cursor-not-allowed" : ""
//                     } lg:col-span-3`}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     {isLoading ? "Submitting..." : "Submit"}
//                 </motion.button>
//             </div>
//         </motion.form>
//     );
// };

// export default ContactForm;

// import type { NextApiRequest, NextApiResponse } from "next";
// import { IncomingForm, File } from "formidable";
// import nodemailer from "nodemailer";
// import { renderToString } from "react-dom/server";
// import LLPMGEmailTemplate from "@/components/LLPMG/LLPMGEmailTemplate";
// import { SDK } from "@ringcentral/sdk";
// import ical from "ical-generator";
// import { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
// import fs from "fs/promises";
// import { createWriteStream } from "fs";
// import archiver from "archiver";
// import path from "path";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const rcsdk = new SDK({
//     server: process.env.RC_SERVER_URL,
//     clientId: process.env.RC_CLIENT_ID,
//     clientSecret: process.env.RC_CLIENT_SECRET,
// });

// const platform = rcsdk.platform();

// async function sendSMS(to: string | number, message: string) {
//     try {
//         await platform.login({ jwt: process.env.RC_JWT });

//         // Convert to string and ensure it's in E.164 format
//         const phoneString = String(to);
//         const formattedPhoneNumber = phoneString.startsWith("+1")
//             ? phoneString
//             : `+1${phoneString.replace(/\D/g, "")}`;

//         // Validate the formatted number
//         if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
//             throw new Error(
//                 `Invalid phone number format: ${formattedPhoneNumber}`
//             );
//         }

//         const resp = await platform.post(
//             "/restapi/v1.0/account/~/extension/~/sms",
//             {
//                 from: { phoneNumber: process.env.RC_PHONE_NUMBER },
//                 to: [{ phoneNumber: formattedPhoneNumber }],
//                 text: message,
//             }
//         );

//         return resp.json();
//     } catch (error) {
//         console.error("Error sending SMS:", error);
//         throw error;
//     }
// }

// async function compressFile(file: File): Promise<string> {
//     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
//     const output = createWriteStream(zipFilePath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     return new Promise((resolve, reject) => {
//         output.on("close", () => resolve(zipFilePath));
//         archive.on("error", reject);
//         archive.pipe(output);
//         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
//         archive.finalize();
//     });
// }

// function formatDateTime(dateString: string): string {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//     });
// }

// async function sendEmailWithCalendar(
//     transporter: nodemailer.Transporter,
//     to: string,
//     subject: string,
//     content: string,
//     calendarEvent: any,
//     attachments?: nodemailer.SendMailOptions["attachments"]
// ) {
//     const mailOptions: nodemailer.SendMailOptions = {
//         from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
//         to,
//         subject,
//         html: content,
//         attachments: [
//             ...(attachments || []),
//             {
//                 filename: "event.ics",
//                 content: calendarEvent.toString(),
//                 contentType: "text/calendar",
//             },
//         ],
//         alternatives: [
//             {
//                 contentType: "text/calendar",
//                 content: Buffer.from(calendarEvent.toString()),
//                 contentDisposition: "inline",
//             },
//         ],
//     };

//     await transporter.sendMail(mailOptions);
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method not allowed" });
//     }

//     try {
//         const form = new IncomingForm();
//         const [fields, files] = await new Promise<[any, any]>(
//             (resolve, reject) => {
//                 form.parse(req, (err, fields, files) => {
//                     if (err) reject(err);
//                     resolve([fields, files]);
//                 });
//             }
//         );

//         const {
//             firstName,
//             lastName,
//             email,
//             phone,
//             year,
//             month,
//             day,
//             insurance,
//             address,
//             city,
//             state,
//             zipCode,
//             pharmacy,
//             reason,
//             customReason,
//             suggestedAppointment,
//         } = fields;
//         const file = files.pdf ? files.pdf[0] : null;

//         const fullName = `${firstName} ${lastName}`;
//         const birthday = `${month}-${day}-${year}`;
//         const formattedAppointmentTime = formatDateTime(suggestedAppointment);
//         const reasonForVisit = reason === "Other" ? customReason : reason;

//         // Create iCal event
//         const calendarEvent = ical({
//             prodId: { company: "LLPMG", product: "Appointment" },
//             name: "LLPMG Appointment",
//         });

//         calendarEvent.createEvent({
//             start: new Date(suggestedAppointment),
//             end: new Date(
//                 new Date(suggestedAppointment).getTime() + 60 * 60 * 1000
//             ), // 1 hour duration
//             summary: `Appointment with ${fullName}`,
//             description: `Appointment for ${fullName}\nReason: ${reasonForVisit}`,
//             location: "Loma Linda Psychiatric Medical Group",
//             url: "https://lomalindapsych.com",
//             organizer: {
//                 name: "LLPMG",
//                 email: process.env.PROTONMAIL_SENDER,
//             },
//             attendees: [
//                 {
//                     name: fullName,
//                     email: email,
//                     rsvp: true,
//                     role: ICalAttendeeRole.REQ,
//                     status: ICalAttendeeStatus.NEEDSACTION,
//                 },
//             ],
//         });

//         let emailTransporter = nodemailer.createTransport({
//             host: process.env.PROTONMAIL_HOST,
//             port: Number(process.env.PROTONMAIL_PORT),
//             secure: false,
//             auth: {
//                 user: process.env.PROTONMAIL_SENDER,
//                 pass: process.env.PROTONMAIL_PASSWORD,
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         const patientEmailHtml = renderToString(
//             LLPMGEmailTemplate({
//                 name: fullName,
//                 email,
//                 phone,
//                 birthday,
//                 insurance,
//                 address,
//                 city,
//                 state,
//                 zipCode,
//                 pharmacy,
//                 reason: reasonForVisit,
//                 suggestedAppointment: formattedAppointmentTime,
//                 isDoctor: false,
//             })
//         );
//         const doctorEmailHtml = renderToString(
//             LLPMGEmailTemplate({
//                 name: fullName,
//                 email,
//                 phone,
//                 birthday,
//                 insurance,
//                 address,
//                 city,
//                 state,
//                 zipCode,
//                 pharmacy,
//                 reason: reasonForVisit,
//                 suggestedAppointment: formattedAppointmentTime,
//                 isDoctor: true,
//             })
//         );

//         let fileContent, fileSize;
//         if (file) {
//             const zipFilePath = await compressFile(file);
//             fileContent = await fs.readFile(zipFilePath);
//             fileSize = fileContent.length;

//             const descriptiveFilename = `${firstName}_${lastName}_${Date.now()}.zip`;

//             console.log("Compressed file details:", {
//                 name: descriptiveFilename,
//                 size: fileSize,
//             });

//             // Send email to doctor with the attachment
//             await sendEmailWithCalendar(
//                 emailTransporter,
//                 process.env.PROTONMAIL_RECIPIENT!,
//                 `New Patient Registration Details - ${formattedAppointmentTime}`,
//                 doctorEmailHtml,
//                 calendarEvent,
//                 [
//                     {
//                         filename: descriptiveFilename,
//                         content: fileContent,
//                     },
//                 ]
//             );
//         } else {
//             // Send email to doctor without the attachment
//             await sendEmailWithCalendar(
//                 emailTransporter,
//                 process.env.PROTONMAIL_RECIPIENT!,
//                 `New Patient Registration Details - ${formattedAppointmentTime}`,
//                 doctorEmailHtml,
//                 calendarEvent
//             );
//         }

//         // Send email to patient without the attachment
//         await sendEmailWithCalendar(
//             emailTransporter,
//             email,
//             `Registration Confirmation - ${formattedAppointmentTime}`,
//             patientEmailHtml,
//             calendarEvent
//         );

//         const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion for ${formattedAppointmentTime} has been received. We will contact you soon to confirm.`;
//         await sendSMS(phone, smsMessage);

//         res.status(200).json({ message: "Registration successful" });
//     } catch (error) {
//         console.error("Error in API route:", error);
//         res.status(500).json({
//             error: "An unknown error occurred",
//             details: (error as Error).message,
//         });
//     }
// }

// mport React from "react";

// interface LLPMGEmailTemplateProps {
//     name: string;
//     email: string;
//     phone: string;
//     birthday: string;
//     insurance: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     pharmacy: string;
//     reason: string;
//     suggestedAppointment: string;
//     isDoctor: boolean;
// }

// const LLPMGEmailTemplate: React.FC<LLPMGEmailTemplateProps> = ({
//     name,
//     email,
//     phone,
//     birthday,
//     insurance,
//     address,
//     city,
//     state,
//     zipCode,
//     pharmacy,
//     reason,
//     suggestedAppointment,
//     isDoctor,
// }) => {
//     const containerStyle = {
//         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//         maxWidth: "600px",
//         margin: "0 auto",
//         padding: "20px",
//         backgroundColor: "#ffffff",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     };

//     const headerStyle = {
//         backgroundColor: "#0C3C60",
//         color: "#ffffff",
//         padding: "20px",
//         textAlign: "center" as const,
//         borderRadius: "8px 8px 0 0",
//     };

//     const contentStyle = {
//         padding: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "0 0 8px 8px",
//     };

//     const fieldStyle = {
//         marginBottom: "10px",
//     };

//     const labelStyle = {
//         fontWeight: "bold",
//         color: "#0C3C60",
//     };

//     const footerStyle = {
//         marginTop: "20px",
//         fontSize: "12px",
//         color: "#888888",
//         textAlign: "center" as const,
//     };

//     return (
//         <div style={containerStyle}>
//             <div style={headerStyle}>
//                 <h1 style={{ margin: 0 }}>
//                     {isDoctor
//                         ? "New Patient Registration"
//                         : "Registration Confirmation"}
//                 </h1>
//             </div>
//             <div style={contentStyle}>
//                 <p>
//                     {isDoctor
//                         ? "A new patient has registered. Here are the details we've received:"
//                         : "Thank you for registering with Loma Linda Psychiatric Medical Group. Here are the details we've received:"}
//                 </p>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Name:</span> {name}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Email:</span> {email}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Phone:</span> {phone}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Date of Birth:</span> {birthday}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Insurance:</span> {insurance}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Address:</span> {address}, {city},{" "}
//                     {state} {zipCode}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Preferred Pharmacy:</span>{" "}
//                     {pharmacy}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Reason for Visit:</span> {reason}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Suggested Appointment:</span>{" "}
//                     {suggestedAppointment}
//                 </div>
//                 <p>
//                     {isDoctor
//                         ? "Please review the attached PDF (if any) for additional information."
//                         : "We will contact you soon to confirm your registration and provide further information about your suggested appointment time."}
//                 </p>
//                 {!isDoctor && (
//                     <p
//                         style={{
//                             backgroundColor: "#e6f3ff",
//                             padding: "10px",
//                             borderRadius: "4px",
//                         }}
//                     >
//                         <strong>Next Steps:</strong>
//                         <br />
//                         1. We will review your registration details.
//                         <br />
//                         2. Our staff will contact you to confirm or reschedule
//                         your suggested appointment time.
//                         <br />
//                         3. Please prepare any relevant medical history or
//                         documentation for your visit.
//                     </p>
//                 )}
//                 <div style={footerStyle}>
//                     <p>
//                         If you have any questions, please contact us at{" "}
//                         <a
//                             href="mailto:llpmg@lomalindapsych.com"
//                             style={{ color: "#1FABC7" }}
//                         >
//                             llpmg@lomalindapsych.com
//                         </a>{" "}
//                         or{" "}
//                         <a href="tel:9097926262" style={{ color: "#1FABC7" }}>
//                             (909) 792-6262
//                         </a>
//                         .
//                     </p>
//                     <p>
//                         Loma Linda Psychiatric Medical Group
//                         <br />
//                         1686 Barton Rd, Redlands, CA 92373
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LLPMGEmailTemplate;

// // // import React from "react";

// // // interface LLPMGEmailTemplateProps {
// // //     name: string;
// // //     email: string;
// // //     phone: string;
// // //     birthday: string;
// // //     insurance: string;
// // //     address: string;
// // //     city: string;
// // //     state: string;
// // //     zipCode: string;
// // //     pharmacy: string;
// // //     reason: string;
// // //     suggestedAppointment: string;
// // //     isDoctor: boolean;
// // // }

// // // const LLPMGEmailTemplate: React.FC<LLPMGEmailTemplateProps> = ({
// // //     name,
// // //     email,
// // //     phone,
// // //     birthday,
// // //     insurance,
// // //     address,
// // //     city,
// // //     state,
// // //     zipCode,
// // //     pharmacy,
// // //     reason,
// // //     suggestedAppointment,
// // //     isDoctor,
// // // }) => {
// // //     const containerStyle = {
// // //         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
// // //         maxWidth: "600px",
// // //         margin: "0 auto",
// // //         padding: "20px",
// // //         backgroundColor: "#ffffff",
// // //         borderRadius: "8px",
// // //         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// // //     };

// // //     const headerStyle = {
// // //         backgroundColor: "#0C3C60",
// // //         color: "#ffffff",
// // //         padding: "20px",
// // //         textAlign: "center" as const,
// // //         borderRadius: "8px 8px 0 0",
// // //     };

// // //     const contentStyle = {
// // //         padding: "20px",
// // //         backgroundColor: "#f9f9f9",
// // //         borderRadius: "0 0 8px 8px",
// // //     };

// // //     const fieldStyle = {
// // //         marginBottom: "10px",
// // //     };

// // //     const labelStyle = {
// // //         fontWeight: "bold",
// // //         color: "#0C3C60",
// // //     };

// // //     const footerStyle = {
// // //         marginTop: "20px",
// // //         fontSize: "12px",
// // //         color: "#888888",
// // //         textAlign: "center" as const,
// // //     };

// // //     return (
// // //         <div style={containerStyle}>
// // //             <div style={headerStyle}>
// // //                 <h1 style={{ margin: 0 }}>
// // //                     {isDoctor
// // //                         ? "New Patient Registration"
// // //                         : "Registration Confirmation"}
// // //                 </h1>
// // //             </div>
// // //             <div style={contentStyle}>
// // //                 <p>
// // //                     {isDoctor
// // //                         ? "A new patient has registered. Here are the details we've received:"
// // //                         : "Thank you for registering with Loma Linda Psychiatric Medical Group. Here are the details we've received:"}
// // //                 </p>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Name:</span> {name}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Email:</span> {email}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Phone:</span> {phone}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Date of Birth:</span> {birthday}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Insurance:</span> {insurance}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Address:</span> {address}, {city},{" "}
// // //                     {state} {zipCode}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Preferred Pharmacy:</span>{" "}
// // //                     {pharmacy}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Reason for Visit:</span> {reason}
// // //                 </div>
// // //                 <div style={fieldStyle}>
// // //                     <span style={labelStyle}>Suggested Appointment:</span>{" "}
// // //                     {suggestedAppointment}
// // //                 </div>
// // //                 <p>
// // //                     {isDoctor
// // //                         ? "Please review the attached PDF (if any) for additional information."
// // //                         : "We will contact you soon to confirm your registration and provide further information about your suggested appointment time."}
// // //                 </p>
// // //                 {!isDoctor && (
// // //                     <p
// // //                         style={{
// // //                             backgroundColor: "#e6f3ff",
// // //                             padding: "10px",
// // //                             borderRadius: "4px",
// // //                         }}
// // //                     >
// // //                         <strong>Next Steps:</strong>
// // //                         <br />
// // //                         1. We will review your registration details.
// // //                         <br />
// // //                         2. Our staff will contact you to confirm or reschedule
// // //                         your suggested appointment time.
// // //                         <br />
// // //                         3. Please prepare any relevant medical history or
// // //                         documentation for your visit.
// // //                     </p>
// // //                 )}
// // //                 <div style={footerStyle}>
// // //                     <p>
// // //                         If you have any questions, please contact us at{" "}
// // //                         <a
// // //                             href="mailto:llpmg@lomalindapsych.com"
// // //                             style={{ color: "#1FABC7" }}
// // //                         >
// // //                             llpmg@lomalindapsych.com
// // //                         </a>{" "}
// // //                         or{" "}
// // //                         <a href="tel:9097926262" style={{ color: "#1FABC7" }}>
// // //                             (909) 792-6262
// // //                         </a>
// // //                         .
// // //                     </p>
// // //                     <p>
// // //                         Loma Linda Psychiatric Medical Group
// // //                         <br />
// // //                         1686 Barton Rd, Redlands, CA 92373
// // //                     </p>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default LLPMGEmailTemplate;

// // import React from "react";

// // interface LLPMGEmailTemplateProps {
// //     name: string;
// //     email: string;
// //     phone: string;
// //     birthday: string;
// //     insurance: string;
// //     address: string;
// //     city: string;
// //     state: string;
// //     zipCode: string;
// //     pharmacy: string;
// //     reason: string;
// //     suggestedAppointment: string;
// //     isDoctor: boolean;
// // }

// // const LLPMGEmailTemplate: React.FC<LLPMGEmailTemplateProps> = ({
// //     name,
// //     email,
// //     phone,
// //     birthday,
// //     insurance,
// //     address,
// //     city,
// //     state,
// //     zipCode,
// //     pharmacy,
// //     reason,
// //     suggestedAppointment,
// //     isDoctor,
// // }) => {
// //     const containerStyle = {
// //         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
// //         maxWidth: "600px",
// //         margin: "0 auto",
// //         padding: "20px",
// //         backgroundColor: "#ffffff",
// //         borderRadius: "8px",
// //         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// //     };

// //     const headerStyle = {
// //         backgroundColor: "#0C3C60",
// //         color: "#ffffff",
// //         padding: "20px",
// //         textAlign: "center" as const,
// //         borderRadius: "8px 8px 0 0",
// //     };

// //     const contentStyle = {
// //         padding: "20px",
// //         backgroundColor: "#f9f9f9",
// //         borderRadius: "0 0 8px 8px",
// //     };

// //     const fieldStyle = {
// //         marginBottom: "10px",
// //     };

// //     const labelStyle = {
// //         fontWeight: "bold",
// //         color: "#0C3C60",
// //     };

// //     const footerStyle = {
// //         marginTop: "20px",
// //         fontSize: "12px",
// //         color: "#888888",
// //         textAlign: "center" as const,
// //     };

// //     return (
// //         <div style={containerStyle}>
// //             <div style={headerStyle}>
// //                 <h1 style={{ margin: 0 }}>
// //                     {isDoctor
// //                         ? "New Patient Registration"
// //                         : "Registration Confirmation"}
// //                 </h1>
// //             </div>
// //             <div style={contentStyle}>
// //                 <p>
// //                     {isDoctor
// //                         ? "A new patient has registered. Here are the details we've received:"
// //                         : "Thank you for registering with Loma Linda Psychiatric Medical Group. Here are the details we've received:"}
// //                 </p>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Name:</span> {name}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Email:</span> {email}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Phone:</span> {phone}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Date of Birth:</span> {birthday}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Insurance:</span> {insurance}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Address:</span> {address}, {city},{" "}
// //                     {state} {zipCode}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Preferred Pharmacy:</span>{" "}
// //                     {pharmacy}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Reason for Visit:</span> {reason}
// //                 </div>
// //                 <div style={fieldStyle}>
// //                     <span style={labelStyle}>Suggested Appointment:</span>{" "}
// //                     {suggestedAppointment}
// //                 </div>
// //                 <p>
// //                     {isDoctor
// //                         ? "Please review the attached PDF (if any) for additional information."
// //                         : "We will contact you soon to confirm your registration and provide further information about your suggested appointment time."}
// //                 </p>
// //                 {!isDoctor && (
// //                     <p
// //                         style={{
// //                             backgroundColor: "#e6f3ff",
// //                             padding: "10px",
// //                             borderRadius: "4px",
// //                         }}
// //                     >
// //                         <strong>Next Steps:</strong>
// //                         <br />
// //                         1. We will review your registration details.
// //                         <br />
// //                         2. Our staff will contact you to confirm or reschedule
// //                         your suggested appointment time.
// //                         <br />
// //                         3. Please prepare any relevant medical history or
// //                         documentation for your visit.
// //                     </p>
// //                 )}
// //                 <div style={footerStyle}>
// //                     <p>
// //                         If you have any questions, please contact us at{" "}
// //                         <a
// //                             href="mailto:llpmg@lomalindapsych.com"
// //                             style={{ color: "#1FABC7" }}
// //                         >
// //                             llpmg@lomalindapsych.com
// //                         </a>{" "}
// //                         or{" "}
// //                         <a href="tel:9097926262" style={{ color: "#1FABC7" }}>
// //                             (909) 792-6262
// //                         </a>
// //                         .
// //                     </p>
// //                     <p>
// //                         Loma Linda Psychiatric Medical Group
// //                         <br />
// //                         1686 Barton Rd, Redlands, CA 92373
// //                     </p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default LLPMGEmailTemplate;

// interface LLPMGEmailTemplateProps {
//     name: string;
//     email: string;
//     phone: string;
//     birthday: string;
//     insurance: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     pharmacy: string;
//     reason: string;
//     suggestedAppointment: string;
//     isDoctor: boolean;
// }

// const LLPMGEmailTemplate: React.FC<LLPMGEmailTemplateProps> = ({
//     name,
//     email,
//     phone,
//     birthday,
//     insurance,
//     address,
//     city,
//     state,
//     zipCode,
//     pharmacy,
//     reason,
//     suggestedAppointment,
//     isDoctor,
// }) => {
//     const containerStyle = {
//         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//         maxWidth: "600px",
//         margin: "0 auto",
//         padding: "20px",
//         backgroundColor: "#ffffff",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     };

//     const headerStyle = {
//         backgroundColor: "#0C3C60",
//         color: "#ffffff",
//         padding: "20px",
//         textAlign: "center" as const,
//         borderRadius: "8px 8px 0 0",
//     };

//     const contentStyle = {
//         padding: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "0 0 8px 8px",
//     };

//     const fieldStyle = {
//         marginBottom: "10px",
//     };

//     const labelStyle = {
//         fontWeight: "bold",
//         color: "#0C3C60",
//     };

//     const footerStyle = {
//         marginTop: "20px",
//         fontSize: "12px",
//         color: "#888888",
//         textAlign: "center" as const,
//     };

//     console.log("birthday", birthday);

//     return (
//         <div style={containerStyle}>
//             <div style={headerStyle}>
//                 <h1 style={{ margin: 0 }}>
//                     {isDoctor
//                         ? "New Patient Registration"
//                         : "Registration Confirmation"}
//                 </h1>
//             </div>
//             <div style={contentStyle}>
//                 <p>
//                     {isDoctor
//                         ? "A new patient has registered. Here are the details we've received:"
//                         : "Thank you for registering with Loma Linda Psychiatric Medical Group. Here are the details we've received:"}
//                 </p>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Name:</span> {name}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Email:</span> {email}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Phone:</span> {phone}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Date of Birth:</span> {birthday}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Insurance:</span> {insurance}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Address:</span> {address}, {city},{" "}
//                     {state} {zipCode}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Preferred Pharmacy:</span>{" "}
//                     {pharmacy}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Reason for Visit:</span> {reason}
//                 </div>
//                 <div style={fieldStyle}>
//                     <span style={labelStyle}>Suggested Appointment:</span>{" "}
//                     {suggestedAppointment}
//                 </div>
//                 <p>
//                     {isDoctor
//                         ? "Please review the attached PDF (if any) for additional information."
//                         : "We will contact you soon to confirm your registration and provide further information about your suggested appointment time."}
//                 </p>
//                 {!isDoctor && (
//                     <p
//                         style={{
//                             backgroundColor: "#e6f3ff",
//                             padding: "10px",
//                             borderRadius: "4px",
//                         }}
//                     >
//                         <strong>Next Steps:</strong>
//                         <br />
//                         1. We will review your registration details.
//                         <br />
//                         2. Our staff will contact you to confirm or reschedule
//                         your suggested appointment time.
//                         <br />
//                         3. Please prepare any relevant medical history or
//                         documentation for your visit.
//                     </p>
//                 )}
//                 <div style={footerStyle}>
//                     <p>
//                         If you have any questions, please contact us at{" "}
//                         <a
//                             href="mailto:llpmg@lomalindapsych.com"
//                             style={{ color: "#1FABC7" }}
//                         >
//                             llpmg@lomalindapsych.com
//                         </a>{" "}
//                         or{" "}
//                         <a href="tel:9097926262" style={{ color: "#1FABC7" }}>
//                             (909) 792-6262
//                         </a>
//                         .
//                     </p>
//                     <p>
//                         Loma Linda Psychiatric Medical Group
//                         <br />
//                         1686 Barton Rd, Redlands, CA 92373
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LLPMGEmailTemplate;

// // // // // // // "use client";

// // // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // // import { useForm } from "react-hook-form";
// // // // // // // import DatePicker from "react-datepicker";
// // // // // // // import "react-datepicker/dist/react-datepicker.css";
// // // // // // // import { motion } from "framer-motion";
// // // // // // // import debounce from "lodash/debounce";

// // // // // // // interface FormData {
// // // // // // //     firstName: string;
// // // // // // //     lastName: string;
// // // // // // //     email: string;
// // // // // // //     phone: string;
// // // // // // //     year: string;
// // // // // // //     month: string;
// // // // // // //     day: string;
// // // // // // //     insurance: string;
// // // // // // //     address: string;
// // // // // // //     city: string;
// // // // // // //     state: string;
// // // // // // //     zipCode: string;
// // // // // // //     pharmacy: string;
// // // // // // //     reason: string;
// // // // // // //     customReason?: string;
// // // // // // //     suggestedAppointment: Date | null;
// // // // // // //     consentGiven: boolean;
// // // // // // // }

// // // // // // // const states = [
// // // // // // //     "AL",
// // // // // // //     "AK",
// // // // // // //     "AZ",
// // // // // // //     "AR",
// // // // // // //     "CA",
// // // // // // //     "CO",
// // // // // // //     "CT",
// // // // // // //     "DE",
// // // // // // //     "FL",
// // // // // // //     "GA",
// // // // // // //     "HI",
// // // // // // //     "ID",
// // // // // // //     "IL",
// // // // // // //     "IN",
// // // // // // //     "IA",
// // // // // // //     "KS",
// // // // // // //     "KY",
// // // // // // //     "LA",
// // // // // // //     "ME",
// // // // // // //     "MD",
// // // // // // //     "MA",
// // // // // // //     "MI",
// // // // // // //     "MN",
// // // // // // //     "MS",
// // // // // // //     "MO",
// // // // // // //     "MT",
// // // // // // //     "NE",
// // // // // // //     "NV",
// // // // // // //     "NH",
// // // // // // //     "NJ",
// // // // // // //     "NM",
// // // // // // //     "NY",
// // // // // // //     "NC",
// // // // // // //     "ND",
// // // // // // //     "OH",
// // // // // // //     "OK",
// // // // // // //     "OR",
// // // // // // //     "PA",
// // // // // // //     "RI",
// // // // // // //     "SC",
// // // // // // //     "SD",
// // // // // // //     "TN",
// // // // // // //     "TX",
// // // // // // //     "UT",
// // // // // // //     "VT",
// // // // // // //     "VA",
// // // // // // //     "WA",
// // // // // // //     "WV",
// // // // // // //     "WI",
// // // // // // //     "WY",
// // // // // // // ];

// // // // // // // const pharmacies = [
// // // // // // //     "CVS",
// // // // // // //     "Walgreens",
// // // // // // //     "Walmart",
// // // // // // //     "Rite Aid",
// // // // // // //     "Safeway",
// // // // // // //     "Kroger",
// // // // // // //     "Target Pharmacy",
// // // // // // //     "Costco Pharmacy",
// // // // // // //     "Albertsons",
// // // // // // //     "Vons",
// // // // // // // ];

// // // // // // // const reasons = [
// // // // // // //     "New Patient Registration",
// // // // // // //     "Follow-up Appointment",
// // // // // // //     "Prescription Refill",
// // // // // // //     "Mental Health Consultation",
// // // // // // //     "Therapy Session",
// // // // // // //     "Other",
// // // // // // // ];

// // // // // // // const ContactForm: React.FC = () => {
// // // // // // //     const {
// // // // // // //         register,
// // // // // // //         handleSubmit,
// // // // // // //         formState: { errors },
// // // // // // //         setValue,
// // // // // // //         watch,
// // // // // // //     } = useForm<FormData>();
// // // // // // //     const [isLoading, setIsLoading] = useState(false);
// // // // // // //     const [error, setError] = useState("");
// // // // // // //     const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
// // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // // //     const watchSuggestedAppointment = watch("suggestedAppointment");
// // // // // // //     const watchReason = watch("reason");

// // // // // // //     const onSubmit = async (data: FormData) => {
// // // // // // //         setIsLoading(true);
// // // // // // //         setError("");

// // // // // // //         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
// // // // // // //         if (isNaN(birthDate.getTime())) {
// // // // // // //             setError("Invalid date of birth");
// // // // // // //             setIsLoading(false);
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         const minAgeDate = new Date();
// // // // // // //         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

// // // // // // //         if (birthDate > minAgeDate) {
// // // // // // //             setError("Patient must be at least 2 years old.");
// // // // // // //             setIsLoading(false);
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         if (!isValidAppointmentTime(data.suggestedAppointment)) {
// // // // // // //             setError(
// // // // // // //                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
// // // // // // //             );
// // // // // // //             setIsLoading(false);
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         const formattedPhone = formatPhoneNumber(data.phone);

// // // // // // //         const formData = new FormData();
// // // // // // //         Object.entries(data).forEach(([key, value]) => {
// // // // // // //             if (key === "suggestedAppointment" && value) {
// // // // // // //                 formData.append(key, (value as Date).toISOString());
// // // // // // //             } else if (key === "phone") {
// // // // // // //                 formData.append(key, formattedPhone);
// // // // // // //             } else if (
// // // // // // //                 key !== "year" &&
// // // // // // //                 key !== "month" &&
// // // // // // //                 key !== "day" &&
// // // // // // //                 key !== "customReason"
// // // // // // //             ) {
// // // // // // //                 formData.append(key, value as string);
// // // // // // //             }
// // // // // // //         });

// // // // // // //         formData.append("birthday", birthDate.toISOString());
// // // // // // //         if (data.reason === "Other" && data.customReason) {
// // // // // // //             formData.append("reason", data.customReason);
// // // // // // //         }

// // // // // // //         if (fileInputRef.current?.files?.[0]) {
// // // // // // //             formData.append("pdf", fileInputRef.current.files[0]);
// // // // // // //         }

// // // // // // //         try {
// // // // // // //             const response = await fetch("/api/llpmg-register-patient/route", {
// // // // // // //                 method: "POST",
// // // // // // //                 body: formData,
// // // // // // //             });

// // // // // // //             if (!response.ok) {
// // // // // // //                 throw new Error("Failed to register patient");
// // // // // // //             }

// // // // // // //             alert(
// // // // // // //                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
// // // // // // //             );
// // // // // // //             Object.keys(data).forEach((key) =>
// // // // // // //                 setValue(key as keyof FormData, "")
// // // // // // //             );
// // // // // // //             if (fileInputRef.current) {
// // // // // // //                 fileInputRef.current.value = "";
// // // // // // //             }
// // // // // // //         } catch (err) {
// // // // // // //             setError(
// // // // // // //                 "An error occurred while submitting your information. Please try again."
// // // // // // //             );
// // // // // // //         } finally {
// // // // // // //             setIsLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const isValidAppointmentTime = (date: Date | null): boolean => {
// // // // // // //         if (!date) return false;
// // // // // // //         const day = date.getDay();
// // // // // // //         const hours = date.getHours();
// // // // // // //         const isWeekday = day > 0 && day < 6;
// // // // // // //         const isBusinessHours = hours >= 9 && hours < 17;
// // // // // // //         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
// // // // // // //         return isWeekday && isBusinessHours && isFutureDate;
// // // // // // //     };

// // // // // // //     const formatPhoneNumber = (phone: string): string => {
// // // // // // //         const digitsOnly = phone.replace(/\D/g, "");
// // // // // // //         return `+1${digitsOnly.slice(-10)}`;
// // // // // // //     };

// // // // // // //     const debouncedAddressSearch = debounce(async (input: string) => {
// // // // // // //         if (input.length > 2) {
// // // // // // //             try {
// // // // // // //                 const response = await fetch(
// // // // // // //                     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
// // // // // // //                         input
// // // // // // //                     )}&countrycodes=us`
// // // // // // //                 );
// // // // // // //                 const data = await response.json();
// // // // // // //                 const suggestions = data.map((item: any) => item.display_name);
// // // // // // //                 setAddressSuggestions(suggestions.slice(0, 5));
// // // // // // //             } catch (error) {
// // // // // // //                 console.error("Error fetching address suggestions:", error);
// // // // // // //             }
// // // // // // //         } else {
// // // // // // //             setAddressSuggestions([]);
// // // // // // //         }
// // // // // // //     }, 300);

// // // // // // //     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const value = e.target.value;
// // // // // // //         setValue("address", value);
// // // // // // //         debouncedAddressSearch(value);
// // // // // // //     };

// // // // // // //     const handleAddressSelect = (selectedAddress: string) => {
// // // // // // //         setValue("address", selectedAddress);
// // // // // // //         setAddressSuggestions([]);
// // // // // // //         // Parse the selected address to fill in city, state, and zip code
// // // // // // //         const parts = selectedAddress.split(", ");
// // // // // // //         if (parts.length >= 3) {
// // // // // // //             setValue("city", parts[parts.length - 3]);
// // // // // // //             const stateZip = parts[parts.length - 2].split(" ");
// // // // // // //             setValue("state", stateZip[0]);
// // // // // // //             setValue("zipCode", stateZip[1]);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     useEffect(() => {
// // // // // // //         return () => {
// // // // // // //             debouncedAddressSearch.cancel();
// // // // // // //         };
// // // // // // //     }, []);

// // // // // // //     const containerVariants = {
// // // // // // //         hidden: { opacity: 0, y: 50 },
// // // // // // //         visible: {
// // // // // // //             opacity: 1,
// // // // // // //             y: 0,
// // // // // // //             transition: {
// // // // // // //                 type: "spring",
// // // // // // //                 stiffness: 100,
// // // // // // //                 damping: 15,
// // // // // // //                 when: "beforeChildren",
// // // // // // //                 staggerChildren: 0.1,
// // // // // // //             },
// // // // // // //         },
// // // // // // //     };

// // // // // // //     const itemVariants = {
// // // // // // //         hidden: { opacity: 0, y: 20 },
// // // // // // //         visible: {
// // // // // // //             opacity: 1,
// // // // // // //             y: 0,
// // // // // // //             transition: { type: "spring", stiffness: 100, damping: 15 },
// // // // // // //         },
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <motion.form
// // // // // // //             onSubmit={handleSubmit(onSubmit)}
// // // // // // //             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
// // // // // // //             variants={containerVariants}
// // // // // // //             initial="hidden"
// // // // // // //             animate="visible"
// // // // // // //         >
// // // // // // //             {error && <p className="text-red-500 mb-4">{error}</p>}

// // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="firstName"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         First Name
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         id="firstName"
// // // // // // //                         {...register("firstName", {
// // // // // // //                             required: "First name is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                     />
// // // // // // //                     {errors.firstName && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.firstName.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="lastName"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Last Name
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         id="lastName"
// // // // // // //                         {...register("lastName", {
// // // // // // //                             required: "Last name is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                     />
// // // // // // //                     {errors.lastName && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.lastName.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="email"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Email
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         id="email"
// // // // // // //                         type="email"
// // // // // // //                         {...register("email", {
// // // // // // //                             required: "Email is required",
// // // // // // //                             pattern: {
// // // // // // //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // // // // // //                                 message: "Invalid email address",
// // // // // // //                             },
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                     />
// // // // // // //                     {errors.email && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.email.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="phone"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Phone
// // // // // // //                     </label>
// // // // // // //                     <div className="flex">
// // // // // // //                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
// // // // // // //                             +1
// // // // // // //                         </span>
// // // // // // //                         <input
// // // // // // //                             id="phone"
// // // // // // //                             type="tel"
// // // // // // //                             {...register("phone", {
// // // // // // //                                 required: "Phone is required",
// // // // // // //                                 pattern: {
// // // // // // //                                     value: /^[2-9]\d{9}$/,
// // // // // // //                                     message:
// // // // // // //                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
// // // // // // //                                 },
// // // // // // //                             })}
// // // // // // //                             placeholder="1234567890"
// // // // // // //                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text"
// // // // // // //                         />
// // // // // // //                     </div>
// // // // // // //                     {errors.phone && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.phone.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="year"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Date of Birth
// // // // // // //                     </label>
// // // // // // //                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // // // // // //                         <select
// // // // // // //                             id="year"
// // // // // // //                             {...register("year", {
// // // // // // //                                 required: "Year is required",
// // // // // // //                             })}
// // // // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                         >
// // // // // // //                             <option value="">Year</option>
// // // // // // //                             {Array.from(
// // // // // // //                                 { length: new Date().getFullYear() - 1900 + 1 },
// // // // // // //                                 (_, i) => new Date().getFullYear() - i
// // // // // // //                             ).map((year) => (
// // // // // // //                                 <option key={year} value={year}>
// // // // // // //                                     {year}
// // // // // // //                                 </option>
// // // // // // //                             ))}
// // // // // // //                         </select>
// // // // // // //                         <select
// // // // // // //                             id="month"
// // // // // // //                             {...register("month", {
// // // // // // //                                 required: "Month is required",
// // // // // // //                             })}
// // // // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                         >
// // // // // // //                             <option value="">Month</option>
// // // // // // //                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
// // // // // // //                                 (month) => (
// // // // // // //                                     <option key={month} value={month}>
// // // // // // //                                         {new Date(0, month - 1).toLocaleString(
// // // // // // //                                             "en-US",
// // // // // // //                                             { month: "long" }
// // // // // // //                                         )}
// // // // // // //                                     </option>
// // // // // // //                                 )
// // // // // // //                             )}
// // // // // // //                         </select>
// // // // // // //                         <select
// // // // // // //                             id="day"
// // // // // // //                             {...register("day", {
// // // // // // //                                 required: "Day is required",
// // // // // // //                             })}
// // // // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                         >
// // // // // // //                             <option value="">Day</option>
// // // // // // //                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
// // // // // // //                                 (day) => (
// // // // // // //                                     <option key={day} value={day}>
// // // // // // //                                         {day}
// // // // // // //                                     </option>
// // // // // // //                                 )
// // // // // // //                             )}
// // // // // // //                         </select>
// // // // // // //                     </div>
// // // // // // //                     {(errors.year || errors.month || errors.day) && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             Invalid date of birth
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="insurance"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Insurance Provider
// // // // // // //                     </label>
// // // // // // //                     <select
// // // // // // //                         id="insurance"
// // // // // // //                         {...register("insurance", {
// // // // // // //                             required: "Insurance provider is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                     >
// // // // // // //                         <option value="" disabled>
// // // // // // //                             Select your insurance provider
// // // // // // //                         </option>
// // // // // // //                         <option value="IEHP">IEHP</option>
// // // // // // //                         <option value="Blue Cross Blue Shield">
// // // // // // //                             Blue Cross Blue Shield
// // // // // // //                         </option>
// // // // // // //                         <option value="UnitedHealthcare">
// // // // // // //                             UnitedHealthcare
// // // // // // //                         </option>
// // // // // // //                         <option value="Health Net">Health Net</option>
// // // // // // //                         <option value="Central Health Plan of California">
// // // // // // //                             Central Health Plan of California
// // // // // // //                         </option>
// // // // // // //                         <option value="Aetna">Aetna</option>
// // // // // // //                         <option value="Cigna">Cigna</option>
// // // // // // //                         <option value="Medicare">Medicare</option>
// // // // // // //                     </select>
// // // // // // //                     {errors.insurance && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.insurance.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="address"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Address
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         id="address"
// // // // // // //                         {...register("address", {
// // // // // // //                             required: "Address is required",
// // // // // // //                         })}
// // // // // // //                         onChange={handleAddressChange}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                     />
// // // // // // //                     {addressSuggestions.length > 0 && (
// // // // // // //                         <ul className="mt-2 bg-white dark:bg-gray-800 border rounded">
// // // // // // //                             {addressSuggestions.map((suggestion, index) => (
// // // // // // //                                 <li
// // // // // // //                                     key={index}
// // // // // // //                                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
// // // // // // //                                     onClick={() =>
// // // // // // //                                         handleAddressSelect(suggestion)
// // // // // // //                                     }
// // // // // // //                                 >
// // // // // // //                                     {suggestion}
// // // // // // //                                 </li>
// // // // // // //                             ))}
// // // // // // //                         </ul>
// // // // // // //                     )}
// // // // // // //                     {errors.address && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.address.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="city"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         City
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         id="city"
// // // // // // //                         {...register("city", { required: "City is required" })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                     />
// // // // // // //                     {errors.city && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.city.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="state"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         State
// // // // // // //                     </label>
// // // // // // //                     <select
// // // // // // //                         id="state"
// // // // // // //                         {...register("state", {
// // // // // // //                             required: "State is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                     >
// // // // // // //                         <option value="" disabled>
// // // // // // //                             Select your state
// // // // // // //                         </option>
// // // // // // //                         {states.map((state) => (
// // // // // // //                             <option key={state} value={state}>
// // // // // // //                                 {state}
// // // // // // //                             </option>
// // // // // // //                         ))}
// // // // // // //                     </select>
// // // // // // //                     {errors.state && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.state.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="zipCode"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Zip Code
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         id="zipCode"
// // // // // // //                         {...register("zipCode", {
// // // // // // //                             required: "Zip code is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                     />
// // // // // // //                     {errors.zipCode && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.zipCode.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // // //                     <label
// // // // // // //                         htmlFor="pharmacy"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Preferred Pharmacy
// // // // // // //                     </label>
// // // // // // //                     <select
// // // // // // //                         id="pharmacy"
// // // // // // //                         {...register("pharmacy", {
// // // // // // //                             required: "Preferred pharmacy is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                     >
// // // // // // //                         <option value="" disabled>
// // // // // // //                             Select your preferred pharmacy
// // // // // // //                         </option>
// // // // // // //                         {pharmacies.map((pharmacy) => (
// // // // // // //                             <option key={pharmacy} value={pharmacy}>
// // // // // // //                                 {pharmacy}
// // // // // // //                             </option>
// // // // // // //                         ))}
// // // // // // //                     </select>
// // // // // // //                     {errors.pharmacy && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.pharmacy.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div
// // // // // // //                     className="mb-4 lg:col-span-3"
// // // // // // //                     variants={itemVariants}
// // // // // // //                 >
// // // // // // //                     <label
// // // // // // //                         htmlFor="reason"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Reason for Visit
// // // // // // //                     </label>
// // // // // // //                     <select
// // // // // // //                         id="reason"
// // // // // // //                         {...register("reason", {
// // // // // // //                             required: "Reason for visit is required",
// // // // // // //                         })}
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                     >
// // // // // // //                         <option value="" disabled>
// // // // // // //                             Select your reason for visit
// // // // // // //                         </option>
// // // // // // //                         {reasons.map((reason) => (
// // // // // // //                             <option key={reason} value={reason}>
// // // // // // //                                 {reason}
// // // // // // //                             </option>
// // // // // // //                         ))}
// // // // // // //                     </select>
// // // // // // //                     {watchReason === "Other" && (
// // // // // // //                         <textarea
// // // // // // //                             id="customReason"
// // // // // // //                             {...register("customReason", {
// // // // // // //                                 required: "Please specify your reason",
// // // // // // //                             })}
// // // // // // //                             placeholder="Please specify your reason"
// // // // // // //                             className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                         />
// // // // // // //                     )}
// // // // // // //                     {errors.reason && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.reason.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                     {watchReason === "Other" && errors.customReason && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.customReason.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div
// // // // // // //                     className="mb-4 lg:col-span-3"
// // // // // // //                     variants={itemVariants}
// // // // // // //                 >
// // // // // // //                     <label
// // // // // // //                         htmlFor="suggestedAppointment"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Suggested Appointment Time
// // // // // // //                     </label>
// // // // // // //                     <DatePicker
// // // // // // //                         selected={watchSuggestedAppointment}
// // // // // // //                         onChange={(date: Date | null) =>
// // // // // // //                             setValue("suggestedAppointment", date)
// // // // // // //                         }
// // // // // // //                         showTimeSelect
// // // // // // //                         timeIntervals={15}
// // // // // // //                         dateFormat="MMMM d, yyyy h:mm aa"
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // // //                         minDate={new Date()}
// // // // // // //                         placeholderText="Select a date and time"
// // // // // // //                         popperClassName="react-datepicker-popper"
// // // // // // //                         calendarClassName="react-datepicker-calendar"
// // // // // // //                     />
// // // // // // //                     {errors.suggestedAppointment && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.suggestedAppointment.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div
// // // // // // //                     className="mb-4 lg:col-span-3"
// // // // // // //                     variants={itemVariants}
// // // // // // //                 >
// // // // // // //                     <label
// // // // // // //                         htmlFor="pdf"
// // // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // // //                     >
// // // // // // //                         Upload PDF Document (optional)
// // // // // // //                     </label>
// // // // // // //                     <input
// // // // // // //                         type="file"
// // // // // // //                         id="pdf"
// // // // // // //                         ref={fileInputRef}
// // // // // // //                         accept=".pdf"
// // // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // // //                     />
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.div
// // // // // // //                     className="mb-4 lg:col-span-3"
// // // // // // //                     variants={itemVariants}
// // // // // // //                 >
// // // // // // //                     <label className="flex items-center text-gray-700 dark:text-gray-300">
// // // // // // //                         <input
// // // // // // //                             type="checkbox"
// // // // // // //                             {...register("consentGiven", {
// // // // // // //                                 required: "You must give consent to proceed",
// // // // // // //                             })}
// // // // // // //                             className="mr-2 cursor-pointer"
// // // // // // //                         />
// // // // // // //                         I consent to the processing of my personal data
// // // // // // //                     </label>
// // // // // // //                     {errors.consentGiven && (
// // // // // // //                         <span className="text-red-500">
// // // // // // //                             {errors.consentGiven.message}
// // // // // // //                         </span>
// // // // // // //                     )}
// // // // // // //                 </motion.div>

// // // // // // //                 <motion.button
// // // // // // //                     type="submit"
// // // // // // //                     disabled={isLoading}
// // // // // // //                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
// // // // // // //                         isLoading ? "opacity-50 cursor-not-allowed" : ""
// // // // // // //                     } lg:col-span-3`}
// // // // // // //                     variants={itemVariants}
// // // // // // //                     whileHover={{ scale: 1.05 }}
// // // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // // //                 >
// // // // // // //                     {isLoading ? "Submitting..." : "Submit"}
// // // // // // //                 </motion.button>
// // // // // // //             </div>
// // // // // // //         </motion.form>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default ContactForm;

// // // // // // "use client";

// // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // import { useForm } from "react-hook-form";
// // // // // // import DatePicker from "react-datepicker";
// // // // // // import "react-datepicker/dist/react-datepicker.css";
// // // // // // import { motion } from "framer-motion";
// // // // // // import debounce from "lodash/debounce";
// // // // // // import { states, pharmacies, reasons } from "@/lib/constants";
// // // // // // import  FormData  from "@/lib/interfaces"

// // // // // // const ContactForm: React.FC = () => {
// // // // // //     const {
// // // // // //         register,
// // // // // //         handleSubmit,
// // // // // //         formState: { errors },
// // // // // //         setValue,
// // // // // //         watch,
// // // // // //     } = useForm<FormData>();
// // // // // //     const [isLoading, setIsLoading] = useState(false);
// // // // // //     const [error, setError] = useState("");
// // // // // //     const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
// // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // //     const watchSuggestedAppointment = watch("suggestedAppointment");
// // // // // //     const watchReason = watch("reason");

// // // // // //     const onSubmit = async (data: FormData) => {
// // // // // //         setIsLoading(true);
// // // // // //         setError("");

// // // // // //         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
// // // // // //         if (isNaN(birthDate.getTime())) {
// // // // // //             setError("Invalid date of birth");
// // // // // //             setIsLoading(false);
// // // // // //             return;
// // // // // //         }

// // // // // //         const minAgeDate = new Date();
// // // // // //         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

// // // // // //         if (birthDate > minAgeDate) {
// // // // // //             setError("Patient must be at least 2 years old.");
// // // // // //             setIsLoading(false);
// // // // // //             return;
// // // // // //         }

// // // // // //         if (!isValidAppointmentTime(data.suggestedAppointment)) {
// // // // // //             setError(
// // // // // //                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
// // // // // //             );
// // // // // //             setIsLoading(false);
// // // // // //             return;
// // // // // //         }

// // // // // //         const formattedPhone = formatPhoneNumber(data.phone);

// // // // // //         const formData = new FormData();
// // // // // //         Object.entries(data).forEach(([key, value]) => {
// // // // // //             if (key === "suggestedAppointment" && value) {
// // // // // //                 formData.append(key, (value as Date).toISOString());
// // // // // //             } else if (key === "phone") {
// // // // // //                 formData.append(key, formattedPhone);
// // // // // //             } else if (
// // // // // //                 key !== "year" &&
// // // // // //                 key !== "month" &&
// // // // // //                 key !== "day" &&
// // // // // //                 key !== "customReason"
// // // // // //             ) {
// // // // // //                 formData.append(key, value as string);
// // // // // //             }
// // // // // //         });

// // // // // //         formData.append("birthday", birthDate.toISOString());
// // // // // //         if (data.reason === "Other" && data.customReason) {
// // // // // //             formData.append("reason", data.customReason);
// // // // // //         }

// // // // // //         if (fileInputRef.current?.files?.[0]) {
// // // // // //             formData.append("pdf", fileInputRef.current.files[0]);
// // // // // //         }

// // // // // //         try {
// // // // // //             const response = await fetch("/api/llpmg-register-patient/route", {
// // // // // //                 method: "POST",
// // // // // //                 body: formData,
// // // // // //             });

// // // // // //             if (!response.ok) {
// // // // // //                 throw new Error("Failed to register patient");
// // // // // //             }

// // // // // //             alert(
// // // // // //                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
// // // // // //             );
// // // // // //             Object.keys(data).forEach((key) =>
// // // // // //                 setValue(key as keyof FormData, "")
// // // // // //             );
// // // // // //             if (fileInputRef.current) {
// // // // // //                 fileInputRef.current.value = "";
// // // // // //             }
// // // // // //         } catch (err) {
// // // // // //             setError(
// // // // // //                 "An error occurred while submitting your information. Please try again."
// // // // // //             );
// // // // // //         } finally {
// // // // // //             setIsLoading(false);
// // // // // //         }
// // // // // //     };

// // // // // //     const isValidAppointmentTime = (date: Date | null): boolean => {
// // // // // //         if (!date) return false;
// // // // // //         const day = date.getDay();
// // // // // //         const hours = date.getHours();
// // // // // //         const isWeekday = day > 0 && day < 6;
// // // // // //         const isBusinessHours = hours >= 9 && hours < 17;
// // // // // //         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
// // // // // //         return isWeekday && isBusinessHours && isFutureDate;
// // // // // //     };

// // // // // //     const formatPhoneNumber = (phone: string): string => {
// // // // // //         const digitsOnly = phone.replace(/\D/g, "");
// // // // // //         return `+1${digitsOnly.slice(-10)}`;
// // // // // //     };

// // // // // //     const debouncedAddressSearch = debounce(async (input: string) => {
// // // // // //         if (input.length > 2) {
// // // // // //             try {
// // // // // //                 const response = await fetch(
// // // // // //                     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
// // // // // //                         input
// // // // // //                     )}&countrycodes=us`
// // // // // //                 );
// // // // // //                 const data = await response.json();
// // // // // //                 const suggestions = data.map((item: any) => item.display_name);
// // // // // //                 setAddressSuggestions(suggestions.slice(0, 5));
// // // // // //             } catch (error) {
// // // // // //                 console.error("Error fetching address suggestions:", error);
// // // // // //             }
// // // // // //         } else {
// // // // // //             setAddressSuggestions([]);
// // // // // //         }
// // // // // //     }, 300);

// // // // // //     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const value = e.target.value;
// // // // // //         setValue("address", value);
// // // // // //         debouncedAddressSearch(value);
// // // // // //     };

// // // // // //     const handleAddressSelect = (selectedAddress: string) => {
// // // // // //         setValue("address", selectedAddress);
// // // // // //         setAddressSuggestions([]);
// // // // // //         // Parse the selected address to fill in city, state, and zip code
// // // // // //         const parts = selectedAddress.split(", ");
// // // // // //         if (parts.length >= 3) {
// // // // // //             setValue("city", parts[parts.length - 3]);
// // // // // //             const stateZip = parts[parts.length - 2].split(" ");
// // // // // //             setValue("state", stateZip[0]);
// // // // // //             setValue("zipCode", stateZip[1]);
// // // // // //         }
// // // // // //     };

// // // // // //     useEffect(() => {
// // // // // //         return () => {
// // // // // //             debouncedAddressSearch.cancel();
// // // // // //         };
// // // // // //     }, []);

// // // // // //     const containerVariants = {
// // // // // //         hidden: { opacity: 0, y: 50 },
// // // // // //         visible: {
// // // // // //             opacity: 1,
// // // // // //             y: 0,
// // // // // //             transition: {
// // // // // //                 type: "spring",
// // // // // //                 stiffness: 100,
// // // // // //                 damping: 15,
// // // // // //                 when: "beforeChildren",
// // // // // //                 staggerChildren: 0.1,
// // // // // //             },
// // // // // //         },
// // // // // //     };

// // // // // //     const itemVariants = {
// // // // // //         hidden: { opacity: 0, y: 20 },
// // // // // //         visible: {
// // // // // //             opacity: 1,
// // // // // //             y: 0,
// // // // // //             transition: { type: "spring", stiffness: 100, damping: 15 },
// // // // // //         },
// // // // // //     };

// // // // // //     return (
// // // // // //         <motion.form
// // // // // //             onSubmit={handleSubmit(onSubmit)}
// // // // // //             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
// // // // // //             variants={containerVariants}
// // // // // //             initial="hidden"
// // // // // //             animate="visible"
// // // // // //         >
// // // // // //             {error && <p className="text-red-500 mb-4">{error}</p>}

// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="firstName"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         First Name
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         id="firstName"
// // // // // //                         {...register("firstName", {
// // // // // //                             required: "First name is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                     />
// // // // // //                     {errors.firstName && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.firstName.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="lastName"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Last Name
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         id="lastName"
// // // // // //                         {...register("lastName", {
// // // // // //                             required: "Last name is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                     />
// // // // // //                     {errors.lastName && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.lastName.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="email"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Email
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         id="email"
// // // // // //                         type="email"
// // // // // //                         {...register("email", {
// // // // // //                             required: "Email is required",
// // // // // //                             pattern: {
// // // // // //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // // // // //                                 message: "Invalid email address",
// // // // // //                             },
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                     />
// // // // // //                     {errors.email && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.email.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="phone"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Phone
// // // // // //                     </label>
// // // // // //                     <div className="flex">
// // // // // //                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
// // // // // //                             +1
// // // // // //                         </span>
// // // // // //                         <input
// // // // // //                             id="phone"
// // // // // //                             type="tel"
// // // // // //                             {...register("phone", {
// // // // // //                                 required: "Phone is required",
// // // // // //                                 pattern: {
// // // // // //                                     value: /^[2-9]\d{9}$/,
// // // // // //                                     message:
// // // // // //                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
// // // // // //                                 },
// // // // // //                             })}
// // // // // //                             placeholder="1234567890"
// // // // // //                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text"
// // // // // //                         />
// // // // // //                     </div>
// // // // // //                     {errors.phone && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.phone.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="year"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Date of Birth
// // // // // //                     </label>
// // // // // //                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // // // // //                         <select
// // // // // //                             id="year"
// // // // // //                             {...register("year", {
// // // // // //                                 required: "Year is required",
// // // // // //                             })}
// // // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                         >
// // // // // //                             <option value="">Year</option>
// // // // // //                             {Array.from(
// // // // // //                                 { length: new Date().getFullYear() - 1900 + 1 },
// // // // // //                                 (_, i) => new Date().getFullYear() - i
// // // // // //                             ).map((year) => (
// // // // // //                                 <option key={year} value={year}>
// // // // // //                                     {year}
// // // // // //                                 </option>
// // // // // //                             ))}
// // // // // //                         </select>
// // // // // //                         <select
// // // // // //                             id="month"
// // // // // //                             {...register("month", {
// // // // // //                                 required: "Month is required",
// // // // // //                             })}
// // // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                         >
// // // // // //                             <option value="">Month</option>
// // // // // //                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
// // // // // //                                 (month) => (
// // // // // //                                     <option key={month} value={month}>
// // // // // //                                         {new Date(0, month - 1).toLocaleString(
// // // // // //                                             "en-US",
// // // // // //                                             { month: "long" }
// // // // // //                                         )}
// // // // // //                                     </option>
// // // // // //                                 )
// // // // // //                             )}
// // // // // //                         </select>
// // // // // //                         <select
// // // // // //                             id="day"
// // // // // //                             {...register("day", {
// // // // // //                                 required: "Day is required",
// // // // // //                             })}
// // // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                         >
// // // // // //                             <option value="">Day</option>
// // // // // //                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
// // // // // //                                 (day) => (
// // // // // //                                     <option key={day} value={day}>
// // // // // //                                         {day}
// // // // // //                                     </option>
// // // // // //                                 )
// // // // // //                             )}
// // // // // //                         </select>
// // // // // //                     </div>
// // // // // //                     {(errors.year || errors.month || errors.day) && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             Invalid date of birth
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="insurance"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Insurance Provider
// // // // // //                     </label>
// // // // // //                     <select
// // // // // //                         id="insurance"
// // // // // //                         {...register("insurance", {
// // // // // //                             required: "Insurance provider is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                     >
// // // // // //                         <option value="" disabled>
// // // // // //                             Select your insurance provider
// // // // // //                         </option>
// // // // // //                         <option value="IEHP">IEHP</option>
// // // // // //                         <option value="Blue Cross Blue Shield">
// // // // // //                             Blue Cross Blue Shield
// // // // // //                         </option>
// // // // // //                         <option value="UnitedHealthcare">
// // // // // //                             UnitedHealthcare
// // // // // //                         </option>
// // // // // //                         <option value="Health Net">Health Net</option>
// // // // // //                         <option value="Central Health Plan of California">
// // // // // //                             Central Health Plan of California
// // // // // //                         </option>
// // // // // //                         <option value="Aetna">Aetna</option>
// // // // // //                         <option value="Cigna">Cigna</option>
// // // // // //                         <option value="Medicare">Medicare</option>
// // // // // //                     </select>
// // // // // //                     {errors.insurance && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.insurance.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="address"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Address
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         id="address"
// // // // // //                         {...register("address", {
// // // // // //                             required: "Address is required",
// // // // // //                         })}
// // // // // //                         onChange={handleAddressChange}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                     />
// // // // // //                     {addressSuggestions.length > 0 && (
// // // // // //                         <ul className="mt-2 bg-white dark:bg-gray-800 border rounded">
// // // // // //                             {addressSuggestions.map((suggestion, index) => (
// // // // // //                                 <li
// // // // // //                                     key={index}
// // // // // //                                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
// // // // // //                                     onClick={() =>
// // // // // //                                         handleAddressSelect(suggestion)
// // // // // //                                     }
// // // // // //                                 >
// // // // // //                                     {suggestion}
// // // // // //                                 </li>
// // // // // //                             ))}
// // // // // //                         </ul>
// // // // // //                     )}
// // // // // //                     {errors.address && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.address.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="city"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         City
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         id="city"
// // // // // //                         {...register("city", { required: "City is required" })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                     />
// // // // // //                     {errors.city && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.city.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="state"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         State
// // // // // //                     </label>
// // // // // //                     <select
// // // // // //                         id="state"
// // // // // //                         {...register("state", {
// // // // // //                             required: "State is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                     >
// // // // // //                         <option value="" disabled>
// // // // // //                             Select your state
// // // // // //                         </option>
// // // // // //                         {states.map((state) => (
// // // // // //                             <option key={state} value={state}>
// // // // // //                                 {state}
// // // // // //                             </option>
// // // // // //                         ))}
// // // // // //                     </select>
// // // // // //                     {errors.state && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.state.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="zipCode"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Zip Code
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         id="zipCode"
// // // // // //                         {...register("zipCode", {
// // // // // //                             required: "Zip code is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                     />
// // // // // //                     {errors.zipCode && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.zipCode.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // // //                     <label
// // // // // //                         htmlFor="pharmacy"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Preferred Pharmacy
// // // // // //                     </label>
// // // // // //                     <select
// // // // // //                         id="pharmacy"
// // // // // //                         {...register("pharmacy", {
// // // // // //                             required: "Preferred pharmacy is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                     >
// // // // // //                         <option value="" disabled>
// // // // // //                             Select your preferred pharmacy
// // // // // //                         </option>
// // // // // //                         {pharmacies.map((pharmacy) => (
// // // // // //                             <option key={pharmacy} value={pharmacy}>
// // // // // //                                 {pharmacy}
// // // // // //                             </option>
// // // // // //                         ))}
// // // // // //                     </select>
// // // // // //                     {errors.pharmacy && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.pharmacy.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div
// // // // // //                     className="mb-4 lg:col-span-3"
// // // // // //                     variants={itemVariants}
// // // // // //                 >
// // // // // //                     <label
// // // // // //                         htmlFor="reason"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Reason for Visit
// // // // // //                     </label>
// // // // // //                     <select
// // // // // //                         id="reason"
// // // // // //                         {...register("reason", {
// // // // // //                             required: "Reason for visit is required",
// // // // // //                         })}
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                     >
// // // // // //                         <option value="" disabled>
// // // // // //                             Select your reason for visit
// // // // // //                         </option>
// // // // // //                         {reasons.map((reason) => (
// // // // // //                             <option key={reason} value={reason}>
// // // // // //                                 {reason}
// // // // // //                             </option>
// // // // // //                         ))}
// // // // // //                     </select>
// // // // // //                     {watchReason === "Other" && (
// // // // // //                         <textarea
// // // // // //                             id="customReason"
// // // // // //                             {...register("customReason", {
// // // // // //                                 required: "Please specify your reason",
// // // // // //                             })}
// // // // // //                             placeholder="Please specify your reason"
// // // // // //                             className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                         />
// // // // // //                     )}
// // // // // //                     {errors.reason && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.reason.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                     {watchReason === "Other" && errors.customReason && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.customReason.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div
// // // // // //                     className="mb-4 lg:col-span-3"
// // // // // //                     variants={itemVariants}
// // // // // //                 >
// // // // // //                     <label
// // // // // //                         htmlFor="suggestedAppointment"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Suggested Appointment Time
// // // // // //                     </label>
// // // // // //                     <DatePicker
// // // // // //                         selected={watchSuggestedAppointment}
// // // // // //                         onChange={(date: Date | null) =>
// // // // // //                             setValue("suggestedAppointment", date)
// // // // // //                         }
// // // // // //                         showTimeSelect
// // // // // //                         timeIntervals={15}
// // // // // //                         dateFormat="MMMM d, yyyy h:mm aa"
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // // //                         minDate={new Date()}
// // // // // //                         placeholderText="Select a date and time"
// // // // // //                         popperClassName="react-datepicker-popper"
// // // // // //                         calendarClassName="react-datepicker-calendar"
// // // // // //                     />
// // // // // //                     {errors.suggestedAppointment && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.suggestedAppointment.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.div
// // // // // //                     className="mb-4 lg:col-span-3"
// // // // // //                     variants={itemVariants}
// // // // // //                 >
// // // // // //                     <label
// // // // // //                         htmlFor="pdf"
// // // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // // //                     >
// // // // // //                         Upload PDF Document (optional)
// // // // // //                     </label>
// // // // // //                     <input
// // // // // //                         type="file"
// // // // // //                         id="pdf"
// // // // // //                         ref={fileInputRef}
// // // // // //                         accept=".pdf"
// // // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // // //                     />
// // // // // //                 </motion.div>

// // // // // //                 <motion.div
// // // // // //                     className="mb-4 lg:col-span-3"
// // // // // //                     variants={itemVariants}
// // // // // //                 >
// // // // // //                     <label className="flex items-center text-gray-700 dark:text-gray-300">
// // // // // //                         <input
// // // // // //                             type="checkbox"
// // // // // //                             {...register("consentGiven", {
// // // // // //                                 required: "You must give consent to proceed",
// // // // // //                             })}
// // // // // //                             className="mr-2 cursor-pointer"
// // // // // //                         />
// // // // // //                         I consent to the processing of my personal data
// // // // // //                     </label>
// // // // // //                     {errors.consentGiven && (
// // // // // //                         <span className="text-red-500">
// // // // // //                             {errors.consentGiven.message}
// // // // // //                         </span>
// // // // // //                     )}
// // // // // //                 </motion.div>

// // // // // //                 <motion.button
// // // // // //                     type="submit"
// // // // // //                     disabled={isLoading}
// // // // // //                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
// // // // // //                         isLoading ? "opacity-50 cursor-not-allowed" : ""
// // // // // //                     } lg:col-span-3`}
// // // // // //                     variants={itemVariants}
// // // // // //                     whileHover={{ scale: 1.05 }}
// // // // // //                     whileTap={{ scale: 0.95 }}
// // // // // //                 >
// // // // // //                     {isLoading ? "Submitting..." : "Submit"}
// // // // // //                 </motion.button>
// // // // // //             </div>
// // // // // //         </motion.form>
// // // // // //     );
// // // // // // };

// // // // // // export default ContactForm;

// // // // // "use client";

// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import { useForm } from "react-hook-form";
// // // // // import DatePicker from "react-datepicker";
// // // // // import "react-datepicker/dist/react-datepicker.css";
// // // // // import { motion } from "framer-motion";
// // // // // import debounce from "lodash/debounce";

// // // // // interface FormData {
// // // // //     firstName: string;
// // // // //     lastName: string;
// // // // //     email: string;
// // // // //     phone: string;
// // // // //     year: string;
// // // // //     month: string;
// // // // //     day: string;
// // // // //     insurance: string;
// // // // //     address: string;
// // // // //     city: string;
// // // // //     state: string;
// // // // //     zipCode: string;
// // // // //     pharmacy: string;
// // // // //     reason: string;
// // // // //     customReason?: string;
// // // // //     suggestedAppointment: Date | null;
// // // // //     consentGiven: boolean;
// // // // // }

// // // // // const states = [
// // // // //     "AL",
// // // // //     "AK",
// // // // //     "AZ",
// // // // //     "AR",
// // // // //     "CA",
// // // // //     "CO",
// // // // //     "CT",
// // // // //     "DE",
// // // // //     "FL",
// // // // //     "GA",
// // // // //     "HI",
// // // // //     "ID",
// // // // //     "IL",
// // // // //     "IN",
// // // // //     "IA",
// // // // //     "KS",
// // // // //     "KY",
// // // // //     "LA",
// // // // //     "ME",
// // // // //     "MD",
// // // // //     "MA",
// // // // //     "MI",
// // // // //     "MN",
// // // // //     "MS",
// // // // //     "MO",
// // // // //     "MT",
// // // // //     "NE",
// // // // //     "NV",
// // // // //     "NH",
// // // // //     "NJ",
// // // // //     "NM",
// // // // //     "NY",
// // // // //     "NC",
// // // // //     "ND",
// // // // //     "OH",
// // // // //     "OK",
// // // // //     "OR",
// // // // //     "PA",
// // // // //     "RI",
// // // // //     "SC",
// // // // //     "SD",
// // // // //     "TN",
// // // // //     "TX",
// // // // //     "UT",
// // // // //     "VT",
// // // // //     "VA",
// // // // //     "WA",
// // // // //     "WV",
// // // // //     "WI",
// // // // //     "WY",
// // // // // ];

// // // // // const pharmacies = [
// // // // //     "CVS",
// // // // //     "Walgreens",
// // // // //     "Walmart",
// // // // //     "Rite Aid",
// // // // //     "Safeway",
// // // // //     "Kroger",
// // // // //     "Target Pharmacy",
// // // // //     "Costco Pharmacy",
// // // // //     "Albertsons",
// // // // //     "Vons",
// // // // // ];

// // // // // const reasons = [
// // // // //     "New Patient Registration",
// // // // //     "Follow-up Appointment",
// // // // //     "Prescription Refill",
// // // // //     "Mental Health Consultation",
// // // // //     "Therapy Session",
// // // // //     "Other",
// // // // // ];

// // // // // const ContactForm: React.FC = () => {
// // // // //     const {
// // // // //         register,
// // // // //         handleSubmit,
// // // // //         formState: { errors },
// // // // //         setValue,
// // // // //         watch,
// // // // //     } = useForm<FormData>();
// // // // //     const [isLoading, setIsLoading] = useState(false);
// // // // //     const [error, setError] = useState("");
// // // // //     const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
// // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // //     const watchSuggestedAppointment = watch("suggestedAppointment");
// // // // //     const watchReason = watch("reason");

// // // // //     const onSubmit = async (data: FormData) => {
// // // // //         setIsLoading(true);
// // // // //         setError("");

// // // // //         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
// // // // //         if (isNaN(birthDate.getTime())) {
// // // // //             setError("Invalid date of birth");
// // // // //             setIsLoading(false);
// // // // //             return;
// // // // //         }

// // // // //         const minAgeDate = new Date();
// // // // //         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

// // // // //         if (birthDate > minAgeDate) {
// // // // //             setError("Patient must be at least 2 years old.");
// // // // //             setIsLoading(false);
// // // // //             return;
// // // // //         }

// // // // //         if (!isValidAppointmentTime(data.suggestedAppointment)) {
// // // // //             setError(
// // // // //                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
// // // // //             );
// // // // //             setIsLoading(false);
// // // // //             return;
// // // // //         }

// // // // //         const formattedPhone = formatPhoneNumber(data.phone);

// // // // //         const formData = new FormData();
// // // // //         Object.entries(data).forEach(([key, value]) => {
// // // // //             if (key === "suggestedAppointment" && value) {
// // // // //                 formData.append(key, (value as Date).toISOString());
// // // // //             } else if (key === "phone") {
// // // // //                 formData.append(key, formattedPhone);
// // // // //             } else if (
// // // // //                 key !== "year" &&
// // // // //                 key !== "month" &&
// // // // //                 key !== "day" &&
// // // // //                 key !== "customReason"
// // // // //             ) {
// // // // //                 formData.append(key, value as string);
// // // // //             }
// // // // //         });

// // // // //         formData.append("birthday", birthDate.toISOString());
// // // // //         if (data.reason === "Other" && data.customReason) {
// // // // //             formData.append("reason", data.customReason);
// // // // //         }

// // // // //         if (fileInputRef.current?.files?.[0]) {
// // // // //             formData.append("pdf", fileInputRef.current.files[0]);
// // // // //         }

// // // // //         try {
// // // // //             const response = await fetch("/api/llpmg-register-patient/route", {
// // // // //                 method: "POST",
// // // // //                 body: formData,
// // // // //             });

// // // // //             if (!response.ok) {
// // // // //                 throw new Error("Failed to register patient");
// // // // //             }

// // // // //             alert(
// // // // //                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
// // // // //             );
// // // // //             Object.keys(data).forEach((key) =>
// // // // //                 setValue(key as keyof FormData, "")
// // // // //             );
// // // // //             if (fileInputRef.current) {
// // // // //                 fileInputRef.current.value = "";
// // // // //             }
// // // // //         } catch (err) {
// // // // //             setError(
// // // // //                 "An error occurred while submitting your information. Please try again."
// // // // //             );
// // // // //         } finally {
// // // // //             setIsLoading(false);
// // // // //         }
// // // // //     };

// // // // //     const isValidAppointmentTime = (date: Date | null): boolean => {
// // // // //         if (!date) return false;
// // // // //         const day = date.getDay();
// // // // //         const hours = date.getHours();
// // // // //         const isWeekday = day > 0 && day < 6;
// // // // //         const isBusinessHours = hours >= 9 && hours < 17;
// // // // //         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
// // // // //         return isWeekday && isBusinessHours && isFutureDate;
// // // // //     };

// // // // //     const formatPhoneNumber = (phone: string): string => {
// // // // //         const digitsOnly = phone.replace(/\D/g, "");
// // // // //         return `+1${digitsOnly.slice(-10)}`;
// // // // //     };

// // // // //     const debouncedAddressSearch = debounce(async (input: string) => {
// // // // //         if (input.length > 2) {
// // // // //             try {
// // // // //                 const response = await fetch(
// // // // //                     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
// // // // //                         input
// // // // //                     )}&countrycodes=us`
// // // // //                 );
// // // // //                 const data = await response.json();
// // // // //                 const suggestions = data.map((item: any) => item.display_name);
// // // // //                 setAddressSuggestions(suggestions.slice(0, 5));
// // // // //             } catch (error) {
// // // // //                 console.error("Error fetching address suggestions:", error);
// // // // //             }
// // // // //         } else {
// // // // //             setAddressSuggestions([]);
// // // // //         }
// // // // //     }, 300);

// // // // //     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const value = e.target.value;
// // // // //         setValue("address", value);
// // // // //         debouncedAddressSearch(value);
// // // // //     };

// // // // //     const handleAddressSelect = (selectedAddress: string) => {
// // // // //         setValue("address", selectedAddress);
// // // // //         setAddressSuggestions([]);
// // // // //         // Parse the selected address to fill in city, state, and zip code
// // // // //         const parts = selectedAddress.split(", ");
// // // // //         if (parts.length >= 3) {
// // // // //             setValue("city", parts[parts.length - 3]);
// // // // //             const stateZip = parts[parts.length - 2].split(" ");
// // // // //             setValue("state", stateZip[0]);
// // // // //             setValue("zipCode", stateZip[1]);
// // // // //         }
// // // // //     };

// // // // //     useEffect(() => {
// // // // //         return () => {
// // // // //             debouncedAddressSearch.cancel();
// // // // //         };
// // // // //     }, []);

// // // // //     const containerVariants = {
// // // // //         hidden: { opacity: 0, y: 50 },
// // // // //         visible: {
// // // // //             opacity: 1,
// // // // //             y: 0,
// // // // //             transition: {
// // // // //                 type: "spring",
// // // // //                 stiffness: 100,
// // // // //                 damping: 15,
// // // // //                 when: "beforeChildren",
// // // // //                 staggerChildren: 0.1,
// // // // //             },
// // // // //         },
// // // // //     };

// // // // //     const itemVariants = {
// // // // //         hidden: { opacity: 0, y: 20 },
// // // // //         visible: {
// // // // //             opacity: 1,
// // // // //             y: 0,
// // // // //             transition: { type: "spring", stiffness: 100, damping: 15 },
// // // // //         },
// // // // //     };

// // // // //     return (
// // // // //         <motion.form
// // // // //             onSubmit={handleSubmit(onSubmit)}
// // // // //             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
// // // // //             variants={containerVariants}
// // // // //             initial="hidden"
// // // // //             animate="visible"
// // // // //         >
// // // // //             {error && <p className="text-red-500 mb-4">{error}</p>}

// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="firstName"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         First Name
// // // // //                     </label>
// // // // //                     <input
// // // // //                         id="firstName"
// // // // //                         {...register("firstName", {
// // // // //                             required: "First name is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                     />
// // // // //                     {errors.firstName && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.firstName.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="lastName"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Last Name
// // // // //                     </label>
// // // // //                     <input
// // // // //                         id="lastName"
// // // // //                         {...register("lastName", {
// // // // //                             required: "Last name is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                     />
// // // // //                     {errors.lastName && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.lastName.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="email"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Email
// // // // //                     </label>
// // // // //                     <input
// // // // //                         id="email"
// // // // //                         type="email"
// // // // //                         {...register("email", {
// // // // //                             required: "Email is required",
// // // // //                             pattern: {
// // // // //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // // // //                                 message: "Invalid email address",
// // // // //                             },
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                     />
// // // // //                     {errors.email && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.email.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="phone"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Phone
// // // // //                     </label>
// // // // //                     <div className="flex">
// // // // //                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
// // // // //                             +1
// // // // //                         </span>
// // // // //                         <input
// // // // //                             id="phone"
// // // // //                             type="tel"
// // // // //                             {...register("phone", {
// // // // //                                 required: "Phone is required",
// // // // //                                 pattern: {
// // // // //                                     value: /^[2-9]\d{9}$/,
// // // // //                                     message:
// // // // //                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
// // // // //                                 },
// // // // //                             })}
// // // // //                             placeholder="1234567890"
// // // // //                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text"
// // // // //                         />
// // // // //                     </div>
// // // // //                     {errors.phone && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.phone.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="year"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Date of Birth
// // // // //                     </label>
// // // // //                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // // // //                         <select
// // // // //                             id="year"
// // // // //                             {...register("year", {
// // // // //                                 required: "Year is required",
// // // // //                             })}
// // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                         >
// // // // //                             <option value="">Year</option>
// // // // //                             {Array.from(
// // // // //                                 { length: new Date().getFullYear() - 1900 + 1 },
// // // // //                                 (_, i) => new Date().getFullYear() - i
// // // // //                             ).map((year) => (
// // // // //                                 <option key={year} value={year}>
// // // // //                                     {year}
// // // // //                                 </option>
// // // // //                             ))}
// // // // //                         </select>
// // // // //                         <select
// // // // //                             id="month"
// // // // //                             {...register("month", {
// // // // //                                 required: "Month is required",
// // // // //                             })}
// // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                         >
// // // // //                             <option value="">Month</option>
// // // // //                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
// // // // //                                 (month) => (
// // // // //                                     <option key={month} value={month}>
// // // // //                                         {new Date(0, month - 1).toLocaleString(
// // // // //                                             "en-US",
// // // // //                                             { month: "long" }
// // // // //                                         )}
// // // // //                                     </option>
// // // // //                                 )
// // // // //                             )}
// // // // //                         </select>
// // // // //                         <select
// // // // //                             id="day"
// // // // //                             {...register("day", {
// // // // //                                 required: "Day is required",
// // // // //                             })}
// // // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                         >
// // // // //                             <option value="">Day</option>
// // // // //                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
// // // // //                                 (day) => (
// // // // //                                     <option key={day} value={day}>
// // // // //                                         {day}
// // // // //                                     </option>
// // // // //                                 )
// // // // //                             )}
// // // // //                         </select>
// // // // //                     </div>
// // // // //                     {(errors.year || errors.month || errors.day) && (
// // // // //                         <span className="text-red-500">
// // // // //                             Invalid date of birth
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="insurance"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Insurance Provider
// // // // //                     </label>
// // // // //                     <select
// // // // //                         id="insurance"
// // // // //                         {...register("insurance", {
// // // // //                             required: "Insurance provider is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                     >
// // // // //                         <option value="" disabled>
// // // // //                             Select your insurance provider
// // // // //                         </option>
// // // // //                         <option value="IEHP">IEHP</option>
// // // // //                         <option value="Blue Cross Blue Shield">
// // // // //                             Blue Cross Blue Shield
// // // // //                         </option>
// // // // //                         <option value="UnitedHealthcare">
// // // // //                             UnitedHealthcare
// // // // //                         </option>
// // // // //                         <option value="Health Net">Health Net</option>
// // // // //                         <option value="Central Health Plan of California">
// // // // //                             Central Health Plan of California
// // // // //                         </option>
// // // // //                         <option value="Aetna">Aetna</option>
// // // // //                         <option value="Cigna">Cigna</option>
// // // // //                         <option value="Medicare">Medicare</option>
// // // // //                     </select>
// // // // //                     {errors.insurance && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.insurance.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="address"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Address
// // // // //                     </label>
// // // // //                     <input
// // // // //                         id="address"
// // // // //                         {...register("address", {
// // // // //                             required: "Address is required",
// // // // //                         })}
// // // // //                         onChange={handleAddressChange}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                     />
// // // // //                     {addressSuggestions.length > 0 && (
// // // // //                         <ul className="mt-2 bg-white dark:bg-gray-800 border rounded">
// // // // //                             {addressSuggestions.map((suggestion, index) => (
// // // // //                                 <li
// // // // //                                     key={index}
// // // // //                                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
// // // // //                                     onClick={() =>
// // // // //                                         handleAddressSelect(suggestion)
// // // // //                                     }
// // // // //                                 >
// // // // //                                     {suggestion}
// // // // //                                 </li>
// // // // //                             ))}
// // // // //                         </ul>
// // // // //                     )}
// // // // //                     {errors.address && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.address.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="city"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         City
// // // // //                     </label>
// // // // //                     <input
// // // // //                         id="city"
// // // // //                         {...register("city", { required: "City is required" })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                     />
// // // // //                     {errors.city && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.city.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="state"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         State
// // // // //                     </label>
// // // // //                     <select
// // // // //                         id="state"
// // // // //                         {...register("state", {
// // // // //                             required: "State is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                     >
// // // // //                         <option value="" disabled>
// // // // //                             Select your state
// // // // //                         </option>
// // // // //                         {states.map((state) => (
// // // // //                             <option key={state} value={state}>
// // // // //                                 {state}
// // // // //                             </option>
// // // // //                         ))}
// // // // //                     </select>
// // // // //                     {errors.state && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.state.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="zipCode"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Zip Code
// // // // //                     </label>
// // // // //                     <input
// // // // //                         id="zipCode"
// // // // //                         {...register("zipCode", {
// // // // //                             required: "Zip code is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                     />
// // // // //                     {errors.zipCode && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.zipCode.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // // //                     <label
// // // // //                         htmlFor="pharmacy"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Preferred Pharmacy
// // // // //                     </label>
// // // // //                     <select
// // // // //                         id="pharmacy"
// // // // //                         {...register("pharmacy", {
// // // // //                             required: "Preferred pharmacy is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                     >
// // // // //                         <option value="" disabled>
// // // // //                             Select your preferred pharmacy
// // // // //                         </option>
// // // // //                         {pharmacies.map((pharmacy) => (
// // // // //                             <option key={pharmacy} value={pharmacy}>
// // // // //                                 {pharmacy}
// // // // //                             </option>
// // // // //                         ))}
// // // // //                     </select>
// // // // //                     {errors.pharmacy && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.pharmacy.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div
// // // // //                     className="mb-4 lg:col-span-3"
// // // // //                     variants={itemVariants}
// // // // //                 >
// // // // //                     <label
// // // // //                         htmlFor="reason"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Reason for Visit
// // // // //                     </label>
// // // // //                     <select
// // // // //                         id="reason"
// // // // //                         {...register("reason", {
// // // // //                             required: "Reason for visit is required",
// // // // //                         })}
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                     >
// // // // //                         <option value="" disabled>
// // // // //                             Select your reason for visit
// // // // //                         </option>
// // // // //                         {reasons.map((reason) => (
// // // // //                             <option key={reason} value={reason}>
// // // // //                                 {reason}
// // // // //                             </option>
// // // // //                         ))}
// // // // //                     </select>
// // // // //                     {watchReason === "Other" && (
// // // // //                         <textarea
// // // // //                             id="customReason"
// // // // //                             {...register("customReason", {
// // // // //                                 required: "Please specify your reason",
// // // // //                             })}
// // // // //                             placeholder="Please specify your reason"
// // // // //                             className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                         />
// // // // //                     )}
// // // // //                     {errors.reason && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.reason.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                     {watchReason === "Other" && errors.customReason && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.customReason.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div
// // // // //                     className="mb-4 lg:col-span-3"
// // // // //                     variants={itemVariants}
// // // // //                 >
// // // // //                     <label
// // // // //                         htmlFor="suggestedAppointment"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Suggested Appointment Time
// // // // //                     </label>
// // // // //                     <DatePicker
// // // // //                         selected={watchSuggestedAppointment}
// // // // //                         onChange={(date: Date | null) =>
// // // // //                             setValue("suggestedAppointment", date)
// // // // //                         }
// // // // //                         showTimeSelect
// // // // //                         timeIntervals={15}
// // // // //                         dateFormat="MMMM d, yyyy h:mm aa"
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // // //                         minDate={new Date()}
// // // // //                         placeholderText="Select a date and time"
// // // // //                         popperClassName="react-datepicker-popper"
// // // // //                         calendarClassName="react-datepicker-calendar"
// // // // //                     />
// // // // //                     {errors.suggestedAppointment && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.suggestedAppointment.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.div
// // // // //                     className="mb-4 lg:col-span-3"
// // // // //                     variants={itemVariants}
// // // // //                 >
// // // // //                     <label
// // // // //                         htmlFor="pdf"
// // // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // // //                     >
// // // // //                         Upload PDF Document (optional)
// // // // //                     </label>
// // // // //                     <input
// // // // //                         type="file"
// // // // //                         id="pdf"
// // // // //                         ref={fileInputRef}
// // // // //                         accept=".pdf"
// // // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // // //                     />
// // // // //                 </motion.div>

// // // // //                 <motion.div
// // // // //                     className="mb-4 lg:col-span-3"
// // // // //                     variants={itemVariants}
// // // // //                 >
// // // // //                     <label className="flex items-center text-gray-700 dark:text-gray-300">
// // // // //                         <input
// // // // //                             type="checkbox"
// // // // //                             {...register("consentGiven", {
// // // // //                                 required: "You must give consent to proceed",
// // // // //                             })}
// // // // //                             className="mr-2 cursor-pointer"
// // // // //                         />
// // // // //                         I consent to the processing of my personal data
// // // // //                     </label>
// // // // //                     {errors.consentGiven && (
// // // // //                         <span className="text-red-500">
// // // // //                             {errors.consentGiven.message}
// // // // //                         </span>
// // // // //                     )}
// // // // //                 </motion.div>

// // // // //                 <motion.button
// // // // //                     type="submit"
// // // // //                     disabled={isLoading}
// // // // //                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
// // // // //                         isLoading ? "opacity-50 cursor-not-allowed" : ""
// // // // //                     } lg:col-span-3`}
// // // // //                     variants={itemVariants}
// // // // //                     whileHover={{ scale: 1.05 }}
// // // // //                     whileTap={{ scale: 0.95 }}
// // // // //                 >
// // // // //                     {isLoading ? "Submitting..." : "Submit"}
// // // // //                 </motion.button>
// // // // //             </div>
// // // // //         </motion.form>
// // // // //     );
// // // // // };

// // // // // export default ContactForm;

// // // // "use client";

// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import { useForm } from "react-hook-form";
// // // // import DatePicker from "react-datepicker";
// // // // import "react-datepicker/dist/react-datepicker.css";
// // // // import { motion } from "framer-motion";
// // // // import debounce from "lodash/debounce";

// // // // interface FormData {
// // // //     firstName: string;
// // // //     lastName: string;
// // // //     email: string;
// // // //     phone: string;
// // // //     year: string;
// // // //     month: string;
// // // //     day: string;
// // // //     insurance: string;
// // // //     address: string;
// // // //     city: string;
// // // //     state: string;
// // // //     zipCode: string;
// // // //     pharmacy: string;
// // // //     reason: string;
// // // //     customReason?: string;
// // // //     suggestedAppointment: Date | null;
// // // //     consentGiven: boolean;
// // // // }

// // // // const states = [
// // // //     "AL",
// // // //     "AK",
// // // //     "AZ",
// // // //     "AR",
// // // //     "CA",
// // // //     "CO",
// // // //     "CT",
// // // //     "DE",
// // // //     "FL",
// // // //     "GA",
// // // //     "HI",
// // // //     "ID",
// // // //     "IL",
// // // //     "IN",
// // // //     "IA",
// // // //     "KS",
// // // //     "KY",
// // // //     "LA",
// // // //     "ME",
// // // //     "MD",
// // // //     "MA",
// // // //     "MI",
// // // //     "MN",
// // // //     "MS",
// // // //     "MO",
// // // //     "MT",
// // // //     "NE",
// // // //     "NV",
// // // //     "NH",
// // // //     "NJ",
// // // //     "NM",
// // // //     "NY",
// // // //     "NC",
// // // //     "ND",
// // // //     "OH",
// // // //     "OK",
// // // //     "OR",
// // // //     "PA",
// // // //     "RI",
// // // //     "SC",
// // // //     "SD",
// // // //     "TN",
// // // //     "TX",
// // // //     "UT",
// // // //     "VT",
// // // //     "VA",
// // // //     "WA",
// // // //     "WV",
// // // //     "WI",
// // // //     "WY",
// // // // ];

// // // // const pharmacies = [
// // // //     "CVS",
// // // //     "Walgreens",
// // // //     "Walmart",
// // // //     "Rite Aid",
// // // //     "Safeway",
// // // //     "Kroger",
// // // //     "Target Pharmacy",
// // // //     "Costco Pharmacy",
// // // //     "Albertsons",
// // // //     "Vons",
// // // // ];

// // // // const reasons = [
// // // //     "New Patient Registration",
// // // //     "Follow-up Appointment",
// // // //     "Prescription Refill",
// // // //     "Mental Health Consultation",
// // // //     "Therapy Session",
// // // //     "Other",
// // // // ];

// // // // const ContactForm: React.FC = () => {
// // // //     const {
// // // //         register,
// // // //         handleSubmit,
// // // //         formState: { errors },
// // // //         setValue,
// // // //         watch,
// // // //     } = useForm<FormData>();
// // // //     const [isLoading, setIsLoading] = useState(false);
// // // //     const [error, setError] = useState("");
// // // //     const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
// // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // //     const watchSuggestedAppointment = watch("suggestedAppointment");
// // // //     const watchReason = watch("reason");

// // // //     const onSubmit = async (data: FormData) => {
// // // //         setIsLoading(true);
// // // //         setError("");

// // // //         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
// // // //         if (isNaN(birthDate.getTime())) {
// // // //             setError("Invalid date of birth");
// // // //             setIsLoading(false);
// // // //             return;
// // // //         }

// // // //         const minAgeDate = new Date();
// // // //         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

// // // //         if (birthDate > minAgeDate) {
// // // //             setError("Patient must be at least 2 years old.");
// // // //             setIsLoading(false);
// // // //             return;
// // // //         }

// // // //         if (!isValidAppointmentTime(data.suggestedAppointment)) {
// // // //             setError(
// // // //                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
// // // //             );
// // // //             setIsLoading(false);
// // // //             return;
// // // //         }

// // // //         const formattedPhone = formatPhoneNumber(data.phone);

// // // //         const formData = new FormData();
// // // //         Object.entries(data).forEach(([key, value]) => {
// // // //             if (key === "suggestedAppointment" && value) {
// // // //                 formData.append(key, (value as Date).toISOString());
// // // //             } else if (key === "phone") {
// // // //                 formData.append(key, formattedPhone);
// // // //             } else if (
// // // //                 key !== "year" &&
// // // //                 key !== "month" &&
// // // //                 key !== "day" &&
// // // //                 key !== "customReason"
// // // //             ) {
// // // //                 formData.append(key, value as string);
// // // //             }
// // // //         });

// // // //         const formattedBirthday = `${data.month}-${data.day}-${data.year}`;
// // // //         formData.append("birthday", formattedBirthday);
// // // //         if (data.reason === "Other" && data.customReason) {
// // // //             formData.append("reason", data.customReason);
// // // //         }

// // // //         if (fileInputRef.current?.files?.[0]) {
// // // //             formData.append("pdf", fileInputRef.current.files[0]);
// // // //         }

// // // //         try {
// // // //             console.log("formData", formData);
// // // //             const response = await fetch("/api/llpmg-register-patient/route", {
// // // //                 method: "POST",
// // // //                 body: formData,
// // // //             });

// // // //             if (!response.ok) {
// // // //                 throw new Error("Failed to register patient");
// // // //             }

// // // //             alert(
// // // //                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
// // // //             );
// // // //             Object.keys(data).forEach((key) =>
// // // //                 setValue(key as keyof FormData, "")
// // // //             );
// // // //             if (fileInputRef.current) {
// // // //                 fileInputRef.current.value = "";
// // // //             }
// // // //         } catch (err) {
// // // //             setError(
// // // //                 "An error occurred while submitting your information. Please try again."
// // // //             );
// // // //         } finally {
// // // //             setIsLoading(false);
// // // //         }
// // // //     };

// // // //     const isValidAppointmentTime = (date: Date | null): boolean => {
// // // //         if (!date) return false;
// // // //         const day = date.getDay();
// // // //         const hours = date.getHours();
// // // //         const isWeekday = day > 0 && day < 6;
// // // //         const isBusinessHours = hours >= 9 && hours < 17;
// // // //         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
// // // //         return isWeekday && isBusinessHours && isFutureDate;
// // // //     };

// // // //     const formatPhoneNumber = (phone: string): string => {
// // // //         const digitsOnly = phone.replace(/\D/g, "");
// // // //         return `+1${digitsOnly.slice(-10)}`;
// // // //     };

// // // //     const debouncedAddressSearch = debounce(async (input: string) => {
// // // //         if (input.length > 2) {
// // // //             try {
// // // //                 const response = await fetch(
// // // //                     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us`
// // // //                 );
// // // //                 const data = await response.json();
// // // //                 const suggestions = data.map((item: any) => item.display_name);
// // // //                 setAddressSuggestions(suggestions.slice(0, 5));
// // // //             } catch (error) {
// // // //                 console.error("Error fetching address suggestions:", error);
// // // //             }
// // // //         } else {
// // // //             setAddressSuggestions([]);
// // // //         }
// // // //     }, 300);

// // // //     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const value = e.target.value;
// // // //         setValue("address", value);
// // // //         debouncedAddressSearch(value);
// // // //     };

// // // //     const handleAddressSelect = (selectedAddress: string) => {
// // // //         setValue("address", selectedAddress);
// // // //         setAddressSuggestions([]);
// // // //         // Parse the selected address to fill in city, state, and zip code
// // // //         const parts = selectedAddress.split(", ");
// // // //         if (parts.length >= 3) {
// // // //             setValue("city", parts[parts.length - 3]);
// // // //             const stateZip = parts[parts.length - 2].split(" ");
// // // //             setValue("state", stateZip[0]);
// // // //             setValue("zipCode", stateZip[1]);
// // // //         }
// // // //     };

// // // //     useEffect(() => {
// // // //         return () => {
// // // //             debouncedAddressSearch.cancel();
// // // //         };
// // // //     }, []);

// // // //     const containerVariants = {
// // // //         hidden: { opacity: 0, y: 50 },
// // // //         visible: {
// // // //             opacity: 1,
// // // //             y: 0,
// // // //             transition: {
// // // //                 type: "spring",
// // // //                 stiffness: 100,
// // // //                 damping: 15,
// // // //                 when: "beforeChildren",
// // // //                 staggerChildren: 0.1,
// // // //             },
// // // //         },
// // // //     };

// // // //     const itemVariants = {
// // // //         hidden: { opacity: 0, y: 20 },
// // // //         visible: {
// // // //             opacity: 1,
// // // //             y: 0,
// // // //             transition: { type: "spring", stiffness: 100, damping: 15 },
// // // //         },
// // // //     };

// // // //     return (
// // // //         <motion.form
// // // //             onSubmit={handleSubmit(onSubmit)}
// // // //             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
// // // //             variants={containerVariants}
// // // //             initial="hidden"
// // // //             animate="visible"
// // // //         >
// // // //             {error && <p className="text-red-500 mb-4">{error}</p>}

// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="firstName"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         First Name
// // // //                     </label>
// // // //                     <input
// // // //                         id="firstName"
// // // //                         {...register("firstName", {
// // // //                             required: "First name is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                     />
// // // //                     {errors.firstName && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.firstName.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="lastName"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Last Name
// // // //                     </label>
// // // //                     <input
// // // //                         id="lastName"
// // // //                         {...register("lastName", {
// // // //                             required: "Last name is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                     />
// // // //                     {errors.lastName && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.lastName.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="email"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Email
// // // //                     </label>
// // // //                     <input
// // // //                         id="email"
// // // //                         type="email"
// // // //                         {...register("email", {
// // // //                             required: "Email is required",
// // // //                             pattern: {
// // // //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // // //                                 message: "Invalid email address",
// // // //                             },
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                     />
// // // //                     {errors.email && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.email.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="phone"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Phone
// // // //                     </label>
// // // //                     <div className="flex">
// // // //                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
// // // //                             +1
// // // //                         </span>
// // // //                         <input
// // // //                             id="phone"
// // // //                             type="tel"
// // // //                             {...register("phone", {
// // // //                                 required: "Phone is required",
// // // //                                 pattern: {
// // // //                                     value: /^[2-9]\d{9}$/,
// // // //                                     message:
// // // //                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
// // // //                                 },
// // // //                             })}
// // // //                             placeholder="1234567890"
// // // //                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text"
// // // //                         />
// // // //                     </div>
// // // //                     {errors.phone && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.phone.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="year"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Date of Birth
// // // //                     </label>
// // // //                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // // //                         <select
// // // //                             id="year"
// // // //                             {...register("year", {
// // // //                                 required: "Year is required",
// // // //                             })}
// // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                         >
// // // //                             <option value="">Year</option>
// // // //                             {Array.from(
// // // //                                 { length: new Date().getFullYear() - 1900 + 1 },
// // // //                                 (_, i) => new Date().getFullYear() - i
// // // //                             ).map((year) => (
// // // //                                 <option key={year} value={year}>
// // // //                                     {year}
// // // //                                 </option>
// // // //                             ))}
// // // //                         </select>
// // // //                         <select
// // // //                             id="month"
// // // //                             {...register("month", {
// // // //                                 required: "Month is required",
// // // //                             })}
// // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                         >
// // // //                             <option value="">Month</option>
// // // //                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
// // // //                                 (month) => (
// // // //                                     <option key={month} value={month}>
// // // //                                         {new Date(0, month - 1).toLocaleString(
// // // //                                             "en-US",
// // // //                                             { month: "long" }
// // // //                                         )}
// // // //                                     </option>
// // // //                                 )
// // // //                             )}
// // // //                         </select>
// // // //                         <select
// // // //                             id="day"
// // // //                             {...register("day", {
// // // //                                 required: "Day is required",
// // // //                             })}
// // // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                         >
// // // //                             <option value="">Day</option>
// // // //                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
// // // //                                 (day) => (
// // // //                                     <option key={day} value={day}>
// // // //                                         {day}
// // // //                                     </option>
// // // //                                 )
// // // //                             )}
// // // //                         </select>
// // // //                     </div>
// // // //                     {(errors.year || errors.month || errors.day) && (
// // // //                         <span className="text-red-500">
// // // //                             Invalid date of birth
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="insurance"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Insurance Provider
// // // //                     </label>
// // // //                     <select
// // // //                         id="insurance"
// // // //                         {...register("insurance", {
// // // //                             required: "Insurance provider is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                     >
// // // //                         <option value="" disabled>
// // // //                             Select your insurance provider
// // // //                         </option>
// // // //                         <option value="IEHP">IEHP</option>
// // // //                         <option value="Blue Cross Blue Shield">
// // // //                             Blue Cross Blue Shield
// // // //                         </option>
// // // //                         <option value="UnitedHealthcare">
// // // //                             UnitedHealthcare
// // // //                         </option>
// // // //                         <option value="Health Net">Health Net</option>
// // // //                         <option value="Central Health Plan of California">
// // // //                             Central Health Plan of California
// // // //                         </option>
// // // //                         <option value="Aetna">Aetna</option>
// // // //                         <option value="Cigna">Cigna</option>
// // // //                         <option value="Medicare">Medicare</option>
// // // //                     </select>
// // // //                     {errors.insurance && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.insurance.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="address"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Address
// // // //                     </label>
// // // //                     <input
// // // //                         id="address"
// // // //                         {...register("address", {
// // // //                             required: "Address is required",
// // // //                         })}
// // // //                         onChange={handleAddressChange}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                     />
// // // //                     {addressSuggestions.length > 0 && (
// // // //                         <ul className="mt-2 bg-white dark:bg-gray-800 border rounded">
// // // //                             {addressSuggestions.map((suggestion, index) => (
// // // //                                 <li
// // // //                                     key={index}
// // // //                                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
// // // //                                     onClick={() =>
// // // //                                         handleAddressSelect(suggestion)
// // // //                                     }
// // // //                                 >
// // // //                                     {suggestion}
// // // //                                 </li>
// // // //                             ))}
// // // //                         </ul>
// // // //                     )}
// // // //                     {errors.address && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.address.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="city"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         City
// // // //                     </label>
// // // //                     <input
// // // //                         id="city"
// // // //                         {...register("city", { required: "City is required" })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                     />
// // // //                     {errors.city && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.city.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="state"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         State
// // // //                     </label>
// // // //                     <select
// // // //                         id="state"
// // // //                         {...register("state", {
// // // //                             required: "State is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                     >
// // // //                         <option value="" disabled>
// // // //                             Select your state
// // // //                         </option>
// // // //                         {states.map((state) => (
// // // //                             <option key={state} value={state}>
// // // //                                 {state}
// // // //                             </option>
// // // //                         ))}
// // // //                     </select>
// // // //                     {errors.state && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.state.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="zipCode"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Zip Code
// // // //                     </label>
// // // //                     <input
// // // //                         id="zipCode"
// // // //                         {...register("zipCode", {
// // // //                             required: "Zip code is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                     />
// // // //                     {errors.zipCode && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.zipCode.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div className="mb-4" variants={itemVariants}>
// // // //                     <label
// // // //                         htmlFor="pharmacy"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Preferred Pharmacy
// // // //                     </label>
// // // //                     <select
// // // //                         id="pharmacy"
// // // //                         {...register("pharmacy", {
// // // //                             required: "Preferred pharmacy is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                     >
// // // //                         <option value="" disabled>
// // // //                             Select your preferred pharmacy
// // // //                         </option>
// // // //                         {pharmacies.map((pharmacy) => (
// // // //                             <option key={pharmacy} value={pharmacy}>
// // // //                                 {pharmacy}
// // // //                             </option>
// // // //                         ))}
// // // //                     </select>
// // // //                     {errors.pharmacy && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.pharmacy.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div
// // // //                     className="mb-4 lg:col-span-3"
// // // //                     variants={itemVariants}
// // // //                 >
// // // //                     <label
// // // //                         htmlFor="reason"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Reason for Visit
// // // //                     </label>
// // // //                     <select
// // // //                         id="reason"
// // // //                         {...register("reason", {
// // // //                             required: "Reason for visit is required",
// // // //                         })}
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                     >
// // // //                         <option value="" disabled>
// // // //                             Select your reason for visit
// // // //                         </option>
// // // //                         {reasons.map((reason) => (
// // // //                             <option key={reason} value={reason}>
// // // //                                 {reason}
// // // //                             </option>
// // // //                         ))}
// // // //                     </select>
// // // //                     {watchReason === "Other" && (
// // // //                         <textarea
// // // //                             id="customReason"
// // // //                             {...register("customReason", {
// // // //                                 required: "Please specify your reason",
// // // //                             })}
// // // //                             placeholder="Please specify your reason"
// // // //                             className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                         />
// // // //                     )}
// // // //                     {errors.reason && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.reason.message}
// // // //                         </span>
// // // //                     )}
// // // //                     {watchReason === "Other" && errors.customReason && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.customReason.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div
// // // //                     className="mb-4 lg:col-span-3"
// // // //                     variants={itemVariants}
// // // //                 >
// // // //                     <label
// // // //                         htmlFor="suggestedAppointment"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Suggested Appointment Time
// // // //                     </label>
// // // //                     <DatePicker
// // // //                         selected={watchSuggestedAppointment}
// // // //                         onChange={(date: Date | null) =>
// // // //                             setValue("suggestedAppointment", date)
// // // //                         }
// // // //                         showTimeSelect
// // // //                         timeIntervals={15}
// // // //                         dateFormat="MMMM d, yyyy h:mm aa"
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // // //                         minDate={new Date()}
// // // //                         placeholderText="Select a date and time"
// // // //                         popperClassName="react-datepicker-popper"
// // // //                         calendarClassName="react-datepicker-calendar"
// // // //                     />
// // // //                     {errors.suggestedAppointment && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.suggestedAppointment.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.div
// // // //                     className="mb-4 lg:col-span-3"
// // // //                     variants={itemVariants}
// // // //                 >
// // // //                     <label
// // // //                         htmlFor="pdf"
// // // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // // //                     >
// // // //                         Upload PDF Document (optional)
// // // //                     </label>
// // // //                     <input
// // // //                         type="file"
// // // //                         id="pdf"
// // // //                         ref={fileInputRef}
// // // //                         accept=".pdf"
// // // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // // //                     />
// // // //                 </motion.div>

// // // //                 <motion.div
// // // //                     className="mb-4 lg:col-span-3"
// // // //                     variants={itemVariants}
// // // //                 >
// // // //                     <label className="flex items-center text-gray-700 dark:text-gray-300">
// // // //                         <input
// // // //                             type="checkbox"
// // // //                             {...register("consentGiven", {
// // // //                                 required: "You must give consent to proceed",
// // // //                             })}
// // // //                             className="mr-2 cursor-pointer"
// // // //                         />
// // // //                         I consent to the processing of my personal data
// // // //                     </label>
// // // //                     {errors.consentGiven && (
// // // //                         <span className="text-red-500">
// // // //                             {errors.consentGiven.message}
// // // //                         </span>
// // // //                     )}
// // // //                 </motion.div>

// // // //                 <motion.button
// // // //                     type="submit"
// // // //                     disabled={isLoading}
// // // //                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
// // // //                         isLoading ? "opacity-50 cursor-not-allowed" : ""
// // // //                     } lg:col-span-3`}
// // // //                     variants={itemVariants}
// // // //                     whileHover={{ scale: 1.05 }}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                 >
// // // //                     {isLoading ? "Submitting..." : "Submit"}
// // // //                 </motion.button>
// // // //             </div>
// // // //         </motion.form>
// // // //     );
// // // // };

// // // // export default ContactForm;

// // // "use client";

// // // import React, { useState, useRef, useEffect } from "react";
// // // import { Form, useForm } from "react-hook-form";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import { motion } from "framer-motion";
// // // import debounce from "lodash/debounce";

// // // interface FormData {
// // //     firstName: string;
// // //     lastName: string;
// // //     email: string;
// // //     phone: string;
// // //     year: string;
// // //     month: string;
// // //     day: string;
// // //     insurance: string;
// // //     address: string;
// // //     city: string;
// // //     state: string;
// // //     zipCode: string;
// // //     pharmacy: string;
// // //     reason: string;
// // //     customReason?: string;
// // //     suggestedAppointment: Date | null;
// // //     consentGiven: boolean;
// // // }

// // // const states = [
// // //     "AL",
// // //     "AK",
// // //     "AZ",
// // //     "AR",
// // //     "CA",
// // //     "CO",
// // //     "CT",
// // //     "DE",
// // //     "FL",
// // //     "GA",
// // //     "HI",
// // //     "ID",
// // //     "IL",
// // //     "IN",
// // //     "IA",
// // //     "KS",
// // //     "KY",
// // //     "LA",
// // //     "ME",
// // //     "MD",
// // //     "MA",
// // //     "MI",
// // //     "MN",
// // //     "MS",
// // //     "MO",
// // //     "MT",
// // //     "NE",
// // //     "NV",
// // //     "NH",
// // //     "NJ",
// // //     "NM",
// // //     "NY",
// // //     "NC",
// // //     "ND",
// // //     "OH",
// // //     "OK",
// // //     "OR",
// // //     "PA",
// // //     "RI",
// // //     "SC",
// // //     "SD",
// // //     "TN",
// // //     "TX",
// // //     "UT",
// // //     "VT",
// // //     "VA",
// // //     "WA",
// // //     "WV",
// // //     "WI",
// // //     "WY",
// // // ];

// // // const pharmacies = [
// // //     "CVS",
// // //     "Walgreens",
// // //     "Walmart",
// // //     "Rite Aid",
// // //     "Safeway",
// // //     "Kroger",
// // //     "Target Pharmacy",
// // //     "Costco Pharmacy",
// // //     "Albertsons",
// // //     "Vons",
// // // ];

// // // const reasons = [
// // //     "New Patient Registration",
// // //     "Follow-up Appointment",
// // //     "Prescription Refill",
// // //     "Mental Health Consultation",
// // //     "Therapy Session",
// // //     "Other",
// // // ];

// // // const ContactForm: React.FC = () => {
// // //     const {
// // //         register,
// // //         handleSubmit,
// // //         formState: { errors },
// // //         setValue,
// // //         watch,
// // //     } = useForm<FormData>();
// // //     const [isLoading, setIsLoading] = useState(false);
// // //     const [error, setError] = useState("");
// // //     const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
// // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // //     const watchSuggestedAppointment = watch("suggestedAppointment");
// // //     const watchReason = watch("reason");

// // //     const onSubmit = async (data: FormData) => {
// // //         setIsLoading(true);
// // //         setError("");

// // //         console.log(
// // //             "before creating birth date:",
// // //             data.year,
// // //             data.month,
// // //             data.day
// // //         );
// // //         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
// // //         console.log("birth date is: ", birthDate);
// // //         if (isNaN(birthDate.getTime())) {
// // //             setError("Invalid date of birth");
// // //             setIsLoading(false);
// // //             return;
// // //         }

// // //         const minAgeDate = new Date();
// // //         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

// // //         if (birthDate > minAgeDate) {
// // //             setError("Patient must be at least 2 years old.");
// // //             setIsLoading(false);
// // //             return;
// // //         }

// // //         if (!isValidAppointmentTime(data.suggestedAppointment)) {
// // //             setError(
// // //                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
// // //             );
// // //             setIsLoading(false);
// // //             return;
// // //         }

// // //         const formattedPhone = formatPhoneNumber(data.phone);

// // //         const formData = new FormData();
// // //         Object.entries(data).forEach(([key, value]) => {
// // //             if (key === "suggestedAppointment" && value) {
// // //                 formData.append(key, (value as Date).toISOString());
// // //             } else if (key === "phone") {
// // //                 formData.append(key, formattedPhone);
// // //             } else if (
// // //                 key !== "year" &&
// // //                 key !== "month" &&
// // //                 key !== "day" &&
// // //                 key !== "customReason"
// // //             ) {
// // //                 formData.append(key, value as string);
// // //             }
// // //         });

// // //         console.log("month day year", data.month, data.day, data.year);
// // //         const formattedBirthday = `${data.month}-${data.day}-${data.year}`;
// // //         console.log("formattedBirthday", formattedBirthday);
// // //         formData.append("birthday", formattedBirthday);
// // //         if (data.reason === "Other" && data.customReason) {
// // //             formData.append("reason", data.customReason);
// // //         }

// // //         if (fileInputRef.current?.files?.[0]) {
// // //             formData.append("pdf", fileInputRef.current.files[0]);
// // //         }

// // //         try {
// // //             console.log("Form data to send:", formData);
// // //             console.log("right before submission: ", data);
// // //             const response = await fetch("/api/llpmg-register-patient/route", {
// // //                 method: "POST",
// // //                 body: formData,
// // //             });

// // //             if (!response.ok) {
// // //                 throw new Error("Failed to register patient");
// // //             }

// // //             alert(
// // //                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
// // //             );
// // //             Object.keys(data).forEach((key) =>
// // //                 setValue(key as keyof FormData, "")
// // //             );
// // //             if (fileInputRef.current) {
// // //                 fileInputRef.current.value = "";
// // //             }
// // //         } catch (err) {
// // //             setError(
// // //                 "An error occurred while submitting your information. Please try again."
// // //             );
// // //         } finally {
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     const isValidAppointmentTime = (date: Date | null): boolean => {
// // //         if (!date) return false;
// // //         const day = date.getDay();
// // //         const hours = date.getHours();
// // //         const isWeekday = day > 0 && day < 6;
// // //         const isBusinessHours = hours >= 9 && hours < 17;
// // //         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
// // //         return isWeekday && isBusinessHours && isFutureDate;
// // //     };

// // //     const formatPhoneNumber = (phone: string): string => {
// // //         const digitsOnly = phone.replace(/\D/g, "");
// // //         return `+1${digitsOnly.slice(-10)}`;
// // //     };

// // //     const debouncedAddressSearch = debounce(async (input: string) => {
// // //         if (input.length > 2) {
// // //             try {
// // //                 const response = await fetch(
// // //                     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us`
// // //                 );
// // //                 const data = await response.json();
// // //                 const suggestions = data.map((item: any) => item.display_name);
// // //                 setAddressSuggestions(suggestions.slice(0, 5));
// // //             } catch (error) {
// // //                 console.error("Error fetching address suggestions:", error);
// // //             }
// // //         } else {
// // //             setAddressSuggestions([]);
// // //         }
// // //     }, 300);

// // //     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const value = e.target.value;
// // //         setValue("address", value);
// // //         debouncedAddressSearch(value);
// // //     };

// // //     const handleAddressSelect = (selectedAddress: string) => {
// // //         setValue("address", selectedAddress);
// // //         setAddressSuggestions([]);
// // //         // Parse the selected address to fill in city, state, and zip code
// // //         const parts = selectedAddress.split(", ");
// // //         if (parts.length >= 3) {
// // //             setValue("city", parts[parts.length - 3]);
// // //             const stateZip = parts[parts.length - 2].split(" ");
// // //             setValue("state", stateZip[0]);
// // //             setValue("zipCode", stateZip[1]);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         return () => {
// // //             debouncedAddressSearch.cancel();
// // //         };
// // //     }, []);

// // //     const containerVariants = {
// // //         hidden: { opacity: 0, y: 50 },
// // //         visible: {
// // //             opacity: 1,
// // //             y: 0,
// // //             transition: {
// // //                 type: "spring",
// // //                 stiffness: 100,
// // //                 damping: 15,
// // //                 when: "beforeChildren",
// // //                 staggerChildren: 0.1,
// // //             },
// // //         },
// // //     };

// // //     const itemVariants = {
// // //         hidden: { opacity: 0, y: 20 },
// // //         visible: {
// // //             opacity: 1,
// // //             y: 0,
// // //             transition: { type: "spring", stiffness: 100, damping: 15 },
// // //         },
// // //     };

// // //     useEffect(() => {
// // //         if (!FormData) {
// // //             console.log("Form Data is empty");
// // //         }
// // //         console.log(
// // //             "birthday value",
// // //             watch("year"),
// // //             watch("month"),
// // //             watch("day")
// // //         );
// // //         console.log("Form Data: ", FormData);
// // //     }, [FormData]);

// // //     return (
// // //         <motion.form
// // //             onSubmit={handleSubmit(onSubmit)}
// // //             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
// // //             variants={containerVariants}
// // //             initial="hidden"
// // //             animate="visible"
// // //         >
// // //             {error && <p className="text-red-500 mb-4">{error}</p>}

// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="firstName"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         First Name
// // //                     </label>
// // //                     <input
// // //                         id="firstName"
// // //                         {...register("firstName", {
// // //                             required: "First name is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                     />
// // //                     {errors.firstName && (
// // //                         <span className="text-red-500">
// // //                             {errors.firstName.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="lastName"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Last Name
// // //                     </label>
// // //                     <input
// // //                         id="lastName"
// // //                         {...register("lastName", {
// // //                             required: "Last name is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                     />
// // //                     {errors.lastName && (
// // //                         <span className="text-red-500">
// // //                             {errors.lastName.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="email"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Email
// // //                     </label>
// // //                     <input
// // //                         id="email"
// // //                         type="email"
// // //                         {...register("email", {
// // //                             required: "Email is required",
// // //                             pattern: {
// // //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // //                                 message: "Invalid email address",
// // //                             },
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                     />
// // //                     {errors.email && (
// // //                         <span className="text-red-500">
// // //                             {errors.email.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="phone"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Phone
// // //                     </label>
// // //                     <div className="flex">
// // //                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
// // //                             +1
// // //                         </span>
// // //                         <input
// // //                             id="phone"
// // //                             type="tel"
// // //                             {...register("phone", {
// // //                                 required: "Phone is required",
// // //                                 pattern: {
// // //                                     value: /^[2-9]\d{9}$/,
// // //                                     message:
// // //                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
// // //                                 },
// // //                             })}
// // //                             placeholder="1234567890"
// // //                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text"
// // //                         />
// // //                     </div>
// // //                     {errors.phone && (
// // //                         <span className="text-red-500">
// // //                             {errors.phone.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="year"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Date of Birth
// // //                     </label>
// // //                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // //                         <select
// // //                             id="year"
// // //                             {...register("year", {
// // //                                 required: "Year is required",
// // //                             })}
// // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                         >
// // //                             <option value="">Year</option>
// // //                             {Array.from(
// // //                                 { length: new Date().getFullYear() - 1900 + 1 },
// // //                                 (_, i) => new Date().getFullYear() - i
// // //                             ).map((year) => (
// // //                                 <option key={year} value={year}>
// // //                                     {year}
// // //                                 </option>
// // //                             ))}
// // //                         </select>
// // //                         <select
// // //                             id="month"
// // //                             {...register("month", {
// // //                                 required: "Month is required",
// // //                             })}
// // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                         >
// // //                             <option value="">Month</option>
// // //                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
// // //                                 (month) => (
// // //                                     <option key={month} value={month}>
// // //                                         {new Date(0, month - 1).toLocaleString(
// // //                                             "en-US",
// // //                                             { month: "long" }
// // //                                         )}
// // //                                     </option>
// // //                                 )
// // //                             )}
// // //                         </select>
// // //                         <select
// // //                             id="day"
// // //                             {...register("day", {
// // //                                 required: "Day is required",
// // //                             })}
// // //                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                         >
// // //                             <option value="">Day</option>
// // //                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
// // //                                 (day) => (
// // //                                     <option key={day} value={day}>
// // //                                         {day}
// // //                                     </option>
// // //                                 )
// // //                             )}
// // //                         </select>
// // //                     </div>
// // //                     {(errors.year || errors.month || errors.day) && (
// // //                         <span className="text-red-500">
// // //                             Invalid date of birth
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="insurance"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Insurance Provider
// // //                     </label>
// // //                     <select
// // //                         id="insurance"
// // //                         {...register("insurance", {
// // //                             required: "Insurance provider is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                     >
// // //                         <option value="" disabled>
// // //                             Select your insurance provider
// // //                         </option>
// // //                         <option value="IEHP">IEHP</option>
// // //                         <option value="Blue Cross Blue Shield">
// // //                             Blue Cross Blue Shield
// // //                         </option>
// // //                         <option value="UnitedHealthcare">
// // //                             UnitedHealthcare
// // //                         </option>
// // //                         <option value="Health Net">Health Net</option>
// // //                         <option value="Central Health Plan of California">
// // //                             Central Health Plan of California
// // //                         </option>
// // //                         <option value="Aetna">Aetna</option>
// // //                         <option value="Cigna">Cigna</option>
// // //                         <option value="Medicare">Medicare</option>
// // //                     </select>
// // //                     {errors.insurance && (
// // //                         <span className="text-red-500">
// // //                             {errors.insurance.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="address"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Address
// // //                     </label>
// // //                     <input
// // //                         id="address"
// // //                         {...register("address", {
// // //                             required: "Address is required",
// // //                         })}
// // //                         onChange={handleAddressChange}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                     />
// // //                     {addressSuggestions.length > 0 && (
// // //                         <ul className="mt-2 bg-white dark:bg-gray-800 border rounded">
// // //                             {addressSuggestions.map((suggestion, index) => (
// // //                                 <li
// // //                                     key={index}
// // //                                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
// // //                                     onClick={() =>
// // //                                         handleAddressSelect(suggestion)
// // //                                     }
// // //                                 >
// // //                                     {suggestion}
// // //                                 </li>
// // //                             ))}
// // //                         </ul>
// // //                     )}
// // //                     {errors.address && (
// // //                         <span className="text-red-500">
// // //                             {errors.address.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="city"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         City
// // //                     </label>
// // //                     <input
// // //                         id="city"
// // //                         {...register("city", { required: "City is required" })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                     />
// // //                     {errors.city && (
// // //                         <span className="text-red-500">
// // //                             {errors.city.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="state"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         State
// // //                     </label>
// // //                     <select
// // //                         id="state"
// // //                         {...register("state", {
// // //                             required: "State is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                     >
// // //                         <option value="" disabled>
// // //                             Select your state
// // //                         </option>
// // //                         {states.map((state) => (
// // //                             <option key={state} value={state}>
// // //                                 {state}
// // //                             </option>
// // //                         ))}
// // //                     </select>
// // //                     {errors.state && (
// // //                         <span className="text-red-500">
// // //                             {errors.state.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="zipCode"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Zip Code
// // //                     </label>
// // //                     <input
// // //                         id="zipCode"
// // //                         {...register("zipCode", {
// // //                             required: "Zip code is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                     />
// // //                     {errors.zipCode && (
// // //                         <span className="text-red-500">
// // //                             {errors.zipCode.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div className="mb-4" variants={itemVariants}>
// // //                     <label
// // //                         htmlFor="pharmacy"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Preferred Pharmacy
// // //                     </label>
// // //                     <select
// // //                         id="pharmacy"
// // //                         {...register("pharmacy", {
// // //                             required: "Preferred pharmacy is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                     >
// // //                         <option value="" disabled>
// // //                             Select your preferred pharmacy
// // //                         </option>
// // //                         {pharmacies.map((pharmacy) => (
// // //                             <option key={pharmacy} value={pharmacy}>
// // //                                 {pharmacy}
// // //                             </option>
// // //                         ))}
// // //                     </select>
// // //                     {errors.pharmacy && (
// // //                         <span className="text-red-500">
// // //                             {errors.pharmacy.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div
// // //                     className="mb-4 lg:col-span-3"
// // //                     variants={itemVariants}
// // //                 >
// // //                     <label
// // //                         htmlFor="reason"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Reason for Visit
// // //                     </label>
// // //                     <select
// // //                         id="reason"
// // //                         {...register("reason", {
// // //                             required: "Reason for visit is required",
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                     >
// // //                         <option value="" disabled>
// // //                             Select your reason for visit
// // //                         </option>
// // //                         {reasons.map((reason) => (
// // //                             <option key={reason} value={reason}>
// // //                                 {reason}
// // //                             </option>
// // //                         ))}
// // //                     </select>
// // //                     {watchReason === "Other" && (
// // //                         <textarea
// // //                             id="customReason"
// // //                             {...register("customReason", {
// // //                                 required: "Please specify your reason",
// // //                             })}
// // //                             placeholder="Please specify your reason"
// // //                             className="w-full mt-2 px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                         />
// // //                     )}
// // //                     {errors.reason && (
// // //                         <span className="text-red-500">
// // //                             {errors.reason.message}
// // //                         </span>
// // //                     )}
// // //                     {watchReason === "Other" && errors.customReason && (
// // //                         <span className="text-red-500">
// // //                             {errors.customReason.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div
// // //                     className="mb-4 lg:col-span-3"
// // //                     variants={itemVariants}
// // //                 >
// // //                     <label
// // //                         htmlFor="suggestedAppointment"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Suggested Appointment Time
// // //                     </label>
// // //                     <DatePicker
// // //                         selected={watchSuggestedAppointment}
// // //                         onChange={(date: Date | null) =>
// // //                             setValue("suggestedAppointment", date)
// // //                         }
// // //                         showTimeSelect
// // //                         timeIntervals={15}
// // //                         dateFormat="MMMM d, yyyy h:mm aa"
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
// // //                         minDate={new Date()}
// // //                         placeholderText="Select a date and time"
// // //                         popperClassName="react-datepicker-popper"
// // //                         calendarClassName="react-datepicker-calendar"
// // //                     />
// // //                     {errors.suggestedAppointment && (
// // //                         <span className="text-red-500">
// // //                             {errors.suggestedAppointment.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.div
// // //                     className="mb-4 lg:col-span-3"
// // //                     variants={itemVariants}
// // //                 >
// // //                     <label
// // //                         htmlFor="pdf"
// // //                         className="block mb-2 text-gray-700 dark:text-gray-300"
// // //                     >
// // //                         Upload PDF Document (optional)
// // //                     </label>
// // //                     <input
// // //                         type="file"
// // //                         id="pdf"
// // //                         ref={fileInputRef}
// // //                         accept=".pdf"
// // //                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
// // //                     />
// // //                 </motion.div>

// // //                 <motion.div
// // //                     className="mb-4 lg:col-span-3"
// // //                     variants={itemVariants}
// // //                 >
// // //                     <label className="flex items-center text-gray-700 dark:text-gray-300">
// // //                         <input
// // //                             type="checkbox"
// // //                             {...register("consentGiven", {
// // //                                 required: "You must give consent to proceed",
// // //                             })}
// // //                             className="mr-2 cursor-pointer"
// // //                         />
// // //                         I consent to the processing of my personal data
// // //                     </label>
// // //                     {errors.consentGiven && (
// // //                         <span className="text-red-500">
// // //                             {errors.consentGiven.message}
// // //                         </span>
// // //                     )}
// // //                 </motion.div>

// // //                 <motion.button
// // //                     type="submit"
// // //                     disabled={isLoading}
// // //                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
// // //                         isLoading ? "opacity-50 cursor-not-allowed" : ""
// // //                     } lg:col-span-3`}
// // //                     variants={itemVariants}
// // //                     whileHover={{ scale: 1.05 }}
// // //                     whileTap={{ scale: 0.95 }}
// // //                 >
// // //                     {isLoading ? "Submitting..." : "Submit"}
// // //                 </motion.button>
// // //             </div>
// // //         </motion.form>
// // //     );
// // // };

// // // export default ContactForm;

// // "use client";

// // import React, { useState, useRef } from "react";
// // import { useForm } from "react-hook-form";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { motion } from "framer-motion";

// // interface FormData {
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     phone: string;
// //     birthday: string;
// //     insurance: string;
// //     address: string;
// //     city: string;
// //     state: string;
// //     zipCode: string;
// //     pharmacy: string;
// //     reason: string;
// //     suggestedAppointment: Date | null;
// //     consentGiven: boolean;
// // }

// // const ContactForm: React.FC = () => {
// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors },
// //         setValue,
// //         watch,
// //     } = useForm<FormData>();
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState("");
// //     const fileInputRef = useRef<HTMLInputElement>(null);
// //     const watchSuggestedAppointment = watch("suggestedAppointment");

// //     const onSubmit = async (data: FormData) => {
// //         setIsLoading(true);
// //         setError("");

// //         if (!isValidAppointmentTime(data.suggestedAppointment)) {
// //             setError(
// //                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
// //             );
// //             setIsLoading(false);
// //             return;
// //         }

// //         const formattedPhone = formatPhoneNumber(data.phone);

// //         const formData = new FormData();
// //         Object.entries(data).forEach(([key, value]) => {
// //             if (key === "suggestedAppointment" && value) {
// //                 formData.append(key, (value as Date).toISOString());
// //             } else if (key === "phone") {
// //                 formData.append(key, formattedPhone);
// //             } else {
// //                 formData.append(key, value as string);
// //             }
// //         });

// //         if (fileInputRef.current?.files?.[0]) {
// //             formData.append("pdf", fileInputRef.current.files[0]);
// //         }

// //         try {
// //             const response = await fetch("/api/llpmg-register-patient/route", {
// //                 method: "POST",
// //                 body: formData,
// //             });

// //             if (!response.ok) {
// //                 throw new Error("Failed to register patient");
// //             }

// //             alert(
// //                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
// //             );
// //             Object.keys(data).forEach((key) =>
// //                 setValue(key as keyof FormData, "")
// //             );
// //             if (fileInputRef.current) {
// //                 fileInputRef.current.value = "";
// //             }
// //         } catch (err) {
// //             setError(
// //                 "An error occurred while submitting your information. Please try again."
// //             );
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     const isValidAppointmentTime = (date: Date | null): boolean => {
// //         if (!date) return false;
// //         const day = date.getDay();
// //         const hours = date.getHours();
// //         const isWeekday = day > 0 && day < 6;
// //         const isBusinessHours = hours >= 9 && hours < 17;
// //         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
// //         return isWeekday && isBusinessHours && isFutureDate;
// //     };

// //     const formatPhoneNumber = (phone: string): string => {
// //         const digitsOnly = phone.replace(/\D/g, "");
// //         return `+1${digitsOnly.slice(-10)}`;
// //     };

// //     const containerVariants = {
// //         hidden: { opacity: 0, y: 50 },
// //         visible: {
// //             opacity: 1,
// //             y: 0,
// //             transition: {
// //                 type: "spring",
// //                 stiffness: 100,
// //                 damping: 15,
// //                 when: "beforeChildren",
// //                 staggerChildren: 0.1,
// //             },
// //         },
// //     };

// //     const itemVariants = {
// //         hidden: { opacity: 0, y: 20 },
// //         visible: {
// //             opacity: 1,
// //             y: 0,
// //             transition: { type: "spring", stiffness: 100, damping: 15 },
// //         },
// //     };

// //     return (
// //         <motion.form
// //             onSubmit={handleSubmit(onSubmit)}
// //             className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
// //             variants={containerVariants}
// //             initial="hidden"
// //             animate="visible"
// //         >
// //             {error && <p className="text-red-500 mb-4">{error}</p>}

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="firstName"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     First Name
// //                 </label>
// //                 <input
// //                     id="firstName"
// //                     {...register("firstName", {
// //                         required: "First name is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.firstName && (
// //                     <span className="text-red-500">
// //                         {errors.firstName.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="lastName"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Last Name
// //                 </label>
// //                 <input
// //                     id="lastName"
// //                     {...register("lastName", {
// //                         required: "Last name is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.lastName && (
// //                     <span className="text-red-500">
// //                         {errors.lastName.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="email"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Email
// //                 </label>
// //                 <input
// //                     id="email"
// //                     type="email"
// //                     {...register("email", {
// //                         required: "Email is required",
// //                         pattern: {
// //                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                             message: "Invalid email address",
// //                         },
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.email && (
// //                     <span className="text-red-500">{errors.email.message}</span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="phone"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Phone
// //                 </label>
// //                 <div className="flex">
// //                     <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
// //                         +1
// //                     </span>
// //                     <input
// //                         id="phone"
// //                         type="tel"
// //                         {...register("phone", {
// //                             required: "Phone is required",
// //                             pattern: {
// //                                 value: /^[2-9]\d{9}$/,
// //                                 message:
// //                                     "Invalid phone number. Please enter 10 digits without spaces or dashes.",
// //                             },
// //                         })}
// //                         placeholder="1234567890"
// //                         className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// //                     />
// //                 </div>
// //                 {errors.phone && (
// //                     <span className="text-red-500">{errors.phone.message}</span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="birthday"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Date of Birth
// //                 </label>
// //                 <input
// //                     type="date"
// //                     id="birthday"
// //                     {...register("birthday", {
// //                         required: "Date of birth is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.birthday && (
// //                     <span className="text-red-500">
// //                         {errors.birthday.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="insurance"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Insurance Provider
// //                 </label>
// //                 <select
// //                     id="insurance"
// //                     {...register("insurance", {
// //                         required: "Insurance provider is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                     <option value="" disabled>
// //                         Select your insurance provider
// //                     </option>
// //                     <option value="IEHP">IEHP</option>
// //                     <option value="Blue Cross Blue Shield">
// //                         Blue Cross Blue Shield
// //                     </option>
// //                     <option value="UnitedHealthcare">UnitedHealthcare</option>
// //                     <option value="Health Net">Health Net</option>
// //                     <option value="Central Health Plan of California">
// //                         Central Health Plan of California
// //                     </option>
// //                     <option value="Aetna">Aetna</option>
// //                     <option value="Cigna">Cigna</option>
// //                     <option value="Medicare">Medicare</option>
// //                 </select>
// //                 {errors.insurance && (
// //                     <span className="text-red-500">
// //                         {errors.insurance.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="address"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Address
// //                 </label>
// //                 <input
// //                     id="address"
// //                     {...register("address", {
// //                         required: "Address is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.address && (
// //                     <span className="text-red-500">
// //                         {errors.address.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="city"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     City
// //                 </label>
// //                 <input
// //                     id="city"
// //                     {...register("city", { required: "City is required" })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.city && (
// //                     <span className="text-red-500">{errors.city.message}</span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="state"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     State
// //                 </label>
// //                 <input
// //                     id="state"
// //                     {...register("state", { required: "State is required" })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.state && (
// //                     <span className="text-red-500">{errors.state.message}</span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="zipCode"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Zip Code
// //                 </label>
// //                 <input
// //                     id="zipCode"
// //                     {...register("zipCode", {
// //                         required: "Zip code is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.zipCode && (
// //                     <span className="text-red-500">
// //                         {errors.zipCode.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="pharmacy"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Preferred Pharmacy
// //                 </label>
// //                 <input
// //                     id="pharmacy"
// //                     {...register("pharmacy", {
// //                         required: "Preferred pharmacy is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.pharmacy && (
// //                     <span className="text-red-500">
// //                         {errors.pharmacy.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="reason"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Reason for Visit
// //                 </label>
// //                 <textarea
// //                     id="reason"
// //                     {...register("reason", {
// //                         required: "Reason for visit is required",
// //                     })}
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 {errors.reason && (
// //                     <span className="text-red-500">
// //                         {errors.reason.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label
// //                     htmlFor="suggestedAppointment"
// //                     className="block mb-2 text-gray-700 dark:text-gray-300"
// //                 >
// //                     Suggested Appointment Time
// //                 </label>
// //                 <DatePicker
// //                     selected={watchSuggestedAppointment}
// //                     onChange={(date: Date | null) =>
// //                         setValue("suggestedAppointment", date)
// //                     }
// //                     showTimeSelect
// //                     timeIntervals={15}
// //                     dateFormat="MMMM d, yyyy h:mm aa"
// //                     className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     minDate={new Date()}
// //                     placeholderText="Select a date and time"
// //                     popperClassName="react-datepicker-popper"
// //                     calendarClassName="react-datepicker-calendar"
// //                 />
// //                 {errors.suggestedAppointment && (
// //                     <span className="text-red-500">
// //                         {errors.suggestedAppointment.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.div className="mb-4" variants={itemVariants}>
// //                 <label className="flex items-center text-gray-700 dark:text-gray-300">
// //                     <input
// //                         type="checkbox"
// //                         {...register("consentGiven", {
// //                             required: "You must give consent to proceed",
// //                         })}
// //                         className="mr-2"
// //                     />
// //                     I consent to the processing of my personal data
// //                 </label>
// //                 {errors.consentGiven && (
// //                     <span className="text-red-500">
// //                         {errors.consentGiven.message}
// //                     </span>
// //                 )}
// //             </motion.div>

// //             <motion.button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
// //                     isLoading ? "opacity-50 cursor-not-allowed" : ""
// //                 }`}
// //                 variants={itemVariants}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //             >
// //                 {isLoading ? "Submitting..." : "Submit"}
// //             </motion.button>
// //         </motion.form>
// //     );
// // };

// // export default ContactForm;

// "use client";

// import React, { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { motion } from "framer-motion";

// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     birthday: string;
//     insurance: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     pharmacy: string;
//     reason: string;
//     suggestedAppointment: Date | null;
//     consentGiven: boolean;
// }

// const ContactForm: React.FC = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         watch,
//     } = useForm<FormData>();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const watchSuggestedAppointment = watch("suggestedAppointment");

//     const onSubmit = async (data: FormData) => {
//         setIsLoading(true);
//         setError("");

//         if (!isValidAppointmentTime(data.suggestedAppointment)) {
//             setError(
//                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
//             );
//             setIsLoading(false);
//             return;
//         }

//         const formattedPhone = formatPhoneNumber(data.phone);

//         const formData = new FormData();
//         Object.entries(data).forEach(([key, value]) => {
//             if (key === "suggestedAppointment" && value) {
//                 formData.append(key, (value as Date).toISOString());
//             } else if (key === "phone") {
//                 formData.append(key, formattedPhone);
//             } else {
//                 formData.append(key, value as string);
//             }
//         });

//         if (fileInputRef.current?.files?.[0]) {
//             formData.append("pdf", fileInputRef.current.files[0]);
//         }

//         try {
//             const response = await fetch("/api/llpmg-register-patient/route", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to register patient");
//             }

//             alert(
//                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
//             );
//             Object.keys(data).forEach((key) =>
//                 setValue(key as keyof FormData, "")
//             );
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         } catch (err) {
//             setError(
//                 "An error occurred while submitting your information. Please try again."
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const isValidAppointmentTime = (date: Date | null): boolean => {
//         if (!date) return false;
//         const day = date.getDay();
//         const hours = date.getHours();
//         const isWeekday = day > 0 && day < 6;
//         const isBusinessHours = hours >= 9 && hours < 17;
//         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
//         return isWeekday && isBusinessHours && isFutureDate;
//     };

//     const formatPhoneNumber = (phone: string): string => {
//         const digitsOnly = phone.replace(/\D/g, "");
//         return `+1${digitsOnly.slice(-10)}`;
//     };

//     const containerVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 15,
//                 when: "beforeChildren",
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { type: "spring", stiffness: 100, damping: 15 },
//         },
//     };

//     return (
//         <motion.form
//             onSubmit={handleSubmit(onSubmit)}
//             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="firstName"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         First Name
//                     </label>
//                     <input
//                         id="firstName"
//                         {...register("firstName", {
//                             required: "First name is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.firstName && (
//                         <span className="text-red-500">
//                             {errors.firstName.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="lastName"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Last Name
//                     </label>
//                     <input
//                         id="lastName"
//                         {...register("lastName", {
//                             required: "Last name is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.lastName && (
//                         <span className="text-red-500">
//                             {errors.lastName.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="email"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         {...register("email", {
//                             required: "Email is required",
//                             pattern: {
//                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                 message: "Invalid email address",
//                             },
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.email && (
//                         <span className="text-red-500">
//                             {errors.email.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="phone"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Phone
//                     </label>
//                     <div className="flex">
//                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
//                             +1
//                         </span>
//                         <input
//                             id="phone"
//                             type="tel"
//                             {...register("phone", {
//                                 required: "Phone is required",
//                                 pattern: {
//                                     value: /^[2-9]\d{9}$/,
//                                     message:
//                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
//                                 },
//                             })}
//                             placeholder="1234567890"
//                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                     </div>
//                     {errors.phone && (
//                         <span className="text-red-500">
//                             {errors.phone.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="birthday"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Date of Birth
//                     </label>
//                     <input
//                         type="date"
//                         id="birthday"
//                         {...register("birthday", {
//                             required: "Date of birth is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.birthday && (
//                         <span className="text-red-500">
//                             {errors.birthday.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="insurance"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Insurance Provider
//                     </label>
//                     <select
//                         id="insurance"
//                         {...register("insurance", {
//                             required: "Insurance provider is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="" disabled>
//                             Select your insurance provider
//                         </option>
//                         <option value="IEHP">IEHP</option>
//                         <option value="Blue Cross Blue Shield">
//                             Blue Cross Blue Shield
//                         </option>
//                         <option value="UnitedHealthcare">
//                             UnitedHealthcare
//                         </option>
//                         <option value="Health Net">Health Net</option>
//                         <option value="Central Health Plan of California">
//                             Central Health Plan of California
//                         </option>
//                         <option value="Aetna">Aetna</option>
//                         <option value="Cigna">Cigna</option>
//                         <option value="Medicare">Medicare</option>
//                     </select>
//                     {errors.insurance && (
//                         <span className="text-red-500">
//                             {errors.insurance.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="address"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Address
//                     </label>
//                     <input
//                         id="address"
//                         {...register("address", {
//                             required: "Address is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.address && (
//                         <span className="text-red-500">
//                             {errors.address.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="city"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         City
//                     </label>
//                     <input
//                         id="city"
//                         {...register("city", { required: "City is required" })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.city && (
//                         <span className="text-red-500">
//                             {errors.city.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="state"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         State
//                     </label>
//                     <input
//                         id="state"
//                         {...register("state", {
//                             required: "State is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.state && (
//                         <span className="text-red-500">
//                             {errors.state.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="zipCode"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Zip Code
//                     </label>
//                     <input
//                         id="zipCode"
//                         {...register("zipCode", {
//                             required: "Zip code is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.zipCode && (
//                         <span className="text-red-500">
//                             {errors.zipCode.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="pharmacy"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Preferred Pharmacy
//                     </label>
//                     <input
//                         id="pharmacy"
//                         {...register("pharmacy", {
//                             required: "Preferred pharmacy is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.pharmacy && (
//                         <span className="text-red-500">
//                             {errors.pharmacy.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 sm:col-span-2"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="reason"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Reason for Visit
//                     </label>
//                     <textarea
//                         id="reason"
//                         {...register("reason", {
//                             required: "Reason for visit is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.reason && (
//                         <span className="text-red-500">
//                             {errors.reason.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 sm:col-span-2"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="suggestedAppointment"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Suggested Appointment Time
//                     </label>
//                     <DatePicker
//                         selected={watchSuggestedAppointment}
//                         onChange={(date: Date | null) =>
//                             setValue("suggestedAppointment", date)
//                         }
//                         showTimeSelect
//                         timeIntervals={15}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         minDate={new Date()}
//                         placeholderText="Select a date and time"
//                         popperClassName="react-datepicker-popper"
//                         calendarClassName="react-datepicker-calendar"
//                     />
//                     {errors.suggestedAppointment && (
//                         <span className="text-red-500">
//                             {errors.suggestedAppointment.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 sm:col-span-2"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="pdf"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Upload PDF Document (optional)
//                     </label>
//                     <input
//                         type="file"
//                         id="pdf"
//                         ref={fileInputRef}
//                         accept=".pdf"
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 sm:col-span-2"
//                     variants={itemVariants}
//                 >
//                     <label className="flex items-center text-gray-700 dark:text-gray-300">
//                         <input
//                             type="checkbox"
//                             {...register("consentGiven", {
//                                 required: "You must give consent to proceed",
//                             })}
//                             className="mr-2"
//                         />
//                         I consent to the processing of my personal data
//                     </label>
//                     {errors.consentGiven && (
//                         <span className="text-red-500">
//                             {errors.consentGiven.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
//                         isLoading ? "opacity-50 cursor-not-allowed" : ""
//                     } sm:col-span-2`}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     {isLoading ? "Submitting..." : "Submit"}
//                 </motion.button>
//             </div>
//         </motion.form>
//     );
// };

// export default ContactForm;

// // // import type { NextApiRequest, NextApiResponse } from "next";
// // // import { IncomingForm, File } from "formidable";
// // // import nodemailer from "nodemailer";
// // // import { renderToString } from "react-dom/server";
// // // import LLPMGEmailTemplate from "@/components/LLPMG/LLPMGEmailTemplate";
// // // import { SDK } from "@ringcentral/sdk";
// // // import ical from "ical-generator";
// // // import { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
// // // import fs from "fs/promises";
// // // import { createWriteStream } from "fs";
// // // import archiver from "archiver";
// // // import path from "path";

// // // export const config = {
// // //     api: {
// // //         bodyParser: false,
// // //     },
// // // };

// // // const rcsdk = new SDK({
// // //     server: process.env.RC_SERVER_URL,
// // //     clientId: process.env.RC_CLIENT_ID,
// // //     clientSecret: process.env.RC_CLIENT_SECRET,
// // // });

// // // const platform = rcsdk.platform();

// // // async function sendSMS(to: string | number, message: string) {
// // //     try {
// // //         await platform.login({ jwt: process.env.RC_JWT });

// // //         // Convert to string and ensure it's in E.164 format
// // //         const phoneString = String(to);
// // //         const formattedPhoneNumber = phoneString.startsWith("+1")
// // //             ? phoneString
// // //             : `+1${phoneString.replace(/\D/g, "")}`;

// // //         // Validate the formatted number
// // //         if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
// // //             throw new Error(
// // //                 `Invalid phone number format: ${formattedPhoneNumber}`
// // //             );
// // //         }

// // //         const resp = await platform.post(
// // //             "/restapi/v1.0/account/~/extension/~/sms",
// // //             {
// // //                 from: { phoneNumber: process.env.RC_PHONE_NUMBER },
// // //                 to: [{ phoneNumber: formattedPhoneNumber }],
// // //                 text: message,
// // //             }
// // //         );

// // //         return resp.json();
// // //     } catch (error) {
// // //         console.error("Error sending SMS:", error);
// // //         throw error;
// // //     }
// // // }

// // // async function compressFile(file: File): Promise<string> {
// // //     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
// // //     const output = createWriteStream(zipFilePath);
// // //     const archive = archiver("zip", { zlib: { level: 9 } });

// // //     return new Promise((resolve, reject) => {
// // //         output.on("close", () => resolve(zipFilePath));
// // //         archive.on("error", reject);
// // //         archive.pipe(output);
// // //         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
// // //         archive.finalize();
// // //     });
// // // }

// // // function formatDateTime(dateString: string): string {
// // //     const date = new Date(dateString);
// // //     return date.toLocaleString("en-US", {
// // //         weekday: "long",
// // //         year: "numeric",
// // //         month: "long",
// // //         day: "numeric",
// // //         hour: "numeric",
// // //         minute: "numeric",
// // //         hour12: true,
// // //     });
// // // }

// // // async function sendEmailWithCalendar(
// // //     transporter: nodemailer.Transporter,
// // //     to: string,
// // //     subject: string,
// // //     content: string,
// // //     calendarEvent: any,
// // //     attachments?: nodemailer.SendMailOptions["attachments"]
// // // ) {
// // //     const mailOptions: nodemailer.SendMailOptions = {
// // //         from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
// // //         to,
// // //         subject,
// // //         html: content,
// // //         attachments: [
// // //             ...(attachments || []),
// // //             {
// // //                 filename: "event.ics",
// // //                 content: calendarEvent.toString(),
// // //                 contentType: "text/calendar",
// // //             },
// // //         ],
// // //         alternatives: [
// // //             {
// // //                 contentType: "text/calendar",
// // //                 content: Buffer.from(calendarEvent.toString()),
// // //                 contentDisposition: "inline",
// // //             },
// // //         ],
// // //     };

// // //     await transporter.sendMail(mailOptions);
// // // }

// // // export default async function handler(
// // //     req: NextApiRequest,
// // //     res: NextApiResponse
// // // ) {
// // //     if (req.method !== "POST") {
// // //         return res.status(405).json({ error: "Method not allowed" });
// // //     }

// // //     try {
// // //         const form = new IncomingForm();
// // //         const [fields, files] = await new Promise<[any, any]>(
// // //             (resolve, reject) => {
// // //                 form.parse(req, (err, fields, files) => {
// // //                     if (err) reject(err);
// // //                     resolve([fields, files]);
// // //                 });
// // //             }
// // //         );

// // //         const {
// // //             firstName,
// // //             lastName,
// // //             email,
// // //             phone,
// // //             year,
// // //             month,
// // //             day,
// // //             insurance,
// // //             address,
// // //             city,
// // //             state,
// // //             zipCode,
// // //             pharmacy,
// // //             reason,
// // //             customReason,
// // //             suggestedAppointment,
// // //         } = fields;
// // //         const file = files.pdf ? files.pdf[0] : null;

// // //         const fullName = `${firstName} ${lastName}`;
// // //         const birthday = `${month}/${day}/${year}`;
// // //         const formattedAppointmentTime = formatDateTime(suggestedAppointment);
// // //         const reasonForVisit = reason === "Other" ? customReason : reason;

// // //         // Create iCal event
// // //         const calendarEvent = ical({
// // //             prodId: { company: "LLPMG", product: "Appointment" },
// // //             name: "LLPMG Appointment",
// // //         });

// // //         calendarEvent.createEvent({
// // //             start: new Date(suggestedAppointment),
// // //             end: new Date(
// // //                 new Date(suggestedAppointment).getTime() + 60 * 60 * 1000
// // //             ), // 1 hour duration
// // //             summary: `Appointment with ${fullName}`,
// // //             description: `Appointment for ${fullName}\nReason: ${reasonForVisit}`,
// // //             location: "Loma Linda Psychiatric Medical Group",
// // //             url: "https://lomalindapsych.com",
// // //             organizer: {
// // //                 name: "LLPMG",
// // //                 email: process.env.PROTONMAIL_SENDER,
// // //             },
// // //             attendees: [
// // //                 {
// // //                     name: fullName,
// // //                     email: email,
// // //                     rsvp: true,
// // //                     role: ICalAttendeeRole.REQ,
// // //                     status: ICalAttendeeStatus.NEEDSACTION,
// // //                 },
// // //             ],
// // //         });

// // //         let emailTransporter = nodemailer.createTransport({
// // //             host: process.env.PROTONMAIL_HOST,
// // //             port: Number(process.env.PROTONMAIL_PORT),
// // //             secure: false,
// // //             auth: {
// // //                 user: process.env.PROTONMAIL_SENDER,
// // //                 pass: process.env.PROTONMAIL_PASSWORD,
// // //             },
// // //             tls: {
// // //                 rejectUnauthorized: false,
// // //             },
// // //         });

// // //         const patientEmailHtml = renderToString(
// // //             LLPMGEmailTemplate({
// // //                 name: fullName,
// // //                 email,
// // //                 phone,
// // //                 birthday,
// // //                 insurance,
// // //                 address,
// // //                 city,
// // //                 state,
// // //                 zipCode,
// // //                 pharmacy,
// // //                 reason: reasonForVisit,
// // //                 suggestedAppointment: formattedAppointmentTime,
// // //                 isDoctor: false,
// // //             })
// // //         );
// // //         const doctorEmailHtml = renderToString(
// // //             LLPMGEmailTemplate({
// // //                 name: fullName,
// // //                 email,
// // //                 phone,
// // //                 birthday,
// // //                 insurance,
// // //                 address,
// // //                 city,
// // //                 state,
// // //                 zipCode,
// // //                 pharmacy,
// // //                 reason: reasonForVisit,
// // //                 suggestedAppointment: formattedAppointmentTime,
// // //                 isDoctor: true,
// // //             })
// // //         );

// // //         let fileContent, fileSize;
// // //         if (file) {
// // //             const zipFilePath = await compressFile(file);
// // //             fileContent = await fs.readFile(zipFilePath);
// // //             fileSize = fileContent.length;

// // //             const descriptiveFilename = `${firstName}_${lastName}_${Date.now()}.zip`;

// // //             console.log("Compressed file details:", {
// // //                 name: descriptiveFilename,
// // //                 size: fileSize,
// // //             });

// // //             // Send email to doctor with the attachment
// // //             await sendEmailWithCalendar(
// // //                 emailTransporter,
// // //                 process.env.PROTONMAIL_RECIPIENT!,
// // //                 `New Patient Registration Details - ${formattedAppointmentTime}`,
// // //                 doctorEmailHtml,
// // //                 calendarEvent,
// // //                 [
// // //                     {
// // //                         filename: descriptiveFilename,
// // //                         content: fileContent,
// // //                     },
// // //                 ]
// // //             );
// // //         } else {
// // //             // Send email to doctor without the attachment
// // //             await sendEmailWithCalendar(
// // //                 emailTransporter,
// // //                 process.env.PROTONMAIL_RECIPIENT!,
// // //                 `New Patient Registration Details - ${formattedAppointmentTime}`,
// // //                 doctorEmailHtml,
// // //                 calendarEvent
// // //             );
// // //         }

// // //         // Send email to patient without the attachment
// // //         await sendEmailWithCalendar(
// // //             emailTransporter,
// // //             email,
// // //             `Registration Confirmation - ${formattedAppointmentTime}`,
// // //             patientEmailHtml,
// // //             calendarEvent
// // //         );

// // //         const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion for ${formattedAppointmentTime} has been received. We will contact you soon to confirm.`;
// // //         await sendSMS(phone, smsMessage);

// // //         res.status(200).json({ message: "Registration successful" });
// // //     } catch (error) {
// // //         console.error("Error in API route:", error);
// // //         res.status(500).json({
// // //             error: "An unknown error occurred",
// // //             details: (error as Error).message,
// // //         });
// // //     }
// // // }

// // import type { NextApiRequest, NextApiResponse } from "next";
// // import { IncomingForm, File } from "formidable";
// // import nodemailer from "nodemailer";
// // import { renderToString } from "react-dom/server";
// // import LLPMGEmailTemplate from "@/components/LLPMG/LLPMGEmailTemplate";
// // import { SDK } from "@ringcentral/sdk";
// // import ical from "ical-generator";
// // import { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
// // import fs from "fs/promises";
// // import { createWriteStream } from "fs";
// // import archiver from "archiver";
// // import path from "path";

// // export const config = {
// //     api: {
// //         bodyParser: false,
// //     },
// // };

// // const rcsdk = new SDK({
// //     server: process.env.RC_SERVER_URL,
// //     clientId: process.env.RC_CLIENT_ID,
// //     clientSecret: process.env.RC_CLIENT_SECRET,
// // });

// // const platform = rcsdk.platform();

// // async function sendSMS(to: string | number, message: string) {
// //     try {
// //         await platform.login({ jwt: process.env.RC_JWT });

// //         // Convert to string and ensure it's in E.164 format
// //         const phoneString = String(to);
// //         const formattedPhoneNumber = phoneString.startsWith("+1")
// //             ? phoneString
// //             : `+1${phoneString.replace(/\D/g, "")}`;

// //         // Validate the formatted number
// //         if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
// //             throw new Error(
// //                 `Invalid phone number format: ${formattedPhoneNumber}`
// //             );
// //         }

// //         const resp = await platform.post(
// //             "/restapi/v1.0/account/~/extension/~/sms",
// //             {
// //                 from: { phoneNumber: process.env.RC_PHONE_NUMBER },
// //                 to: [{ phoneNumber: formattedPhoneNumber }],
// //                 text: message,
// //             }
// //         );

// //         return resp.json();
// //     } catch (error) {
// //         console.error("Error sending SMS:", error);
// //         throw error;
// //     }
// // }

// // async function compressFile(file: File): Promise<string> {
// //     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
// //     const output = createWriteStream(zipFilePath);
// //     const archive = archiver("zip", { zlib: { level: 9 } });

// //     return new Promise((resolve, reject) => {
// //         output.on("close", () => resolve(zipFilePath));
// //         archive.on("error", reject);
// //         archive.pipe(output);
// //         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
// //         archive.finalize();
// //     });
// // }

// // function formatDateTime(dateString: string): string {
// //     const date = new Date(dateString);
// //     return date.toLocaleString("en-US", {
// //         weekday: "long",
// //         year: "numeric",
// //         month: "long",
// //         day: "numeric",
// //         hour: "numeric",
// //         minute: "numeric",
// //         hour12: true,
// //     });
// // }

// // async function sendEmailWithCalendar(
// //     transporter: nodemailer.Transporter,
// //     to: string,
// //     subject: string,
// //     content: string,
// //     calendarEvent: any,
// //     attachments?: nodemailer.SendMailOptions["attachments"]
// // ) {
// //     const mailOptions: nodemailer.SendMailOptions = {
// //         from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
// //         to,
// //         subject,
// //         html: content,
// //         attachments: [
// //             ...(attachments || []),
// //             {
// //                 filename: "event.ics",
// //                 content: calendarEvent.toString(),
// //                 contentType: "text/calendar",
// //             },
// //         ],
// //         alternatives: [
// //             {
// //                 contentType: "text/calendar",
// //                 content: Buffer.from(calendarEvent.toString()),
// //                 contentDisposition: "inline",
// //             },
// //         ],
// //     };

// //     await transporter.sendMail(mailOptions);
// // }

// // export default async function handler(
// //     req: NextApiRequest,
// //     res: NextApiResponse
// // ) {
// //     if (req.method !== "POST") {
// //         return res.status(405).json({ error: "Method not allowed" });
// //     }

// //     try {
// //         const form = new IncomingForm();
// //         const [fields, files] = await new Promise<[any, any]>(
// //             (resolve, reject) => {
// //                 form.parse(req, (err, fields, files) => {
// //                     if (err) reject(err);
// //                     resolve([fields, files]);
// //                 });
// //             }
// //         );

// //         const {
// //             firstName,
// //             lastName,
// //             email,
// //             phone,
// //             year,
// //             month,
// //             day,
// //             insurance,
// //             address,
// //             city,
// //             state,
// //             zipCode,
// //             pharmacy,
// //             reason,
// //             customReason,
// //             suggestedAppointment,
// //         } = fields;
// //         const file = files.pdf ? files.pdf[0] : null;

// //         const fullName = `${firstName} ${lastName}`;
// //         console.log("birthday before formatting", `${month}-${day}-${year}`);
// //         const birthday = `${month}-${day}-${year}`;
// //         console.log("birthday after formatting", birthday);
// //         const formattedAppointmentTime = formatDateTime(suggestedAppointment);
// //         const reasonForVisit = reason === "Other" ? customReason : reason;

// //         // Create iCal event
// //         const calendarEvent = ical({
// //             prodId: { company: "LLPMG", product: "Appointment" },
// //             name: "LLPMG Appointment",
// //         });

// //         calendarEvent.createEvent({
// //             start: new Date(suggestedAppointment),
// //             end: new Date(
// //                 new Date(suggestedAppointment).getTime() + 60 * 60 * 1000
// //             ), // 1 hour duration
// //             summary: `Appointment with ${fullName}`,
// //             description: `Appointment for ${fullName}\nReason: ${reasonForVisit}`,
// //             location: "Loma Linda Psychiatric Medical Group",
// //             url: "https://lomalindapsych.com",
// //             organizer: {
// //                 name: "LLPMG",
// //                 email: process.env.PROTONMAIL_SENDER,
// //             },
// //             attendees: [
// //                 {
// //                     name: fullName,
// //                     email: email,
// //                     rsvp: true,
// //                     role: ICalAttendeeRole.REQ,
// //                     status: ICalAttendeeStatus.NEEDSACTION,
// //                 },
// //             ],
// //         });

// //         let emailTransporter = nodemailer.createTransport({
// //             host: process.env.PROTONMAIL_HOST,
// //             port: Number(process.env.PROTONMAIL_PORT),
// //             secure: false,
// //             auth: {
// //                 user: process.env.PROTONMAIL_SENDER,
// //                 pass: process.env.PROTONMAIL_PASSWORD,
// //             },
// //             tls: {
// //                 rejectUnauthorized: false,
// //             },
// //         });

// //         const patientEmailHtml = renderToString(
// //             LLPMGEmailTemplate({
// //                 name: fullName,
// //                 email,
// //                 phone,
// //                 birthday,
// //                 insurance,
// //                 address,
// //                 city,
// //                 state,
// //                 zipCode,
// //                 pharmacy,
// //                 reason: reasonForVisit,
// //                 suggestedAppointment: formattedAppointmentTime,
// //                 isDoctor: false,
// //             })
// //         );
// //         const doctorEmailHtml = renderToString(
// //             LLPMGEmailTemplate({
// //                 name: fullName,
// //                 email,
// //                 phone,
// //                 birthday,
// //                 insurance,
// //                 address,
// //                 city,
// //                 state,
// //                 zipCode,
// //                 pharmacy,
// //                 reason: reasonForVisit,
// //                 suggestedAppointment: formattedAppointmentTime,
// //                 isDoctor: true,
// //             })
// //         );

// //         let fileContent, fileSize;
// //         if (file) {
// //             const zipFilePath = await compressFile(file);
// //             fileContent = await fs.readFile(zipFilePath);
// //             fileSize = fileContent.length;

// //             const descriptiveFilename = `${firstName}_${lastName}_${Date.now()}.zip`;

// //             console.log("Compressed file details:", {
// //                 name: descriptiveFilename,
// //                 size: fileSize,
// //             });

// //             // Send email to doctor with the attachment
// //             await sendEmailWithCalendar(
// //                 emailTransporter,
// //                 process.env.PROTONMAIL_RECIPIENT!,
// //                 `New Patient Registration Details - ${formattedAppointmentTime}`,
// //                 doctorEmailHtml,
// //                 calendarEvent,
// //                 [
// //                     {
// //                         filename: descriptiveFilename,
// //                         content: fileContent,
// //                     },
// //                 ]
// //             );
// //         } else {
// //             // Send email to doctor without the attachment
// //             await sendEmailWithCalendar(
// //                 emailTransporter,
// //                 process.env.PROTONMAIL_RECIPIENT!,
// //                 `New Patient Registration Details - ${formattedAppointmentTime}`,
// //                 doctorEmailHtml,
// //                 calendarEvent
// //             );
// //         }

// //         // Send email to patient without the attachment
// //         await sendEmailWithCalendar(
// //             emailTransporter,
// //             email,
// //             `Registration Confirmation - ${formattedAppointmentTime}`,
// //             patientEmailHtml,
// //             calendarEvent
// //         );

// //         const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion for ${formattedAppointmentTime} has been received. We will contact you soon to confirm.`;
// //         await sendSMS(phone, smsMessage);

// //         res.status(200).json({ message: "Registration successful" });
// //     } catch (error) {
// //         console.error("Error in API route:", error);
// //         res.status(500).json({
// //             error: "An unknown error occurred",
// //             details: (error as Error).message,
// //         });
// //     }
// // }

// import type { NextApiRequest, NextApiResponse } from "next";
// import { IncomingForm, File } from "formidable";
// import nodemailer from "nodemailer";
// import { renderToString } from "react-dom/server";
// import LLPMGEmailTemplate from "@/components/LLPMG/LLPMGEmailTemplate";
// import { SDK } from "@ringcentral/sdk";
// import ical from "ical-generator";
// import { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
// import fs from "fs/promises";
// import { createWriteStream } from "fs";
// import archiver from "archiver";
// import path from "path";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const rcsdk = new SDK({
//     server: process.env.RC_SERVER_URL,
//     clientId: process.env.RC_CLIENT_ID,
//     clientSecret: process.env.RC_CLIENT_SECRET,
// });

// const platform = rcsdk.platform();

// async function sendSMS(to: string | number, message: string) {
//     try {
//         await platform.login({ jwt: process.env.RC_JWT });

//         const phoneString = String(to);
//         const formattedPhoneNumber = phoneString.startsWith("+1")
//             ? phoneString
//             : `+1${phoneString.replace(/\D/g, "")}`;

//         if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
//             throw new Error(
//                 `Invalid phone number format: ${formattedPhoneNumber}`
//             );
//         }

//         const resp = await platform.post(
//             "/restapi/v1.0/account/~/extension/~/sms",
//             {
//                 from: { phoneNumber: process.env.RC_PHONE_NUMBER },
//                 to: [{ phoneNumber: formattedPhoneNumber }],
//                 text: message,
//             }
//         );

//         return resp.json();
//     } catch (error) {
//         console.error("Error sending SMS:", error);
//         throw error;
//     }
// }

// async function compressFile(file: File): Promise<string> {
//     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
//     const output = createWriteStream(zipFilePath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     return new Promise((resolve, reject) => {
//         output.on("close", () => resolve(zipFilePath));
//         archive.on("error", reject);
//         archive.pipe(output);
//         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
//         archive.finalize();
//     });
// }

// function formatDateTime(dateString: string): string {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//     });
// }

// async function sendEmailWithCalendar(
//     transporter: nodemailer.Transporter,
//     to: string,
//     subject: string,
//     content: string,
//     calendarEvent: any,
//     attachments?: nodemailer.SendMailOptions["attachments"]
// ) {
//     const mailOptions: nodemailer.SendMailOptions = {
//         from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
//         to,
//         subject,
//         html: content,
//         attachments: [
//             ...(attachments || []),
//             {
//                 filename: "event.ics",
//                 content: calendarEvent.toString(),
//                 contentType: "text/calendar",
//             },
//         ],
//         alternatives: [
//             {
//                 contentType: "text/calendar",
//                 content: Buffer.from(calendarEvent.toString()),
//                 contentDisposition: "inline",
//             },
//         ],
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method not allowed" });
//     }

//     try {
//         const form = new IncomingForm();
//         const [fields, files] = await new Promise<[any, any]>(
//             (resolve, reject) => {
//                 form.parse(req, (err, fields, files) => {
//                     if (err) reject(err);
//                     resolve([fields, files]);
//                 });
//             }
//         );

//         const {
//             firstName,
//             lastName,
//             email,
//             phone,
//             birthday,
//             insurance,
//             address,
//             city,
//             state,
//             zipCode,
//             pharmacy,
//             reason,
//             suggestedAppointment,
//         } = fields;

//         const patientName = `${firstName} ${lastName}`.toUpperCase();
//         const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;
//         const file = files.pdf ? files.pdf[0] : null;

//         const formattedAppointmentTime = formatDateTime(suggestedAppointment);

//         const calendarEvent = ical({
//             prodId: { company: "LLPMG", product: "Appointment" },
//             name: "LLPMG Appointment",
//         });

//         calendarEvent.createEvent({
//             start: new Date(suggestedAppointment),
//             end: new Date(
//                 new Date(suggestedAppointment).getTime() + 60 * 60 * 1000
//             ),
//             summary: `Appointment with ${patientName}`,
//             description: `Appointment for ${patientName}\nReason: ${reason}`,
//             location: "Loma Linda Psychiatric Medical Group",
//             url: "https://lomalindapsych.com",
//             organizer: {
//                 name: "LLPMG",
//                 email: process.env.PROTONMAIL_SENDER,
//             },
//             attendees: [
//                 {
//                     name: patientName,
//                     email: email,
//                     rsvp: true,
//                     role: ICalAttendeeRole.REQ,
//                     status: ICalAttendeeStatus.NEEDSACTION,
//                 },
//             ],
//         });

//         let emailTransporter = nodemailer.createTransport({
//             host: process.env.PROTONMAIL_HOST,
//             port: Number(process.env.PROTONMAIL_PORT),
//             secure: false,
//             auth: {
//                 user: process.env.PROTONMAIL_SENDER,
//                 pass: process.env.PROTONMAIL_PASSWORD,
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         try {
//             await emailTransporter.verify();
//             console.log("SMTP connection verified successfully");
//         } catch (error) {
//             console.error("SMTP connection verification failed:", error);
//             throw new Error("Failed to establish SMTP connection");
//         }

//         const patientEmailHtml = renderToString(
//             LLPMGEmailTemplate({
//                 name: patientName,
//                 email,
//                 phone,
//                 birthday,
//                 insurance,
//                 address: fullAddress,
//                 pharmacy,
//                 reason,
//                 suggestedAppointment: formattedAppointmentTime,
//                 isDoctor: false,
//             })
//         );

//         const doctorEmailHtml = renderToString(
//             LLPMGEmailTemplate({
//                 name: patientName,
//                 email,
//                 phone,
//                 birthday,
//                 insurance,
//                 address: fullAddress,
//                 pharmacy,
//                 reason,
//                 suggestedAppointment: formattedAppointmentTime,
//                 isDoctor: true,
//             })
//         );

//         let fileContent, fileSize;
//         if (file) {
//             const zipFilePath = await compressFile(file);
//             fileContent = await fs.readFile(zipFilePath);
//             fileSize = fileContent.length;

//             console.log("Compressed file details:", {
//                 name: `${file.originalFilename}.zip`,
//                 size: fileSize,
//             });
//         }

//         await sendEmailWithCalendar(
//             emailTransporter,
//             email,
//             `Registration Confirmation - ${formattedAppointmentTime}`,
//             patientEmailHtml,
//             calendarEvent,
//             file
//                 ? [
//                       {
//                           filename: `${file.originalFilename}.zip`,
//                           content: fileContent,
//                       },
//                   ]
//                 : undefined
//         );

//         await sendEmailWithCalendar(
//             emailTransporter,
//             process.env.PROTONMAIL_RECIPIENT!,
//             `New Patient Registration Details - ${formattedAppointmentTime}`,
//             doctorEmailHtml,
//             calendarEvent,
//             file
//                 ? [
//                       {
//                           filename: `${file.originalFilename}.zip`,
//                           content: fileContent,
//                       },
//                   ]
//                 : undefined
//         );

//         const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion for ${formattedAppointmentTime} has been received. We will contact you soon to confirm.`;
//         await sendSMS(phone, smsMessage);

//         res.status(200).json({ message: "Registration successful" });
//     } catch (error) {
//         console.error("Error in API route:", error);
//         res.status(500).json({
//             error: "An unknown error occurred",
//             details: (error as Error).message,
//         });
//     }
// }

// "use client";

// import React, { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { motion } from "framer-motion";

// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     year: string;
//     month: string;
//     day: string;
//     insurance: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     pharmacy: string;
//     reason: string;
//     suggestedAppointment: Date | null;
//     consentGiven: boolean;
// }

// const ContactForm: React.FC = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         watch,
//     } = useForm<FormData>();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const watchSuggestedAppointment = watch("suggestedAppointment");

//     const onSubmit = async (data: FormData) => {
//         setIsLoading(true);
//         setError("");

//         const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
//         if (isNaN(birthDate.getTime())) {
//             setError("Invalid date of birth");
//             setIsLoading(false);
//             return;
//         }

//         const minAgeDate = new Date();
//         minAgeDate.setFullYear(minAgeDate.getFullYear() - 2); // Minimum age is 2 years

//         if (birthDate > minAgeDate) {
//             setError("Patient must be at least 2 years old.");
//             setIsLoading(false);
//             return;
//         }

//         if (!isValidAppointmentTime(data.suggestedAppointment)) {
//             setError(
//                 "Please select a valid appointment time (Monday-Friday, 9 AM - 5 PM, at least 48 hours in advance)."
//             );
//             setIsLoading(false);
//             return;
//         }

//         const formattedPhone = formatPhoneNumber(data.phone);

//         const formData = new FormData();
//         Object.entries(data).forEach(([key, value]) => {
//             if (key === "suggestedAppointment" && value) {
//                 formData.append(key, (value as Date).toISOString());
//             } else if (key === "phone") {
//                 formData.append(key, formattedPhone);
//             } else if (key !== "year" && key !== "month" && key !== "day") {
//                 formData.append(key, value as string);
//             }
//         });

//         formData.append("birthday", birthDate.toISOString());

//         if (fileInputRef.current?.files?.[0]) {
//             formData.append("pdf", fileInputRef.current.files[0]);
//         }

//         try {
//             const response = await fetch("/api/llpmg-register-patient/route", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to register patient");
//             }

//             alert(
//                 "Your information has been submitted successfully! Please check your email and phone for confirmation."
//             );
//             Object.keys(data).forEach((key) =>
//                 setValue(key as keyof FormData, "")
//             );
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         } catch (err) {
//             setError(
//                 "An error occurred while submitting your information. Please try again."
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const isValidAppointmentTime = (date: Date | null): boolean => {
//         if (!date) return false;
//         const day = date.getDay();
//         const hours = date.getHours();
//         const isWeekday = day > 0 && day < 6;
//         const isBusinessHours = hours >= 9 && hours < 17;
//         const isFutureDate = date > new Date(Date.now() + 48 * 60 * 60 * 1000);
//         return isWeekday && isBusinessHours && isFutureDate;
//     };

//     const formatPhoneNumber = (phone: string): string => {
//         const digitsOnly = phone.replace(/\D/g, "");
//         return `+1${digitsOnly.slice(-10)}`;
//     };

//     const containerVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 15,
//                 when: "beforeChildren",
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { type: "spring", stiffness: 100, damping: 15 },
//         },
//     };

//     return (
//         <motion.form
//             onSubmit={handleSubmit(onSubmit)}
//             className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="firstName"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         First Name
//                     </label>
//                     <input
//                         id="firstName"
//                         {...register("firstName", {
//                             required: "First name is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.firstName && (
//                         <span className="text-red-500">
//                             {errors.firstName.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="lastName"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Last Name
//                     </label>
//                     <input
//                         id="lastName"
//                         {...register("lastName", {
//                             required: "Last name is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.lastName && (
//                         <span className="text-red-500">
//                             {errors.lastName.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="email"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         {...register("email", {
//                             required: "Email is required",
//                             pattern: {
//                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                 message: "Invalid email address",
//                             },
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.email && (
//                         <span className="text-red-500">
//                             {errors.email.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="phone"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Phone
//                     </label>
//                     <div className="flex">
//                         <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
//                             +1
//                         </span>
//                         <input
//                             id="phone"
//                             type="tel"
//                             {...register("phone", {
//                                 required: "Phone is required",
//                                 pattern: {
//                                     value: /^[2-9]\d{9}$/,
//                                     message:
//                                         "Invalid phone number. Please enter 10 digits without spaces or dashes.",
//                                 },
//                             })}
//                             placeholder="1234567890"
//                             className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                     </div>
//                     {errors.phone && (
//                         <span className="text-red-500">
//                             {errors.phone.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4 col-span-3" variants={itemVariants}>
//                     <label
//                         htmlFor="year"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Date of Birth
//                     </label>
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         <select
//                             id="year"
//                             {...register("year", {
//                                 required: "Year is required",
//                             })}
//                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Year</option>
//                             {Array.from(
//                                 { length: new Date().getFullYear() - 1900 + 1 },
//                                 (_, i) => new Date().getFullYear() - i
//                             ).map((year) => (
//                                 <option key={year} value={year}>
//                                     {year}
//                                 </option>
//                             ))}
//                         </select>
//                         <select
//                             id="month"
//                             {...register("month", {
//                                 required: "Month is required",
//                             })}
//                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Month</option>
//                             {Array.from({ length: 12 }, (_, i) => i + 1).map(
//                                 (month) => (
//                                     <option key={month} value={month}>
//                                         {new Date(0, month - 1).toLocaleString(
//                                             "en-US",
//                                             { month: "long" }
//                                         )}
//                                     </option>
//                                 )
//                             )}
//                         </select>
//                         <select
//                             id="day"
//                             {...register("day", {
//                                 required: "Day is required",
//                             })}
//                             className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Day</option>
//                             {Array.from({ length: 31 }, (_, i) => i + 1).map(
//                                 (day) => (
//                                     <option key={day} value={day}>
//                                         {day}
//                                     </option>
//                                 )
//                             )}
//                         </select>
//                     </div>
//                     {(errors.year || errors.month || errors.day) && (
//                         <span className="text-red-500">
//                             Invalid date of birth
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="insurance"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Insurance Provider
//                     </label>
//                     <select
//                         id="insurance"
//                         {...register("insurance", {
//                             required: "Insurance provider is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="" disabled>
//                             Select your insurance provider
//                         </option>
//                         <option value="IEHP">IEHP</option>
//                         <option value="Blue Cross Blue Shield">
//                             Blue Cross Blue Shield
//                         </option>
//                         <option value="UnitedHealthcare">
//                             UnitedHealthcare
//                         </option>
//                         <option value="Health Net">Health Net</option>
//                         <option value="Central Health Plan of California">
//                             Central Health Plan of California
//                         </option>
//                         <option value="Aetna">Aetna</option>
//                         <option value="Cigna">Cigna</option>
//                         <option value="Medicare">Medicare</option>
//                     </select>
//                     {errors.insurance && (
//                         <span className="text-red-500">
//                             {errors.insurance.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="address"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Address
//                     </label>
//                     <input
//                         id="address"
//                         {...register("address", {
//                             required: "Address is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.address && (
//                         <span className="text-red-500">
//                             {errors.address.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="city"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         City
//                     </label>
//                     <input
//                         id="city"
//                         {...register("city", { required: "City is required" })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.city && (
//                         <span className="text-red-500">
//                             {errors.city.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="state"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         State
//                     </label>
//                     <input
//                         id="state"
//                         {...register("state", {
//                             required: "State is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.state && (
//                         <span className="text-red-500">
//                             {errors.state.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="zipCode"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Zip Code
//                     </label>
//                     <input
//                         id="zipCode"
//                         {...register("zipCode", {
//                             required: "Zip code is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.zipCode && (
//                         <span className="text-red-500">
//                             {errors.zipCode.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div className="mb-4" variants={itemVariants}>
//                     <label
//                         htmlFor="pharmacy"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Preferred Pharmacy
//                     </label>
//                     <input
//                         id="pharmacy"
//                         {...register("pharmacy", {
//                             required: "Preferred pharmacy is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.pharmacy && (
//                         <span className="text-red-500">
//                             {errors.pharmacy.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="reason"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Reason for Visit
//                     </label>
//                     <textarea
//                         id="reason"
//                         {...register("reason", {
//                             required: "Reason for visit is required",
//                         })}
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.reason && (
//                         <span className="text-red-500">
//                             {errors.reason.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="suggestedAppointment"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Suggested Appointment Time
//                     </label>
//                     <DatePicker
//                         selected={watchSuggestedAppointment}
//                         onChange={(date: Date | null) =>
//                             setValue("suggestedAppointment", date)
//                         }
//                         showTimeSelect
//                         timeIntervals={15}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         minDate={new Date()}
//                         placeholderText="Select a date and time"
//                         popperClassName="react-datepicker-popper"
//                         calendarClassName="react-datepicker-calendar"
//                     />
//                     {errors.suggestedAppointment && (
//                         <span className="text-red-500">
//                             {errors.suggestedAppointment.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label
//                         htmlFor="pdf"
//                         className="block mb-2 text-gray-700 dark:text-gray-300"
//                     >
//                         Upload PDF Document (optional)
//                     </label>
//                     <input
//                         type="file"
//                         id="pdf"
//                         ref={fileInputRef}
//                         accept=".pdf"
//                         className="w-full px-3 py-2 border rounded text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </motion.div>

//                 <motion.div
//                     className="mb-4 lg:col-span-3"
//                     variants={itemVariants}
//                 >
//                     <label className="flex items-center text-gray-700 dark:text-gray-300">
//                         <input
//                             type="checkbox"
//                             {...register("consentGiven", {
//                                 required: "You must give consent to proceed",
//                             })}
//                             className="mr-2"
//                         />
//                         I consent to the processing of my personal data
//                     </label>
//                     {errors.consentGiven && (
//                         <span className="text-red-500">
//                             {errors.consentGiven.message}
//                         </span>
//                     )}
//                 </motion.div>

//                 <motion.button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
//                         isLoading ? "opacity-50 cursor-not-allowed" : ""
//                     } lg:col-span-3`}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     {isLoading ? "Submitting..." : "Submit"}
//                 </motion.button>
//             </div>
//         </motion.form>
//     );
// };

// export default ContactForm;

// import React from "react";

// interface LLPMGEmailTemplateProps {
//     name: string;
//     email: string;
//     phone: string;
//     birthday: string;
//     insurance: string;
//     address: string;
//     pharmacy: string;
//     reason: string;
//     suggestedAppointment: string;
//     isDoctor: boolean;
// }

// const LLPMGEmailTemplate: React.FC<LLPMGEmailTemplateProps> = ({
//     name,
//     email,
//     phone,
//     birthday,
//     insurance,
//     address,
//     pharmacy,
//     reason,
//     suggestedAppointment,
//     isDoctor,
// }) => {
//     const containerStyle = {
//         fontFamily: "Arial, sans-serif",
//         color: "#494949",
//         textAlign: "center" as const,
//         padding: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//         maxWidth: "600px",
//         margin: "auto",
//     };

//     const headerStyle = {
//         backgroundColor: isDoctor ? "#0C3C60" : "#6EA4CE",
//         color: "#ffffff",
//         padding: "10px 0",
//         borderRadius: "8px 8px 0 0",
//     };

//     const contentStyle = {
//         padding: "20px",
//         textAlign: "left" as const,
//     };

//     const footerStyle = {
//         marginTop: "20px",
//         fontSize: "12px",
//         color: "#888",
//     };

//     return (
//         <div style={containerStyle}>
//             <div style={headerStyle}>
//                 <h1>
//                     {isDoctor
//                         ? "New Patient Registration"
//                         : "Registration Confirmation"}
//                 </h1>
//             </div>
//             <div style={contentStyle}>
//                 <p>
//                     {isDoctor
//                         ? `A new patient has registered. Here are the details we've received:`
//                         : `Thank you for registering with Loma Linda Psychiatric Medical Group. Here are the details we've received:`}
//                 </p>
//                 <p>
//                     <strong>Name:</strong> {name}
//                 </p>
//                 <p>
//                     <strong>Email:</strong> {email}
//                 </p>
//                 <p>
//                     <strong>Phone:</strong> {phone}
//                 </p>
//                 <p>
//                     <strong>Birthday:</strong> {birthday}
//                 </p>
//                 <p>
//                     <strong>Insurance:</strong> {insurance}
//                 </p>
//                 <p>
//                     <strong>Address:</strong>
//                     <br />
//                     {address}
//                 </p>
//                 <p>
//                     <strong>Preferred Pharmacy:</strong> {pharmacy}
//                 </p>
//                 <p>
//                     <strong>Reason for Visit:</strong> {reason}
//                 </p>
//                 <p>
//                     <strong>Suggested Appointment:</strong>{" "}
//                     {suggestedAppointment}
//                 </p>
//                 <p>
//                     {isDoctor
//                         ? "Please review the attached PDF (if any) for additional information."
//                         : "We will contact you soon to confirm your registration and provide further information."}
//                 </p>
//                 <p style={footerStyle}>
//                     If you have any questions, please contact us at{" "}
//                     <a href="mailto:llpmg@lomalindapsych.com">
//                         llpmg@lomalindapsych.com
//                     </a>{" "}
//                     or <a href="tel:9097926262">(909) 792-6262</a>.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LLPMGEmailTemplate;
