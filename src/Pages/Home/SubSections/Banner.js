import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import "../../Home/Home.css";
import Header from '../../../Components/Shared/Header/Header';
import { useNavigate } from 'react-router';

const Banner = () => {
    const [count, setCount] = useState(0);
    const [animatedText, setAnimatedText] = useState("Tamper Proof");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1);
            if (count % 2 == 0) {
                setAnimatedString()
            }
        }, 3000);
    });
    function setAnimatedString() {
        if (count <= 6) {
            setAnimatedText(count == 0 ? "Tamper Proof" : count == 2 ? "Secure Proof" : "Transparent");
        }
        else {
            setCount(0);
        }
    }

    return (
        <section className="bg-banner">

            <div className="d-flex justify-content-center align-items-center mx-auto container containerHeightBg">
                <div className='d-flex justify-content-between align-items-center mx-auto pt-4 flex-column flex-lg-row' style={{ gap: '20px' }}>
                    <div className='w-100' data-aos="fade-right" data-aos-delay="50" data-aos-duration="1000">
                        <h4 className="titleDes">
                            A Blockchain Based <span style={{ color: animatedText == "Tamper Proof" ? "#F1BCAB" : animatedText == "Secure Proof" ? "#F7FFB7" : " #98F5FF" }}>{animatedText}</span> Digital Certificates
                            & Documents Storage with AI Technology
                        </h4>
                        <p style={{
                            color: '#D9D9E1',
                            fontFamily: 'Saira, sans-serif',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal',
                        }} className='pt-2'>"Revolutionizing Credential Assurance: Empowering Trust through Blockchain and AI-Generated Templates."</p>
                        <div className='d-flex justify-content-start align-items-center pt-2' style={{ gap: '33px' }}>
                            <Button variant="warning" className=' py-2 rounded-pill' onClick={() => navigate("/login")} style={{ width: '130px' }}>Sign In</Button>
                            <Button variant="outline-light" className='px-4 py-2 rounded-pill' onClick={() => navigate("/sign-up")} style={{ width: '130px' }}>Register</Button>
                        </div>
                    </div>
                    <div className='w-100' data-aos="fade-left" data-aos-delay="50" data-aos-duration="1000">
                        <img src="/assets/images/web-preview.png" alt="" className='img-fluid' />
                    </div>
                </div>

            </div>
            <div className='coverDiv'>
                <div className="marquee-container">
                    <div className="product-modules marquee-content">
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 4; i++) {
                                contents.push(
                                    <div className="product-modules-details">
                                        <img
                                            className="rounded-circle"
                                            alt=''
                                            style={{
                                                backgroundColor:
                                                    i == 0
                                                        ? "#38EBFF"
                                                        : i == 1
                                                            ? "#7282E1"
                                                            : i == 2
                                                                ? "#F25623"
                                                                : "#EF5BA1",
                                                padding: 8,
                                            }}
                                            src={
                                                i == 0
                                                    ? "/assets/images/blockchain-mini-logo.png"
                                                    : i == 1
                                                        ? "/assets/images/AI-theme-generator.png"
                                                        : i == 2
                                                            ? "/assets/images/certificate-gentr.png"
                                                            : "/assets/images/doc-uploader.png"
                                            }
                                        ></img>
                                        <div style={{ marginLeft: 10 }}>
                                            {i == 0
                                                ? "Public Blockchain"
                                                : i == 1
                                                    ? "AI Theme Generator"
                                                    : i == 2
                                                        ? "Certificate Creation"
                                                        : "Document Uploader"}
                                        </div>
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Banner;