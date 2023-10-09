import React from 'react';
import './Gifloader.css';

const Gifloader = ({ name }) => {
    return (
        <section className="container">
            <div className="text-center">
                <img alt="" src="/assets/images/loader.gif" />
                <div>Do Not Exit Window, {name} Issuing on blockchain </div>
            </div>
        </section>
    );
};

export default Gifloader;