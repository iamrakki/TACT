import React from 'react';
import './DashboardDocuments.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DashboardDocuments = ({ name, size, date, id }) => {
    const navigate = useNavigate();


    function shortenFileName(fileName, maxLength) {
        if (fileName.length <= maxLength) {
            return fileName;
        } else {
            const extIndex = fileName.lastIndexOf('.');
            const ext = fileName.slice(extIndex);
            const truncatedFileName = fileName.slice(0, maxLength - ext.length - 4); // -4 to account for the dots and "..."
            return truncatedFileName + '...' + ext;
        }
    }
    const formatDateToCustomFormat = (inputDate) => {
        const optionsTime = {
            hour12: false, // Use 24-hour format
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const optionsDate = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };

        const date = new Date(inputDate);

        // Get the formatted time string
        const timeString = date.toLocaleTimeString(navigator.language, optionsTime);

        // Get the formatted date string
        const dateArray = date.toLocaleDateString(navigator.language, optionsDate).split('/');
        const formattedDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;

        return `${timeString}, ${formattedDate}`;
    }
    return (
        <div className='row  gy-5 mb-2  pt-3' key={id} onClick={() => navigate(`/dashboard/dashboard-document-details/${id}`)} style={{ cursor: 'pointer' }}>
            <div className='col-4'>

                <div className='d-flex justify-content-start align-items-center' style={{ gap: '10px' }}>
                    <img src="/assets/images/documentV2.svg" alt="" className='img-fluid' />
                    <p className='mb-0 handleDocsText'>{shortenFileName(name, 15)}</p>
                </div>
            </div>
            <div className='col-4 d-flex justify-content-start align-items-center'>
                <p className='mb-0 handleDocsText'>{size}</p>
            </div>
            <div className='col-4 d-flex justify-content-start align-items-center'>
                <p className='mb-0 handleDocsText'>{formatDateToCustomFormat(date)}</p>
            </div>


            {/* <section className='d-flex justify-content-center align-items-start' style={{ minHeight: '60vh' }}>
<div className='mx-auto text-center d-none'>
    <img src="/assets/images/emptyC.png" alt="" className='img-fluid w-75' />
    <p className='pt-4' style={{
        color: '#5B5B5B',
        fontFamily: 'Lexend',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
    }}>No Documents found on your Account</p>
    <Button variant="warning" className='rounded-pill px-4 py-2'>+ Drop New Documents</Button>
</div>

<div className='container'>
    <div className='d-flex justify-content-between align-items-center'>
        <h4 className='dTitle mb-0'>My Documents</h4>
        <Button variant="warning" className='rounded-pill px-4 py-2' onClick={() => navigate("test")}>+ Add New Documents</Button>
    </div>

    <div className='row gx-3 gy-5 my-2'>
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 '>
            <div className='cardDocsFolder' onClick={() => navigate("/dashboard/dashboard-document-details/test")}>
                <img src="/assets/images/docs.png" alt="" className='img-fluid' />
                <p className='mb-0 mt-2'>school Certificates</p>
            </div>
        </div>
    </div>
    <h4 className='dTitle mb-4 mt-5'>Open Path</h4>
    <div className='row  gy-5 mb-2'>
        <div className='col-4'>
            <div className='d-flex justify-content-start align-items-center' style={{ gap: '15px' }}>
                <div>
                    <img src="/assets/images/docs2.png" alt="" className='img-fluid' />
                </div>
                <div>
                    <p className='mb-0 handleDocsText'>College Certificates</p>
                </div>
            </div>
        </div>
        <div className='col-4'>
            <p className='mb-0 handleDocsText'>34 MB</p>
        </div>
        <div className='col-4'>
            <p className='mb-0 handleDocsText'>14:28:32 2nd JULY 2023</p>
        </div>
    </div>

</div> */}

            {/* // </section> */}
        </div>
    );
};

export default DashboardDocuments;

