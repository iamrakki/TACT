import React from 'react';
import './DashboardCertificateV2.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import WarningPopUp from './WarningPopUp';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import ModePopup from './ModePopup';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { useNavigate } from 'react-router-dom';

// const cerTemp = [
//     { id: "1", name: "cer1", temp: "/assets/images/ct1.png", cover: "/assets/images/ctd1.png" },
//     { id: "2", name: "cer2", temp: "/assets/images/ct2.png", cover: "/assets/images/ctd2.png" },
//     { id: "3", name: "cer3", temp: "/assets/images/ct3.png", cover: "/assets/images/ctd3.png" },
//     { id: "4", name: "cer4", temp: "/assets/images/ct4.png", cover: "/assets/images/ctd4.png" },
//     { id: "5", name: "cer5", temp: "/assets/images/ct5.png", cover: "/assets/images/ctd5.png" },
//     { id: "6", name: "cer6", temp: "/assets/images/ct6.png", cover: "/assets/images/ctd6.png" },
//     { id: "7", name: "cer7", temp: "/assets/images/ct7.png", cover: "/assets/images/ctd7.png" },
// ]
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 400,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));
const DashboardCertificateV2 = () => {
    const [warnOpen, setWarnOpen] = useState(false);
    const [modeOpen, setModeOpen] = useState(false);
    const [path, setPath] = useState("");
    const [cerId, setCerId] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, setFolderStructure, secret, cerTemp, cerComingSoon } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const warnHandleOpen = (pathOrigin, id) => {
        setPath(() => pathOrigin);
        setCerId(() => id);
        setWarnOpen(true);
    };
    // console.log(modeOpen, "mode");
    const warnHandleClose = () => {
        setWarnOpen(false);
    };

    const handleModeOpen = (folderData) => {
        setModeOpen(() => true);
        // console.log("Fol", folderData);
        setFolderStructure({ isInFolder: folderData?.isInFolder, folder: folderData?.folder, isSub: folderData?.isSub, folderId: folderData?.folderId });

    }
    const handleModeClose = () => {
        setModeOpen(() => false);
    }

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
    useEffect(() => {
        if (user?.types != "issuer") {
            navigate("/");
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dataFetch();
        setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
    }, [secret, user?.email]);

    return (
        <section className='w-100' style={{ minHeight: '60vh' }}>
            {/* Empty warning  */}
            <div className='mx-auto  container'>
                {/* <button onClick={() => warnHandleOpen()}>Test</button> */}
                <div className=''>
                    <div className='d-flex justify-content-start justify-content-lg-between align-items-start align-items-lg-start flex-column flex-lg-row mb-3' style={{ gap: '15px' }}>

                        <div className='text-start'>
                            <h4 className='dTitle'>Certificates</h4>
                            <p style={{
                                color: "#545454",
                                textAlign: "start",
                                fontFamily: 'Saira, sans-serif',
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "normal"
                            }} className='mb-0'>Choose your Template to Create Certificate.</p>
                        </div>

                    </div>

                    <div>
                        <div className='row g-5'>

                            {
                                cerTemp?.map(data => <div className='col-12 col-md-6 col-lg-4 trans' key={data?.id} id={data?.id} style={{ cursor: data?.id > 7 ? 'not-allowed' : 'pointer', }} onClick={() => {
                                    if (data?.id <= 7) {
                                        localStorage.setItem('imgID', data?.id);
                                        warnHandleOpen("/dashboard/dashboard-create-certificates", data?.id);
                                    }
                                }
                                }>
                                    <HtmlTooltip
                                        TransitionComponent={Zoom}
                                        placement="right"
                                        disableFocusListener
                                        title={
                                            <React.Fragment>
                                                <img src={`${data?.cover}`} alt="" className='img-fluid' />
                                            </React.Fragment>
                                        }
                                    >
                                        <img src={`${data?.id == 7 ? data?.divSpecial : data?.temp}`} alt="" className='img-fluid' style={{ border: '1px solid #dadde9' }} />
                                    </HtmlTooltip>

                                </div>
                                )
                            }

                        </div>
                    </div>
                    {/* <div className='mt-5'>

                        <div className='row g-5'>
                            {
                                cerComingSoon?.map(data => {
                                    return <div className='col-12 col-md-6 col-lg-4 mx-auto text-center' key={data?.id} style={{ cursor: 'not-allowed' }}>
                                        <img src={data?.temp} alt="coming soon" className='img-fluid' />
                                    </div>
                                })
                            }
                        </div>
                    </div> */}

                </div>

                {warnOpen && <WarningPopUp warnOpen={warnOpen} setWarnOpen={setWarnOpen} warnHandleOpen={warnHandleOpen} warnHandleClose={warnHandleClose} data={data} path={path} handleModeOpen={handleModeOpen} handleModeClose={handleModeClose} isMode={true} dataFetch={dataFetch} />}

                {modeOpen && <ModePopup modeOpen={modeOpen} setModeOpen={setModeOpen} handleModeOpen={handleModeOpen} handleModeClose={handleModeClose} path={path} />}

            </div>
        </section>
    );
};

export default DashboardCertificateV2;