"use client";
import React from "react";

interface BankFormData {
    bankName: string;
    currency: string;
    routing_number: string;
    account_number: string;
}

interface BanksProps {
    formData: BankFormData;
    setFormData: React.Dispatch<React.SetStateAction<BankFormData>>;
}

const Banks: React.FC<BanksProps> = ({ formData, setFormData }) => {
    return (
        <>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="bank input"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.bankName}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    bankName: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">
                            Bank Account Name
                        </span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="bank routing"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.routing_number}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    routing_number: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Routing Number</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="bank account"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.account_number}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    account_number: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Account Number</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banks;
