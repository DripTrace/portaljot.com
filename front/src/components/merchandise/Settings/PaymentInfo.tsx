const PaymentInfo = () => {
    return (
        <>
            <h2 className="glass-form-header">Payment Information</h2>
            <h2 className="glass-form-header text-xs">
                used to collect payments from customers
            </h2>
            <div className="glass-form-row row100">
                <div className="glass-form-column col">
                    <div className="glass-form-input-container inputBox0">
                        <input
                            title="first"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                        />
                        <span className="text glass-form-text">First Name</span>
                        <span className="glass-form-line line"></span>
                    </div>
                </div>
                <div className="glass-form-column col">
                    <div className="glass-form-input-container inputBox0">
                        <input
                            title="last"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                        />
                        <span className="text glass-form-text">Last Name</span>
                        <span className="glass-form-line line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row row100">
                <div className="glass-form-column col">
                    <div className="glass-form-input-container inputBox0">
                        <input
                            title="email"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                        />
                        <span className="text glass-form-text">E-Mail</span>
                        <span className="glass-form-line line"></span>
                    </div>
                </div>
                <div className="glass-form-column col">
                    <div className="glass-form-input-container inputBox0">
                        <input
                            title="phone"
                            className="glass-form-input"
                            type="text"
                            name=""
                            required
                        />
                        <span className="text glass-form-text">
                            Phone Number
                        </span>
                        <span className="glass-form-line line"></span>
                    </div>
                </div>
            </div>
            <div className="glass-form-row row100">
                <div className="glass-form-column col">
                    <input
                        title="submit"
                        className="glass-form-submit"
                        type="submit"
                        value="send"
                    />
                </div>
            </div>
        </>
    );
};

export default PaymentInfo;
