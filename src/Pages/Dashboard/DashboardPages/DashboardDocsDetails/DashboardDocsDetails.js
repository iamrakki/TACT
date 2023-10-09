import React, { useEffect, useState, useContext } from 'react';
import './DashboardDocsDetails.css';
import ShareSocialDocs from './ShareSocialDocs';

import { Button, Spinner } from 'react-bootstrap';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const DashboardDocsDetails = () => {

    const id = useParams();
    const [docs, setDocs] = useState([]);
    const { user, secret } = useContext(UserAuthContext);
    const [loadingCard, setLoadingCard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const onlyDocs = useRef(null);

    const handleClickOpen = async () => {
        await shareAsPDFDocs();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const cCardDetails = useRef(null);

    useEffect(() => {
        sessionStorage.setItem('selectedTab', '3');
        const dataFetch = async () => {
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
            setLoadingCard(true);
            await axios.get(`https://api.zecurechain.com/api/v1/document/get-single/${id?.id}`, {
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        setDocs(() => res.data?.finding);
                        // console.log(res.data?.finding);
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => setLoadingCard(false));
        }
        dataFetch();
        window.scrollTo(0, 0);
    }, [user?.email, id, secret]);

    // console.log(certificate)

    const dateFormattor = (date) => {

        // Convert UTC date string to a JavaScript Date object
        const utcDate = new Date(date);

        // Get user's local time zone offset in minutes
        const userTimeZoneOffset = new Date().getTimezoneOffset();

        // Calculate local time by subtracting the time zone offset
        const localDate = new Date(utcDate.getTime() - userTimeZoneOffset * 60000);

        // Array of month names to use in formatting
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Format the local date as "27 July 2023"
        const formattedDate = `${localDate.getDate()} ${monthNames[localDate.getMonth()]} ${localDate.getFullYear()}`;

        return formattedDate;

    }

    const exportAsPDFCard = async () => {
        try {
            setLoading(true);

            const content = document.getElementById('onlyCardDocs').innerHTML;

            await axios.post("https://api.zecurechain.com/api/v1/document/convert-pdf-buffer", { content: content, file: docs?.fileName }, {
                headers: {
                    "content-type": "application/json"
                },
                responseType: 'arraybuffer'
            })
                .then(async res => {
                    // console.log(res.data);
                    // if (res.status == 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = docs?.fileName;
                    a.click();
                    // }
                })
                .catch((e) => {
                    console.log(e)
                })
                .finally(() => {
                    setLoading(false);
                })

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error converting to PDF:', error);
        }
    };



    const exportAsPDFDocs = async () => {

        try {
            // Set loading state to true to show a spinner while fetching the file
            setLoading2(true);

            // Fetch the file from the provided URL
            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${docs?.ipHash}`);

            // Check if the request was successful (status code 200)
            if (response.ok) {
                // Get the blob (binary data) from the response
                const blob = await response.blob();

                // Create a URL for the blob
                const url = URL.createObjectURL(blob);

                // Create a temporary anchor element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = docs?.fileName;
                document.body.appendChild(a);

                // Trigger the click event on the anchor element
                a.click();

                // Remove the anchor element
                document.body.removeChild(a);

                // Reset loading state after the download is complete
                setLoading2(false);
            } else {
                console.error('Failed to fetch the file.');
                setLoading2(false);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setLoading2(false);
        }
    };

    const shareAsPDFDocs = async () => {

        // console.log("enter new")
        setLoading3(true);
        let body = `https://gateway.pinata.cloud/ipfs/${docs?.ipHash}`;
        setPdfUrl(() => body)
        // await axios.post("https://api.zecurechain.com/api/v1/document/convertByFetch", { url: `https://gateway.pinata.cloud/ipfs/${docs?.ipHash}` }, {
        //     headers: {
        //         "content-type": "application/json"
        //     },
        // })
        //     .then(async res => {
        //         console.log(res.data);

        //         if (res.status == 200) {
        //             setPdfUrl(() => URL.createObjectURL(res.data));
        //         }

        //     })
        //     .catch((e) => {
        //         console.log(e)
        //     })
        //     .finally(() => {
        //     })

        setLoading(false);
        setLoading3(false);


    };
    useEffect(() => {
        shareAsPDFDocs();
    }, []);

    const copyFuncions = (item) => {
        toast.dismiss();
        toast.success("Copied!")
    }


    return (
        <section className=''>
            <div className='container'>
                <h4 className='dTitle pb-3'>My Documents</h4>

                <div className='cardCertificate p-3' style={{ background: 'linear-gradient(180deg, #FFF 0%, #FFF 100%)' }}>


                    <div className='d-flex justify-content-between align-items-center'>
                        <div><h4 className='dTitle mb-0 sizeCardTitle'>Document Name</h4></div>
                        <div className='d-flex justify-content-between align-items-center'>

                            <Button variant="warning" className='rounded-pill' disabled={loading} size='sm' onClick={() => exportAsPDFCard()}>{loading ? <Spinner animation="border" variant="secondary" size="sm" /> : <img src="/assets/images/DownloadSimple.png" alt="" className='img-fluid' />} Download Card</Button>
                            <img src="/assets/images/XCircle.png" alt="" className='img-fluid ms-1' width={30} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center flex-column flex-lg-row' style={{ gap: "15px" }}>
                        <div style={{ lineHeight: '100px', minWidth: '55%' }}>
                            {/* <h4 className='dTitle mb-0' style={{ fontSize: '22px' }}>Document Name</h4> */}
                            <div className='box-image2 mt-3' style={{ height: '300px' }}>
                                <img src="/assets/images/docsFile.png" alt="" className='img-fluid' width={150} />
                                <p>{docs?.fileName} ({docs?.fileSize})</p>
                            </div>

                            <div className='text-end d-flex justify-content-end align-items-center my-3' style={{ gap: ' 15px' }}>
                                <Button variant="outline-light" className='text-secondary' onClick={() => handleClickOpen()} disabled={loading3}><img src="/assets/images/ShareNetwork.png" alt="" className='img-fluid' /> {loading3 ? "Loading..." : "Share"}</Button>
                                <Button variant="warning" className='rounded-pill' disabled={loading2} onClick={() => exportAsPDFDocs()} >{loading2 ? <Spinner animation="border" variant="secondary" size="sm" /> : <img src="/assets/images/DownloadSimple.png" alt="" className='img-fluid' />} Download</Button>
                            </div>

                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Issuer Name :</p>
                                <p className='handleDesC'>{docs?.issuerName}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Stored Date :</p>
                                <p className='handleDesC'>{dateFormattor(docs?.createdAt)}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Document Hash :</p>
                                <p className='handleDesC'>{(docs?.ipHash)?.slice(0, 10)}....
                                    <CopyToClipboard text={`https://gateway.pinata.cloud/ipfs/${docs?.ipHash}`} onCopy={copyFuncions}>
                                        <ContentCopyIcon style={{ cursor: 'pointer' }} />
                                    </CopyToClipboard>
                                </p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Blockchain Hash :</p>
                                <p className='handleDesC'>{(docs?.hash)?.slice(0, 11)}....
                                    <CopyToClipboard text={`${docs?.hash}`} onCopy={copyFuncions}>
                                        <ContentCopyIcon style={{ cursor: 'pointer' }} />
                                    </CopyToClipboard>
                                </p>
                            </div>

                        </div>
                        <div >
                            <div className='handleScanner'>
                                <div className='mx-auto text-center'>
                                    <img src={docs?.qrCode} alt="" className='img-fluid w-50' />
                                </div>
                                <h6 style={{
                                    color: '#024F83',
                                    fontFamily: 'Lexend',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    textAlign: 'center'
                                }} className='pt-1'>Scan To View Your Certificate Details</h6>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Don't touch this div, It's for docs card pdf  */}
                <div id='onlyCardDocs' style={{ background: 'white', width: '100%', height: 'auto', border: 'none', flexShrink: 0, padding: '5px' }} ref={cCardDetails} className='d-none'>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "15px" }}>
                        <div style={{ lineHeight: 'normal' }}>


                            <div style={{
                                borderRadius: '3px',
                                border: '1px solid #5B5B5B',
                                marginTop: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '300px',
                                flexDirection: 'column'
                            }}>
                                <img src="https://i.ibb.co/R7YSbgT/docsFile.png" alt="pic" style={{ marginTop: '5px', maxWidth: '50%', height: 'auto' }} />
                                <p style={{ paddingTop: '5px' }}>{docs?.fileName} ({docs?.fileSize})</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', gap: '15px', }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Issuer Name {docs?.issuerName ? "Name" : "Email"} :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{docs?.issuerName ? docs?.issuerName : docs?.email}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Stored Date :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{dateFormattor(docs?.createdAt)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Document Hash :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{docs?.ipHash}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Blockchain Hash :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{docs?.hash}
                                </p>
                            </div>
                        </div>

                        <div >
                            <div style={{
                                position: 'relative',
                                left: '10px'
                            }}>
                                <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                                    <img src={docs?.qrCode} alt="" style={{ maxWidth: '100%', height: 'auto', width: '70%' }} />
                                </div>
                                <h6 style={{
                                    color: '#024F83',
                                    fontFamily: 'Lexend',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    textAlign: 'center',
                                }} >Scan To View Your Certificate Details</h6>
                            </div>
                        </div>

                    </div>
                </div>

                {open && <ShareSocialDocs open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} pdfUrl={pdfUrl} />}
            </div>
        </section>
    );
};

export default DashboardDocsDetails;