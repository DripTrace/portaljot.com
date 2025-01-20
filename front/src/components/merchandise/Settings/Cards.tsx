"use client";

import React from "react";

interface CardFormData {
    cardName: string;
    number: string;
    exp_month_year: string;
    cvc: string;
}

interface CardsProps {
    formData: CardFormData;
    setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
}

const Cards: React.FC<CardsProps> = ({ formData, setFormData }) => {
    return (
        <>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="card"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.cardName}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    cardName: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Card Name</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="number"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.number}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    number: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Card Number</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="exp"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.exp_month_year}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    exp_month_year: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">Exp Month/Year</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="cvc"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.cvc}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    cvc: e.target.value,
                                });
                            }}
                        />
                        <span className="glass-form-text">CVC</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cards;
