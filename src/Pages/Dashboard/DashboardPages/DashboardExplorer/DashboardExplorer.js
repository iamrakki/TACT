import React, { useState, useEffect } from 'react';
import './DashboardExplorer.css';

const DashboardExplorer = () => {
    // const proxyURL = 'https://api.zecurechain.com'; // Replace with the actual proxy server URL

    // // State to store the HTML content from the proxy server
    // const [htmlContent, setHtmlContent] = useState('');

    // // Fetch the HTML content from the backend proxy server
    // useEffect(() => {
    //     fetch(`${proxyURL}`)
    //         .then((response) => response.text()) // Set 'responseType' to 'text'
    //         .then((data) => {
    //             setHtmlContent(data); // Store the HTML content in state
    //             console.log(data)
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    return (
        <section className='min-vh-100'>
            <div className='container'>
                <h4 className='dTitle pb-3'>Explorer</h4>
                {/* Use 'srcDoc' to directly render the HTML content */}
                <iframe src="https://mumbai.polygonscan.com/" title='Polygon PoS Chain Explorer' width={'100%'} height={'600px'}></iframe>
            </div>
        </section>
    );
};

export default DashboardExplorer;
