import React from 'react';
import './Headerv2.css';
import { useNavigate } from 'react-router-dom';

const Headerv2 = () => {
    const navigate = useNavigate();
    return (
        <section className='bg-headerv2'>
            <div className='container'>
                <img src="./assets/images/logo.png" alt="" className='img-fluid' onClick={() => navigate("/")} style={{ cursor: 'pointer' }} />
            </div>
        </section>
    );
};

export default Headerv2;