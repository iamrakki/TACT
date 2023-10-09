import React from 'react';
import './DashboardCertificateDetails.css';
import { Button, Spinner } from 'react-bootstrap';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import ShareSocial from './ShareSocial';
import { FacebookShareButton } from 'react-share';


const DashboardCertificateDetails = () => {
    const id = useParams();
    const [certificate, setCertificate] = useState([]);
    const { user, secret } = useContext(UserAuthContext);
    const [loadingCard, setLoadingCard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const onlyCertificate = useRef(null);

    const handleClickOpen = async () => {
        if (!pdfUrl) {

            await shareAsPDFCertificate();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const cCardDetails = useRef(null);

    useEffect(() => {
        const dataFetch = async () => {
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
            setLoadingCard(true);
            await axios.get(`https://api.zecurechain.com/api/v1/certificate/get-single/${id?.id}`, {
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        setCertificate(() => res.data?.finding);
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

            const content = document.getElementById('onlyCardCertificate').innerHTML;

            await axios.post("https://api.zecurechain.com/api/v1/certificate/convert-pdf-buffer", { content: content }, {
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
                    a.download = 'certificate.pdf';
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


    const exportAsPDFCertificate = async () => {

        try {
            setLoading2(true);
            const content = onlyCertificate.current;

            // Find all images in the input and get their source URLs
            const images = Array.from(content.querySelectorAll('img'));
            const imageUrls = images.map(img => img.src);
            console.log(imageUrls);
            // Create an array of image loading promises
            const imageLoadPromises = imageUrls.map(url => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = url;
                });
            });

            // Wait for all images to load
            await Promise.all(imageLoadPromises);

            // Capture the content and generate PDF
            html2canvas(content, {
                width: content.offsetWidth,
                height: content.offsetHeight,
                scrollX: 0,
                scrollY: 0,
                // scale: 20, // Increase the scale for higher resolution
                useCORS: true, // Enable this if you're dealing with cross-origin images
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/jpeg', 1.0);

                const pdf = new jsPDF({
                    orientation: content.offsetWidth > content.offsetHeight ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [content.offsetWidth, content.offsetHeight],
                });

                pdf.addImage(imgData, 'JPEG', 0, 0, content.offsetWidth, content.offsetHeight);
                pdf.save('certificate.pdf');
            });
            setLoading2(false);
        } catch (error) {
            console.error('Error converting to PDF:', error);
            setLoading2(false);
        }

    };

    const shareAsPDFCertificate = async () => {

        // console.log("enter new")
        setLoading3(true);
        const content = document.getElementById("shareDiv").innerHTML;
        // console.log(content);
        await axios.post("https://api.zecurechain.com/api/v1/certificate/convert-pdf", { content: content }, {
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => {
                console.log(res.data.data);

                if (res.status == 200) {
                    setPdfUrl(() => res.data?.data);
                    // console.log(res.data?.data)
                }

            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false);
            })

        setLoading3(false);


    };
    // useEffect(() => {
    //     shareAsPDFCertificate();
    // }, []);

    const copyFuncions = (item) => {
        toast.dismiss();
        toast.success("Copied!");
    }

    return (
        <section className=''>
            <div className='container'>
                <h4 className='dTitle pb-3'>My Certificates</h4>

                <div className='cardCertificate p-3' id='cDetailsCard' style={{ background: 'linear-gradient(180deg, #FFF 0%, #FFF 100%)' }} >

                    <div className='d-flex justify-content-between align-items-center'>
                        <div><h4 className='dTitle mb-0 sizeCardTitle'>Certificate Name</h4></div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Button variant="warning" className='rounded-pill' disabled={loading} size='sm' onClick={() => exportAsPDFCard()}>{loading ? <Spinner animation="border" variant="secondary" size="sm" /> : <img src="/assets/images/DownloadSimple.png" alt="" className='img-fluid' />} Download Card</Button>
                            <img src="/assets/images/XCircle.png" alt="" className='img-fluid ms-1' width={30} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center flex-column flex-lg-row' style={{ gap: "15px" }}>
                        <div style={{ lineHeight: '100px' }}>
                            <div id='shareDiv' className='mx-auto text-center d-flex justify-content-center align-items-center'>
                                <img src={certificate?.certificate} alt="pic" className='img-fluid box-image2  mt-3' ref={onlyCertificate} />
                            </div>


                            <div className='text-end d-flex justify-content-end align-items-center my-3' style={{ gap: ' 15px' }}>

                                <Button variant="outline-light" className='text-secondary' onClick={() => handleClickOpen()} disabled={loading3}><img src="/assets/images/ShareNetwork.png" alt="" className='img-fluid' /> {loading3 ? "Loading..." : "Share"}</Button>
                                <Button variant="warning" className='rounded-pill' disabled={loading2} onClick={() => exportAsPDFCertificate()} >{loading2 ? <Spinner animation="border" variant="secondary" size="sm" /> : <img src="/assets/images/DownloadSimple.png" alt="" className='img-fluid' />} Download</Button>
                            </div>

                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Certificate Issuer {certificate?.name ? "Name" : "Email"} :</p>
                                <p className='handleDesC'>{certificate?.name ? certificate?.name : certificate?.email}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Certificate Issued Date :</p>
                                <p className='handleDesC'>{dateFormattor(certificate?.createdAt)}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Certificate Details :</p>
                                <p className='handleDesC'>{certificate?.courseName}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Certificate Hash :</p>
                                <p className='handleDesC'>{(certificate?.ipHash)?.slice(0, 10)}....
                                    <CopyToClipboard text={`${certificate?.ipHash}`} onCopy={copyFuncions}>
                                        <ContentCopyIcon style={{ cursor: 'pointer' }} />
                                    </CopyToClipboard>
                                </p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center gapFlex'>
                                <p className='handleTitleC'>Transaction Hash :</p>
                                <p className='handleDesC'>{(certificate?.hash)?.slice(0, 12)}....
                                    <CopyToClipboard text={`${certificate?.hash}`} onCopy={copyFuncions}>
                                        <ContentCopyIcon style={{ cursor: 'pointer' }} />
                                    </CopyToClipboard>
                                </p>
                            </div>
                            {/* <div className='d-flex justify-content-between align-items-center'>
                                <p className='handleTitleC'>Certificate Token  Id :</p>
                                <p className='handleDesC'>32452w,wfpwqofwqfwfw <ContentCopyIcon /></p>
                            </div> */}
                        </div>

                        <div >
                            <div className='handleScanner'>
                                <div className='mx-auto text-center'>
                                    <img src={certificate?.qrCode} alt="" className='img-fluid w-50' />
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

                {/* Don't touch this div, It's for certificate card pdf  */}
                <div id='onlyCardCertificate' style={{ background: 'white', width: '100%', height: 'auto', border: 'none', flexShrink: 0, padding: '5px' }} ref={cCardDetails} className='d-none'>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "15px" }}>
                        <div style={{ lineHeight: 'normal' }}>
                            <img src={certificate?.certificate} alt="pic" style={{ marginTop: '5px', maxWidth: '100%', maxHeight: '300px' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Certificate Issuer {certificate?.name ? "Name" : "Email"} :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{certificate?.name ? certificate?.name : certificate?.email}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Certificate Issued Date :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{dateFormattor(certificate?.createdAt)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Certificate Details :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{certificate?.courseName}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Certificate Hash :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{certificate?.ipHash}
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>Transaction Hash :</p>
                                <p style={{
                                    color: '#000',
                                    fontFamily: 'Lexend',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                }}>{certificate?.hash}

                                </p>
                            </div>
                        </div>

                        <div >
                            <div style={{
                                position: 'relative',
                                left: '10px'
                            }}>
                                <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                                    <img src={certificate?.qrCode} alt="" style={{ maxWidth: '100%', height: 'auto', width: '70%' }} />
                                </div>
                                <h6 style={{
                                    color: '#024F83',
                                    fontFamily: 'Lexend',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    textAlign: 'center',
                                    paddingTop: '3px'
                                }} >Scan To View Your Certificate Details</h6>
                            </div>
                        </div>

                    </div>
                </div>

                {open && <ShareSocial open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} pdfUrl={pdfUrl} />}
            </div>
        </section >
    );
};

export default DashboardCertificateDetails;