import React from 'react';

const Recognised = () => {
    return (
        <section>
            <div className='container mb-3'>
                <div className='d-flex justify-content-center align-items-start border-dancing ' style={{ gap: "10px" }}>
                    <div>
                        <h2 className="headings my-0 py-0 respoFont">
                            Recognised By
                        </h2>
                    </div>
                    <div>
                        <img src="/assets/images/certificateOfUniticpng.png" alt="" className='img-fluid respoImg' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recognised;