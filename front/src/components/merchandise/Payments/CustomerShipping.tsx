"use client";

import { useRef, FormEvent } from "react";

interface CustomerShippingProps {
    onSubmitValidation: (data: {
        first_name: string;
        last_name: string;
        line1: string;
        postal_code: string;
        city: string;
        state: string;
        email: string;
        phone: string;
    }) => void;
}

function CustomerShipping(props: CustomerShippingProps) {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const line1Ref = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    function submitHandler(event: FormEvent) {
        event.preventDefault();

        const enteredFirstName = firstNameRef.current?.value || "";
        const enteredLastName = lastNameRef.current?.value || "";
        const enteredLine1 = line1Ref.current?.value || "";
        const enteredPostalCode = postalCodeRef.current?.value || "";
        const enteredCity = cityRef.current?.value || "";
        const enteredState = stateRef.current?.value || "";
        const enteredEmail = emailRef.current?.value || "";
        const enteredPhone = phoneRef.current?.value || "";

        props.onSubmitValidation({
            first_name: enteredFirstName,
            last_name: enteredLastName,
            line1: enteredLine1,
            postal_code: enteredPostalCode,
            city: enteredCity,
            state: enteredState,
            email: enteredEmail,
            phone: enteredPhone,
        });
    }

    return (
        <form onSubmit={submitHandler} className="max-h-96 overflow-y-scroll">
            <div className="inputBox">
                <label htmlFor="first-name">Your First Name</label>
                <input
                    className="input border-bottom-right-glass"
                    type="text"
                    placeholder="first name"
                    id="first-name"
                    required
                    ref={firstNameRef}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="last-name">Your Last Name</label>
                <input
                    className="input border-bottom-right-glass"
                    type="text"
                    placeholder="last name"
                    id="last-name"
                    required
                    ref={lastNameRef}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="line1">Street Address</label>
                <input
                    className="input border-bottom-right-glass"
                    type="text"
                    placeholder="Street Address"
                    id="line1"
                    required
                    ref={line1Ref}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="postal-code">Postal Code</label>
                <input
                    className="input border-bottom-right-glass"
                    type="number"
                    placeholder="postal code"
                    id="postal-code"
                    required
                    ref={postalCodeRef}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="city">City</label>
                <input
                    className="input border-bottom-right-glass"
                    type="text"
                    placeholder="city"
                    id="city"
                    required
                    ref={cityRef}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="state">State</label>
                <input
                    className="input border-bottom-right-glass"
                    type="text"
                    placeholder="state"
                    id="state"
                    required
                    ref={stateRef}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="email">Your E-Mail</label>
                <input
                    className="input border-bottom-right-glass"
                    type="email"
                    placeholder="email"
                    id="email"
                    required
                    ref={emailRef}
                />
            </div>
            <div className="inputBox">
                <label htmlFor="phone">Your Phone Number</label>
                <input
                    className="input border-bottom-right-glass"
                    type="number"
                    placeholder="phone number"
                    id="phone"
                    required
                    ref={phoneRef}
                />
            </div>

            <div className="inputBox">
                <input
                    className="input border-bottom-right-glass text-[#666] bg-white max-w-[200px] cursor-pointer mb-[20px] font-semibold"
                    type="submit"
                    value="Submit Validation"
                />
            </div>
        </form>
    );
}

export default CustomerShipping;
