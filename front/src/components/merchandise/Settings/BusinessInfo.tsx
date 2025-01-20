"use client";

interface FormData {
    mcc: string;
    url: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    dob: string;
    ssnLast4: string;
    line1: string;
    postalCode: string;
    city: string;
    state: string;
}

interface BusinessInfoProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({
    formData,
    setFormData,
}) => {
    return (
        <>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="date"
                            className="glass-form-input"
                            type="date"
                            name=""
                            required
                            value={formData.dob}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    dob: e.target.value,
                                }));
                            }}
                        />
                        <span className="glass-form-text leading-none">
                            Date Of Birth
                        </span>
                        <span className="glass-form-line line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row">
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="ssn"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.ssnLast4}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    ssnLast4: e.target.value,
                                }));
                            }}
                            maxLength={4}
                            minLength={4}
                        />
                        <span className="glass-form-text">
                            Last 4 Digits of SSN
                        </span>
                        <span className="glass-form-line line"></span>
                    </div>
                </div>
                <div className="glass-form-column">
                    <div className="glass-form-input-container">
                        <input
                            title="phone"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                            value={formData.phone}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    phone: e.target.value,
                                }));
                            }}
                        />
                        <span className="glass-form-text">Phone Number</span>
                        <span className="glass-form-line"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessInfo;
