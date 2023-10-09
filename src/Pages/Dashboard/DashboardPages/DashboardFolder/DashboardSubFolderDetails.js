import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Form } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { useEffect } from 'react';
import { useState } from 'react';
import MuiMenu from './MuiMenu';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import DashboardDocuments from '../DashboardDocuments/DashboardDocuments';
import DashboardCertificateCardDetails from '../DashboardCertificates/DashboardCertificateCardDetails';

const DashboardSubFolderDetails = () => {
    const { id, name, sub } = useParams();
    const navigate = useNavigate();
    const { user, secret, checkPassword, certificate, dataFetchCertificate, folderStructure, setFolderStructure, docs, dataFetchDocument } = useContext(UserAuthContext);
    const [certificatePro, setCertificatePro] = useState([]);
    const [dataFolder, setDataFolder] = useState([]);
    const [docsPro, setDocsPro] = useState([]);

    useEffect(() => {
        if (!certificate) {
            dataFetchCertificate(user?.email, user);

            if (user?.types === "issuer") {
                let adjusting = certificate.filter(data => data?.isInFolder === true && data?.folder == sub && data?.isSub === true && data?.folderId == id);
                setCertificatePro((() => adjusting));
            }
            else if (user?.types === "individual") {
                let adjusting = certificate.filter(data => data?.isInFolderRec === true && data?.folderRec == sub && data?.isSubRec === true && data?.folderIdRec == id);
                setCertificatePro((() => adjusting));
            }
        }
        else {

            if (user?.types === "issuer") {

                let adjusting = certificate.filter(data => data?.isInFolder === true && data?.folder == sub && data?.isSub === true && data?.folderId == id);
                setCertificatePro((() => adjusting));
            }
            else if (user?.types === "individual") {
                let adjusting = certificate.filter(data => data?.isInFolderRec === true && data?.folderRec == sub && data?.isSubRec === true && data?.folderIdRec == id);
                setCertificatePro((() => adjusting));
            }
        }


        if (!docs) {
            dataFetchDocument(user?.email);
            let adjusting = docs.filter(data => data?.isInFolder === true && data?.folder == sub && data?.isSub === true && data?.folderId == id);
            setDocsPro((() => adjusting));
        }
        else {
            let adjusting = docs.filter(data => data?.isInFolder === true && data?.folder == sub && data?.isSub === true && data?.folderId == id);
            setDocsPro((() => adjusting));
        }

        window.scrollTo(0, 0);
        // console.log(certificate, certificatePro);
    }, [certificate, dataFetchCertificate, user, dataFolder?._id, dataFolder?.name, id, sub, dataFetchDocument, docs]);

    const dataFetch = async () => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
        await axios.get(`https://api.zecurechain.com/api/v1/folder/${user?.email}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    setDataFolder(() => res.data?.data);
                }
            })
            .catch((e) => {
                console.log(e);
                // toast.error(e.response.data?.message);
            })
            .finally(() => { })
    }
    useEffect(() => {
        dataFetch();
        setFolderStructure({ isInFolder: true, folder: sub, isSub: true, folderId: id });
    }, [sub, id, user?.email, secret])
    // console.log("structure", folderStructure);

    // let isInFolder = true;
    // let folder = name;
    // let isSub = true;
    // let folderId = id;

    return (
        <section className='mb-5 ' style={{ minHeight: '60vh' }}>
            <div className='container mt-3 mb-5'>
                <div className='d-flex justify-content-start justify-content-lg-between align-items-start align-items-lg-center flex-column flex-lg-row' style={{ gap: '15px' }}>
                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '5px' }}>
                        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        <h4 className='dTitle mb-0'><span className='text-muted'>Drive &gt; {name} &gt; </span> {sub}</h4>
                    </div>

                    <div className='d-flex justify-content-start align-items-center  flex-wrap' style={{ gap: '15px' }}>
                        {/* <Button variant="warning" className='rounded-pill  py-2' onClick={() => navigate(`/dashboard/dashboard-create-certificates/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Create a certificate</Button> */}

                        {/* <Button variant="warning" className='rounded-pill py-2' onClick={() => navigate(`/dashboard/dashboard-create-template/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Create template</Button>
                        <Button variant="warning" className='rounded-pill  py-2' onClick={() => navigate(`/dashboard/dashboard-design-template/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Design Template</Button> */}

                        {/* <Button variant="warning" className='rounded-pill  py-2' onClick={() => handleClickOpen()}>+ Add New Folder</Button> */}
                    </div>
                </div>

                <div className='row gx-3 gy-5 mt-3'>
                    {
                        certificatePro?.map((data, index) => <DashboardCertificateCardDetails data={data} index={index} dataFolder={dataFolder} dataFetch={dataFetch} />
                        )
                    }
                </div>
                <div className='mt-3'>
                    {docsPro?.map(data => <DashboardDocuments name={data?.fileName} size={data?.fileSize} date={data?.createdAt} id={data?._id} />)}
                </div>
            </div>
        </section>
    );
};

export default DashboardSubFolderDetails;