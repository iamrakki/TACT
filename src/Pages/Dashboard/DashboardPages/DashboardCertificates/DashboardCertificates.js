import React, { useContext, useEffect, useState } from 'react';
import './DashboardCertificates.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import DashboardCertificateProgressPopUp from './DashboardCertificateProgressPopUp';
import axios from 'axios';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import WarningPopUp from './WarningPopUp';
import CryptoJS from 'crypto-js';

const DashboardCertificates = () => {

    const { user, certificate, dataFetchCertificate, secret, folderStructure, setFolderStructure } = useContext(UserAuthContext);
    const [loading, setLoading] = useState(true);
    const fakeData = [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }];
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const [warnOpen, setWarnOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [path, setPath] = useState("");
    const warnHandleOpen = (pathOrigin) => {
        setPath(() => pathOrigin);
        setWarnOpen(true);
    };
    const warnHandleClose = () => {
        setWarnOpen(false);
    };

    useEffect(() => {
        if (certificate) {

            setLoading(false)
        }
        else {
            dataFetchCertificate(user?.email, user);
            setLoading(false);
        }
        // setLoading(true);
        // console.log(certificate);
    }, [user?.email]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const dataFetch = async () => {
            setLoading(true);
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
            await axios.get(`https://api.zecurechain.com/api/v1/folder/${user?.email}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        setData(() => res.data?.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    // toast.error(e.response.data?.message);
                })
                .finally(() => { setLoading(false); })
        }
        dataFetch();
        setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
    }, [secret, user?.email])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // console.log(certificate)
    // const isInFolder = false;
    // const folder = null;
    // const isSub = false;
    // const folderId = null;
    // console.log("structure", folderStructure);
    return (
        <section className='w-100' style={{ minHeight: '60vh' }}>
            {/* Empty warning  */}
            <div className='mx-auto  '>
                {/* <button onClick={() => warnHandleOpen()}>Test</button> */}
                <div className='container'>
                    <div className='d-flex justify-content-start justify-content-lg-between align-items-start align-items-lg-start flex-column flex-lg-row mb-3' style={{ gap: '15px' }}>
                        <div className='text-start'>
                            <h4 className='dTitle'>My Certificates</h4>
                            <p style={{
                                color: "#545454",
                                textAlign: "start",
                                fontFamily: 'Saira, sans-serif',
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "normal"
                            }} className='mb-0'>Future Proofing Credentials, Certify with Confidence on Blockchain</p>
                        </div>

                        <div className='d-flex justify-content-start align-items-center  flex-wrap' style={{ gap: '15px' }}>

                            <Button variant="warning" className='rounded-pill  py-2' onClick={() =>
                                warnHandleOpen("/dashboard/dashboard-create-certificates")}>+ Create a certificate</Button>
                            <Button variant="warning" className='rounded-pill  py-2' onClick={() =>
                                warnHandleOpen("/dashboard/dashboard-create-template")
                            }>+ Create template</Button>
                            <Button variant="warning" className='rounded-pill  py-2' onClick={() =>
                                warnHandleOpen("/dashboard/dashboard-design-template")}>+ Design Template</Button>

                        </div>
                    </div>
                </div>
                {loading ? <div className='d-flex justify-content-center align-items-start pt-5'>  <Spinner animation="border" variant="primary" /></div> :
                    <div>
                        {
                            certificate.length > 0 ?
                                <div className={`container pt-5`}>

                                    <div className='row gx-3 gy-5'>
                                        {
                                            certificate?.map((data, index) => <div className='col-12 col-sm-12 col-md-6 col-lg-4 ' key={index}>
                                                <Card sx={{ maxWidth: 330, padding: 2, borderRadius: 5, background: '#E8E8E8' }} onClick={() => navigate(`/dashboard/dashboard-certificates-details/${data?._id}`)}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            height="auto"
                                                            width="100%"
                                                            image={data?.certificate}
                                                            alt="green iguana"
                                                        />
                                                        <CardContent className='mt-2'>

                                                            <Typography variant="body2" className='d-flex justify-content-between align-items-center'>
                                                                <p className='cardSubTitleIssue'>Issued by :</p>
                                                                <p className='cardSubInfoIssue'>{data?.issuer}</p>
                                                            </Typography>
                                                            <Typography variant="body2" className='d-flex justify-content-between align-items-center'>
                                                                <p className='cardSubTitleIssue mb-0'>Received by :</p>
                                                                <p className='cardSubInfoIssue mb-0'>{data?.name ? data?.name : data?.email}</p>
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </div>
                                            )
                                        }
                                    </div>
                                </div> :
                                <div className='mx-auto text-center pt-5'>
                                    <img src="/assets/images/emptyC.png" alt="" className='img-fluid' width={300} />
                                    <p className='pt-4' style={{
                                        color: '#5B5B5B',
                                        fontFamily: 'Lexend',
                                        fontSize: '24px',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        lineHeight: 'normal',
                                    }}>There is no certificate </p>
                                </div>
                        }
                    </div>

                }


            </div>


            {open && <DashboardCertificateProgressPopUp open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />}

            {warnOpen && <WarningPopUp warnOpen={warnOpen} setWarnOpen={setWarnOpen} warnHandleOpen={warnHandleOpen} warnHandleClose={warnHandleClose} data={data} path={path} />}
        </section>
    );
};

export default DashboardCertificates;