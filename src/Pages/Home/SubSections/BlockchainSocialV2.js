import React, { useState } from 'react';

const fakeDB = [
    { id: 1, title: "Problem", desc: "Paper documents can be easily misplaced, damaged, or destroyed, resulting in permanent loss of valuable information. Traditional certificate and document storage methods are prone to the risk of loss.  This poses significant inconveniences, delays, and potential legal complications. Finding more secure storage solutions is crucial to mitigate these risks.", pic: "/assets/images/Isolation_Mode.png", bgPic: "/assets/images/Rectangle-1.png" },
    { id: 2, title: "Solution", desc: "Blockchain technology offers highly secure, transparent, and convenient storage solutions for certificates and documents. It empowers individuals with full control over their information, prevents forgery, eliminates the need for third-party intermediaries, ensures data integrity and accessibility, fosters trust in document and identity management, and promotes an environmentally friendly approach with zero paper usage.", pic: "/assets/images/Illustration.png", bgPic: "/assets/images/Rectangle-2.png" },
    { id: 3, title: "Impact", desc: "Blockchain technology solutions effectively prevent fraud on documents and certificates. The immutable nature of blockchain records and the decentralized nature make it extremely difficult for malicious actors to tamper with or forge documents. This helps protect individuals from identity theft and safeguards the integrity of records. Blockchain contributes to a more secure and transparent society to individuals for validity of their personal and official records.", pic: "/assets/images/social-impact.png", bgPic: "/assets/images/Rectangle-3.png" },
]
const BlockchainSocialV2 = () => {

    const [selectedId, setSelectedId] = useState(1);

    const changeId = async (ID) => {
        setSelectedId(() => ID);
    }
    console.log(selectedId);
    return (
        <section className='my-5'>
            <h2 className="headings ">Blockchain for Social Impact</h2>
            <h2 className='pt-2 pb-0 spaceExtra  subHeading'>Building Futures, One Block at a Time: Blockchain's Social Impact through Digital Credentials</h2>
            <div className='container my-5'>
                <div className='d-flex justify-content-center align-items-start flex-column flex-lg-row'>

                    <div className='spaceIssue d-flex flex-row flex-lg-column'>
                        {fakeDB?.map(data => <div key={data?.id} className={`${selectedId === data?.id ? 'handleMenuBSocial' : 'handleMenuBSocial2'}`} onClick={() => changeId(data?.id)}><p>{data?.title}</p></div>)}
                    </div>
                    <div className='position-relative'>
                        {fakeDB?.map(data => <div key={data?.id} className={` ${selectedId === data?.id ? 'd-block' : 'd-none'}`}> <div className={`box-div-BSocial ${selectedId === data?.id ? 'd-flex justify-content-between align-items-start flex-column flex-lg-row' : 'd-none'}`} style={{
                            backgroundColor:
                                selectedId === 1
                                    ? "#dcf1ff"
                                    : selectedId === 2
                                        ? "#BCFFCF"
                                        : "#F3FE9D",
                        }}>
                            <p>{data?.desc}</p>
                            <img src={data?.pic} alt="" className='img-fluid' width={300} />
                        </div>
                            {
                                fakeDB.map(data => <img src={data?.bgPic} key={data?.id} alt="" className={`img-fluid handleImgBSocial ${selectedId === data?.id ? 'd-block' : 'd-none'}`} />)
                            }

                        </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BlockchainSocialV2;