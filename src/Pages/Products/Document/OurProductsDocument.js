import { React, useState } from "react";
import "./OurProductsDocument.css";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Header from "../../../Components/Shared/Headerv2/Headerv2";
import { useNavigate } from "react-router-dom";
const OurProductsDocument = () => {
    const [hoverColor1, getHoverColor1] = useState("black");
    const [hoverColor2, getHoverColor2] = useState("black");
    const [hoverColor3, getHoverColor3] = useState("black");
    const navigate = useNavigate();
    function setHoverColors(index) {
        index == 1
            ? getHoverColor1("white")
            : index == 2
                ? getHoverColor2("white")
                : getHoverColor3("white");
    }
    function revertHoverColors(index) {
        index == 1
            ? getHoverColor1("black")
            : index == 2
                ? getHoverColor2("black")
                : getHoverColor3("black");
    }
    return (
        <section className='overflow-hidden'>
            <Helmet>
                <title>Zecurechain | Blockchain Powered Digital Documents</title>
                <meta name="description" content="ZecureChain transforms digital documents into verifiable proofs using blockchain technology, encouraging trust in education and employment processes." />
            </Helmet>
            <div className='container'>
                <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row flex-handle-content">
                    <div className='w-100'>
                        <div className="content">
                            <h2>Documents</h2>
                            <h1>Product That Offers Storing Of Digital Documents On Blockchain For All.</h1>
                            <h3>Public blockchain technology to securely store and validate Documents.</h3>
                        </div>

                        <div className=' mt-4 text-center text-lg-start'>
                            <Button variant='warning' className='px-4 py-2 rounded-pill' onClick={() => navigate("/contact-us")}>Get In Touch</Button>
                        </div>
                    </div>
                    <div className='w-100 text-center text-lg-end '>
                        <img src="/assets/images/documentV3.png" alt="" className='img-fluid ' />
                    </div>
                </div>

                <div className="top2 mt-4">
                    <h2 className='titleOfCentral'>Why Documents on Blockchain</h2>
                    <p className="pt-2  subHeading d-flex-center-center">
                        <span>A Blockchain + AI Based Product Made For Super-easy & Time-saving on</span> <h2 className="mb-0" style={{ fontSize: '18px' }}>Digital Certificate</h2> <span>Creation and Storage.</span>
                    </p>

                    <div className="content1">

                        <div className="custom-style" onMouseEnter={() => setHoverColors(1)} onMouseOut={() => revertHoverColors(1)} data-aos="fade-right" data-aos-delay="50" data-aos-duration="2000">
                            <h4 style={{ color: hoverColor1 }} onMouseEnter={() => setHoverColors(1)}>Power Of Blockchain</h4>
                            <p onMouseEnter={() => setHoverColors(1)} style={{ color: hoverColor1 }}>Documents stored on the blockchain harness the capabilities of technology to transform the creation, management, & verification of various types of documents. By recording document on a decentralized and immutable ledger, they bring forth numerous benefits. Foremost, it significantly bolster security by guaranteeing that remain impervious to tampering or counterfeiting.</p>
                        </div>
                        <div className="custom-style" onMouseEnter={() => setHoverColors(2)} onMouseOut={() => revertHoverColors(2)} data-aos="fade-up" data-aos-delay="50" data-aos-duration="2000">
                            <h4 style={{ color: hoverColor2 }} onMouseEnter={() => setHoverColors(2)}>Transparency & Trust</h4>
                            <p onMouseEnter={() => setHoverColors(2)} style={{ color: hoverColor2 }}>It offer transparency and trust by enabling anyone to independently verify the authenticity of a document without the necessity of a central authority's involvement. Moreover, documents on the blockchain provide real-time verification. They also optimize document management, diminishing administrative expenses and easing the process of transferring ownership.</p>
                        </div>
                        <div className="custom-style" onMouseEnter={() => setHoverColors(3)} onMouseOut={() => revertHoverColors(3)} data-aos="fade-left" data-aos-delay="50" data-aos-duration="2000">
                            <h4 style={{ color: hoverColor3 }} onMouseEnter={() => setHoverColors(3)}>Secure Solution</h4>
                            <p onMouseEnter={() => setHoverColors(3)} style={{ color: hoverColor3 }}>It present a secure solution by allowing individuals to autonomously confirm the legitimacy of a document. Furthermore, documents stored on the blockchain provide instantaneous validation, eradicating the need for time-intensive manual protocols. Additionally, they simplify document administration, curbing administrative costs and simplifying the handover of ownership.</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto text-center">
                    <img src="./assets/images/documentPosterV3.png" alt="" className='img-fluid w-75' />
                </div>

                <h2 className='titleOfCentral addSome pt-5'>Competitive Pricing Without Compromising Quality</h2>
                <div className='last pb-5 '>
                    {/* <img src="/assets/images/glowing-star.png" alt="" /> */}

                    <div>
                        <p className='py-3'>At Zecurechain, we take pride in offering competitive pricing<br /> that doesn't compromise on quality.
                            Whether you're a small <br />business or a large enterprise, our flexible pricing options<br /> cater to all budgets.</p>

                        <div className=' mt-3'>
                            <Button variant='warning' className='px-4 py-2 rounded-pill' onClick={() => navigate("/Pricing")}>Pricing</Button>
                        </div>
                    </div>
                </div>


                {/* <h2 className='titleOfCentral addSome pt-5'>Competitive Pricing Without Compromising Quality</h2>
                <div className='last pb-5 d-flex align-items-start justify-content-between flex-column flex-lg-row'>
                    <img src="/assets/images/glowing-star.png" alt="" />

                    <div>
                        <p className='py-3'>At Zecurechain, we take pride in offering competitive pricing<br /> that doesn't compromise on quality.
                            Whether you're a small <br />business or a large enterprise, our flexible pricing options<br /> cater to all budgets.</p>

                        <div className=' mt-3'>
                            <Button variant='warning' className='px-4 py-2 rounded-pill' onClick={() => navigate("/pricing")}>pricing</Button>
                        </div>
                    </div>


                    <img
                        src="/assets/images/glowing-star.png"
                        style={{ marginTop: "10%" }}
                        alt="" className='reduceMarginForSm' />
                </div> */}
            </div>
        </section>
    );
};

export default OurProductsDocument;
