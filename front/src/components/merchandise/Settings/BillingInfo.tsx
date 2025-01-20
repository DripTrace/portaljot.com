"use client";

import React from "react";

interface BillingInfoProps {
    formData: {
        line1: string;
        postalCode: string;
        city: string;
        state: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            line1: string;
            postalCode: string;
            city: string;
            state: string;
        }>
    >;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ formData, setFormData }) => {
    return (
        <>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            className="glass-form-input"
                            type="text"
                            name="line1"
                            title="Street Address"
                            placeholder="Street Address"
                            required
                            value={formData.line1}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    line1: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Street Address</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            className="glass-form-input"
                            type="number"
                            name="postalCode"
                            title="Postal Code"
                            placeholder="Postal Code"
                            required
                            value={formData.postalCode}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    postalCode: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Postal Code</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            className="glass-form-input"
                            type="text"
                            name="city"
                            title="City"
                            placeholder="City"
                            required
                            value={formData.city}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    city: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">City</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            className="glass-form-input"
                            type="text"
                            name="state"
                            title="State"
                            placeholder="State"
                            required
                            value={formData.state}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    state: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">State</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BillingInfo;
