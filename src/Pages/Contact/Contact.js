import React, { useState } from "react";
import "./Contact.css";
import { Button } from "react-bootstrap";
import Header from "../../Components/Shared/Headerv2/Headerv2";
const Contact = () => {
    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        enquiryType: "", // New state for the enquiry type
    });

    const [inputFocus, setInputFocus] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        message: false,
        enquiryType: false, // New state for the enquiry type
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));
    };

    const handleInputFocus = (event) => {
        const { name } = event.target;
        setInputFocus((prevInputFocus) => ({
            ...prevInputFocus,
            [name]: true,
        }));
    };

    const handleInputBlur = (event) => {
        const { name } = event.target;
        setInputFocus((prevInputFocus) => ({
            ...prevInputFocus,
            [name]: inputValues[name] !== "",
        }));
    };
    return (
        <section style={{ minHeight: '80vh' }}>
            <div className="container mt-4">
                <h4 className="titleOfCentral mt-5">Contact Us</h4>
                <div className="sub-title-text mt-2">
                    Connecting the Future, Empowering Through Blockchain Technology
                </div>
                <div className="form-contact mb-5 mt-5">
                    <div className="contact-info">
                        <h3 className="title">Contact - Information</h3>
                        <p className="text">
                            Fill up the form, and our team will get back to you within 24
                            hours.
                        </p>

                        <div className="info">
                            <div className="d-flex justify-content-start align-items-center " style={{ gap: '10px' }}>
                                <img src="/assets/images/Phone.png" alt="" className="img-fluid " width={20} />
                                <a href="tel:+919551778844" target="_blank" rel="noreferrer" className="contact-text">+91 9551778844</a>
                            </div>
                            <div className="d-flex justify-content-start align-items-center" style={{ gap: '10px' }}>
                                <img src="/assets/images/mail.png" alt="" className="img-fluid " width={20} />
                                <a href="mailto:support@zecurechain.com" target="_blank" rel="noreferrer" className="contact-text" >support@zecurechain.com</a>
                            </div>
                            <div className="d-flex justify-content-start align-items-center" style={{ gap: '10px' }}>
                                <img src="/assets/images/Map.png" alt="" className="img-fluid " width={20} />
                                <p className="mb-0 contact-text">
                                    No: 7, 1st floor, 48th street, 9th Avenue, Ashok Nagar,
                                    Chennai - 83
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            autoComplete="off"
                            className="form-contactV2"
                        >
                            <div
                                className={`input-container ${inputFocus.firstName ? "focus" : ""
                                    }`}
                            >
                                <div className="input-subcontainer">
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="input-contact"
                                        value={inputValues.firstName}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                    />
                                    <label>First Name</label>
                                    <span>First Name</span>
                                </div>
                            </div>

                            <div
                                className={`input-container ${inputFocus.lastName ? "focus" : ""
                                    }`}
                            >
                                <div className="input-subcontainer">
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="input-contact"
                                        value={inputValues.lastName}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                    />
                                    <label>Last Name</label>
                                    <span>Last Name</span>
                                </div>
                            </div>

                            <div
                                className={`input-container ${inputFocus.email ? "focus" : ""}`}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    className="input-contact"
                                    value={inputValues.email}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                                <label>Email</label>
                                <span>Email</span>
                            </div>

                            <div
                                className={`input-container ${inputFocus.phone ? "focus" : ""}`}
                            >
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input-contact"
                                    value={inputValues.phone}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                                <label>Phone</label>
                                <span>Phone</span>
                            </div>

                            <div className="head">
                                <label>What you want to Enquiry:</label>
                            </div>

                            <div
                                className={`input-container enquiry ${inputFocus.enquiryType ? "focus" : ""
                                    }`}
                            >
                                <div className="input-subcontainer">
                                    <div className="enquiry-options">
                                        <input
                                            type="radio"
                                            id="enquiry-certificate"
                                            name="enquiryType"
                                            value="Certificate"
                                            className="input-contact"
                                            checked={inputValues.enquiryType === "Certificate"}
                                            onChange={handleInputChange}
                                        />
                                        Certificate
                                        {/* <label htmlFor="enquiry-certificate"></label> */}
                                        <div style={{ marginLeft: 15 }}></div>
                                        <input
                                            type="radio"
                                            id="enquiry-document"
                                            name="enquiryType"
                                            value="Document"
                                            className="input-contact"
                                            checked={inputValues.enquiryType === "Document"}
                                            onChange={handleInputChange}
                                        />
                                        Document
                                        {/* <label htmlFor="enquiry-document"></label> */}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`input-container textarea ${inputFocus.message ? "focus" : ""
                                    }`}
                            >
                                <textarea
                                    name="message"
                                    className="input-contact"
                                    value={inputValues.message}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                ></textarea>
                                <label>Message</label>
                                <span>Message</span>
                            </div>
                            <Button
                                variant="warning"
                                className="p-20 rounded-pill btn-contact"
                                style={{ fontSize: '16px' }}
                                type="submit"
                            >
                                {" "}
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
