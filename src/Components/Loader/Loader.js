import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className='d-flex justify-content-center align-items-start pb-4'>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default Loader;