import { React, useState } from 'react';
import './OurProductsCertificate.css';
import { Button } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import Header from "../../../Components/Shared/Headerv2/Headerv2";
import { useNavigate } from 'react-router-dom';

const OurProductsCertificate = () => {
    const [hoverColor1, getHoverColor1] = useState("black");
    const [hoverColor2, getHoverColor2] = useState("black");
    const [hoverColor3, getHoverColor3] = useState("black");
    const navigate = useNavigate();
    function setHoverColors(index) {
        index == 1 ? getHoverColor1("white") : index == 2 ? getHoverColor2("white") : getHoverColor3("white");
    }
    function revertHoverColors(index) {
        index == 1 ? getHoverColor1("black") : index == 2 ? getHoverColor2("black") : getHoverColor3("black");
    }
    return (
        <section className='overflow-hidden'>
            <Helmet>
                <title>Zecurechain | 100% Tamperproof Digital Certificates & Credentials</title>
                <meta name="description" content="Transition your physical certificates into digital credentials using blockchain technology to issue 100% tamper-proof Digital Certificates and credentials." />
            </Helmet>
            <div className='container'>
                <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row flex-handle-content">
                    <div className='w-100'>
                        <div className="content">
                            <h2>Certificates</h2>
                            <p>Product That Offers Creation & Issuance Of Certificates On Blockchain For All.</p>
                            <h3>Public blockchain technology to securely store and validate certificates.</h3>
                        </div>

                        <div className=' mt-4 text-center text-lg-start'>
                            <Button variant='warning' className='px-4 py-2 rounded-pill' onClick={() => navigate("/contact-us")}>Get In Touch</Button>
                        </div>
                    </div>
                    <div className='w-100 text-center text-lg-end '>
                        <img src="/assets/images/top.png" alt="" className='img-fluid ' />
                    </div>
                </div>

                <div className="top2 mt-4">
                    <h2 className='titleOfCentral'>Why Certificates on Blockchain</h2>

                    <p className="pt-3  subHeading d-flex-center-center">
                        <span>A Blockchain + AI Based Product Made For Super-easy & Time-saving on</span> <h1 className="mb-0" style={{ fontSize: '18px' }}>Digital Certificate</h1> <span>Creation and Storage.</span>
                    </p>
                    <div className="content1">

                        <div className="custom-style" onMouseEnter={() => setHoverColors(1)} onMouseOut={() => revertHoverColors(1)} data-aos="fade-right" data-aos-delay="50" data-aos-duration="2000">
                            <h4 style={{ color: hoverColor1 }} onMouseEnter={() => setHoverColors(1)}>Power Of Blockchain</h4>
                            <p onMouseEnter={() => setHoverColors(1)} style={{ color: hoverColor1 }}>Certificates on the blockchain leverage the power of blockchain technology to revolutionize
                                the way certificates are created, managed, and verified.
                                By storing certificate data on a decentralized and tamper-proof blockchain ledger, they offer several advantages.
                                Firstly, they enhance security by ensuring that certificates cannot be altered or falsified along with Immutable trust without intermediaries.</p>
                        </div>
                        <div className="custom-style" onMouseEnter={() => setHoverColors(2)} onMouseOut={() => revertHoverColors(2)} data-aos="fade-up" data-aos-delay="50" data-aos-duration="2000">
                            <h4 style={{ color: hoverColor2 }} onMouseEnter={() => setHoverColors(2)}>Transparency & Trust</h4>
                            <p onMouseEnter={() => setHoverColors(2)} style={{ color: hoverColor2 }}>Secondly, they provide transparency and trust by enabling anyone to independently verify
                                the authenticity of a certificate without relying on a central authority. Additionally,
                                certificates on the blockchain offer real-time verification, eliminating the need for time-consuming manual processes.
                                They also streamline credential management, reducing administrative costs and simplifying the transfer of ownership.</p>
                        </div>
                        <div className="custom-style" onMouseEnter={() => setHoverColors(3)} onMouseOut={() => revertHoverColors(3)} data-aos="fade-left" data-aos-delay="50" data-aos-duration="2000">
                            <h4 style={{ color: hoverColor3 }} onMouseEnter={() => setHoverColors(3)}>Secure Solution</h4>
                            <p onMouseEnter={() => setHoverColors(3)} style={{ color: hoverColor3 }}>Overall, certificates on the blockchain offer a modern, efficient, and secure solution for
                                managing and validating certificates in various domains, including education, professional certifications, and more. The immutability and decentralized nature ensures trust and transparency in credential verification. Additionally,It minimizes the risk of fraud and unauthorized alterations.</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto text-center">
                    <img src="./assets/images/lastv3.png" alt="" className='img-fluid w-75' />
                </div>

                <h2 className='titleOfCentral addSome pt-5'>Competitive Pricing Without Compromising Quality</h2>
                <div className='last pb-5 d-flex align-items-start justify-content-between flex-column flex-lg-row'>
                    <img src="/assets/images/glowing-star.png" alt="" />

                    <div>
                        <p className='py-3'>At Zecurechain, we take pride in offering competitive pricing<br /> that doesn't compromise on quality.
                            Whether you're a small <br />business or a large enterprise, our flexible pricing options<br /> cater to all budgets.</p>

                        <div className=' mt-3'>
                            <Button variant='warning' className='px-4 py-2 rounded-pill' onClick={() => navigate("/Pricing")}>Pricing</Button>
                        </div>
                    </div>


                    <img
                        src="/assets/images/glowing-star.png"
                        style={{ marginTop: "10%" }}
                        alt="" className='reduceMarginForSm' />
                </div>
            </div>
        </section>
    );
};

export default OurProductsCertificate;