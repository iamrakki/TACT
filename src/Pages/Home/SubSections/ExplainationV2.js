import React, { useEffect, useState } from 'react';

const ExplainationV2 = () => {
    const [moving, setMoving] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setMoving(() => !moving)
        }, 2000);
    })

    return (
        <section className='my-5 bg-exp'>
            <div className='container my-5 pb-5'>
                <h2 className="headings" style={{ paddingTop: '50px' }}>
                    Our Featured Explanations
                </h2>
                <p
                    className="py-3  subHeading">Forging the Future of Trusted Credentials Through Blockchain and AI</p>
                <div className={`${moving ? "bg-explanation" : "bg-explanation2"}`} >
                    <img src="/assets/images/youtube_thumnail.png" alt="" className='img-fluid' data-aos="zoom-in" data-aos-delay="100"
                        data-aos-duration="1500" />

                </div>
            </div>
        </section >
    );
};

export default ExplainationV2;