import React from 'react';

const NotFound = () => {
    return (
        <section className='container d-flex justify-content-center align-items-center' style={{ minHeight: "90vh" }}>
            <div className='my-5 mx-auto text-center'>
                <img src="/assets/images/404.png" alt="" className='img-fluid' width={600} />
                <p style={{
                    color: "#545454",
                    textAlign: "center",
                    fontFamily: 'Saira, sans-serif',
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal"
                }} className='mb-0 pt-2'>Page Not Found</p>
            </div>
        </section>
    );
};

export default NotFound;