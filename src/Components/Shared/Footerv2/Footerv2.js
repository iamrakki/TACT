import React from 'react';
import './Footerv2.css';

const Footerv2 = () => {
    return (
        <section className='bg-footerv2'>
            <div className='container'>
                <div className='d-none d-lg-flex justify-content-between align-items-center'>
                    <div>
                        {/* <h4 className='footer-titleV2'>Zecurchain</h4> */}
                        <img src="/assets/images/logo.svg" alt="" className='img-fluid' />
                    </div>
                    <div className='handleTitleFv2 d-flex justify-content-center align-items-center'>
                        <h4>Privacy Policy</h4>
                        <h4>Terms of Use</h4>
                    </div>
                </div>
                <div className='row align-items-center d-md-none'>
                    <div className='col-4'>
                        <img src="./assets/images/logo.svg" alt="" className='img-fluid' />
                        {/* <h4 className='footer-titleV2'>Zecurchain</h4> */}
                    </div>
                    <div className='handleTitleFv2 col-4'>
                        <h4>Privacy Policy</h4>
                    </div>
                    <div className='handleTitleFv2 col-4'>

                        <h4>Terms of Use</h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footerv2;