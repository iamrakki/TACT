import React from 'react';
import './DashboardFolderDetails.css';
import { useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Form } from 'react-bootstrap';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NewFolderPopUp from './NewFolderPopUp';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RenameFolderPopUp from './RenameFolderPopUp';
import ConfirmationPopUp from './ConfirmationPopUp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Loader from '../../../../Components/Loader/Loader';
import MuiMenu from './MuiMenu';
import DashboardDocuments from '../DashboardDocuments/DashboardDocuments';
import DashboardCertificateCardDetails from '../DashboardCertificates/DashboardCertificateCardDetails';
import DashboardFolderMenu from './DashboardFolderMenu';


const DashboardFolderDetails = () => {
    const [dataFolder, setDataFolder] = useState([]);
    const [dataFolderAll, setDataFolderAll] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const { user, secret, checkPassword, certificate, setCertificate, dataFetchCertificate, folderStructure, setFolderStructure, docs, dataFetchDocument } = useContext(UserAuthContext);
    const [subFolders, setSubFolders] = useState([]);
    const [subName, setSubName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);
    const [open, setOpen] = useState(false);
    const [openRe, setOpenRe] = useState(false);
    const [show, setShow] = useState(false);
    const [givenId, setGivenId] = useState("");
    const [password, setPassword] = useState("");
    const [certificatePro, setCertificatePro] = useState([]);
    const [cerLoading, setCerLoading] = useState();
    const [loading, setLoading] = useState(false);
    const [docsPro, setDocsPro] = useState([]);

    useEffect(() => {
        if (!certificate) {
            dataFetchCertificate(user?.email, user);
            if (user?.types === "issuer") {

                let adjusting = certificate.filter(data => data?.isInFolder === true && data?.folder == dataFolder?.name && data?.isSub === false && data?.folderId == dataFolder?._id);
                setCertificatePro((() => adjusting));
            }
            else if (user?.types === "individual") {
                let adjusting = certificate.filter(data => data?.isInFolderRec === true && data?.folderRec == dataFolder?.name && data?.isSubRec === false && data?.folderIdRec == dataFolder?._id);
                setCertificatePro((() => adjusting));
            }
        }

        else {
            if (user?.types === "issuer") {
                let adjusting = certificate.filter(data => data?.isInFolder === true && data?.folder == dataFolder?.name && data?.isSub === false && data?.folderId == dataFolder?._id);
                setCertificatePro((() => adjusting));
            }
            else if (user?.types === "individual") {
                let adjusting = certificate.filter(data => data?.isInFolderRec === true && data?.folderRec == dataFolder?.name && data?.isSubRec === false && data?.folderIdRec == dataFolder?._id);
                setCertificatePro((() => adjusting));
            }

        }

        if (!docs) {
            dataFetchDocument(user?.email);
            let adjusting = docs.filter(data => data?.isInFolder === true && data?.folder == dataFolder?.name && data?.isSub === false && data?.folderId == dataFolder?._id);
            setDocsPro((() => adjusting));
        }
        else {
            let adjusting = docs.filter(data => data?.isInFolder === true && data?.folder == dataFolder?.name && data?.isSub === false && data?.folderId == dataFolder?._id);
            setDocsPro((() => adjusting));
        }

        window.scrollTo(0, 0);
        // console.log(certificate, certificatePro);
    }, [certificate, dataFetchCertificate, user, dataFolder?.name, dataFolder?._id, dataFetchDocument, docs]);

    const handleCancel = () => setShow(false);
    const handleShow = (getId) => {
        setGivenId(() => getId);
        setShow(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseRe = () => {
        setOpenRe(false);
    };

    const handleClickOpenRe = (sub) => {
        setSubName(() => sub);
        setOpenRe(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rightClick = () => {
        // alert("opened!");
    }
    const dataFetchAll = async () => {
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
                    setDataFolderAll(() => res.data?.data);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data?.message);
            })
            .finally(() => { setLoading(false); })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        const dataFetch = async () => {
            setLoading(true);
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
            await axios.get(`https://api.zecurechain.com/api/v1/folder/get-single/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
                .then(res => {
                    // console.log(res.data)
                    if (res.status == 200) {
                        setDataFolder(() => res.data?.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.response.data?.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        dataFetch();
        dataFetchAll();
        setFolderStructure({ isInFolder: true, folder: dataFolder?.name, isSub: false, folderId: dataFolder?._id });
    }, [secret, id, refetch, dataFolder?._id, dataFolder?.name]);
    // console.log("structure", folderStructure);
    const createNew = async (name, email) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

        await axios.put("https://api.zecurechain.com/api/v1/folder/sub-folder-create", { subNameF: name, email: email, name: dataFolder?.name }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    toast.success(`${name} has been created!`);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data?.message);
            })
            .finally(() => {
                setRefetch(!refetch);
            })

        handleClose();
    }

    const renameFunc = async (rename, email) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

        await axios.put("https://api.zecurechain.com/api/v1/folder/rename-folder?type=sub", { rename: rename, email: email, parentName: dataFolder?.name, prevName: subName }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    toast.success(`${res.data?.message}`);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data?.message);
            })
            .finally(() => {
                setRefetch(!refetch);
                dataFetchCertificate(user?.email, user);
                let adjusting = certificate.filter(data => data?.isInFolder === true && data?.folder == dataFolder?.name && data?.isSub === false && data?.folderId == dataFolder?._id);
                setCertificatePro((() => adjusting));
            })

        handleCloseRe();
    }
    const deleteFolder = async () => {
        const checkPasswordIssue = await checkPassword(user?.email, password);
        // console.log(checkPassword)
        if (checkPasswordIssue) {
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

            await axios.delete(`https://api.zecurechain.com/api/v1/folder/delete-folder/${id}?type=sub&subName=${givenId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        toast.success(`${res.data?.message}`);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.response.data?.message);
                })
                .finally(() => {
                    setRefetch(!refetch);
                    setPassword("");
                })
        }

    }

    // let isInFolder = true;
    // let folder = data?.name;
    // let isSub = false;
    // let folderId = data?._id;

    return (
        <section className='mb-5 ' style={{ minHeight: '60vh' }}>
            <div className='container mt-3 mb-5'>
                <div className='d-flex justify-content-start justify-content-lg-between align-items-start align-items-lg-center flex-column flex-lg-row' style={{ gap: '15px' }}>
                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '5px' }}>
                        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        <h4 className='dTitle mb-0'><span className='text-muted'>Drive &gt;</span> {dataFolder?.name}</h4>
                    </div>

                    <div className='d-flex justify-content-start align-items-center  flex-wrap' style={{ gap: '15px' }}>
                        {/* <Button variant="warning" className='rounded-pill  py-2' onClick={() => navigate(`/dashboard/dashboard-create-certificates/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Create a certificate</Button> */}

                        {/* <Button variant="warning" className='rounded-pill py-2' onClick={() => navigate(`/dashboard/dashboard-create-template/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Create template</Button>
                        <Button variant="warning" className='rounded-pill  py-2' onClick={() => navigate(`/dashboard/dashboard-design-template/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Design Template</Button> */}

                        <Button variant="warning" className='rounded-pill  py-2' onClick={() => handleClickOpen()}>+ Add New Folder</Button>
                    </div>
                </div>
                {/* <p className='pt-2 text-secondary'>My Folder /Unitic services</p> */}

                {
                    loading ? <div className='mt-5'><Loader /></div> :

                        <div className={`row gx-3 gy-5 my-2`}>
                            {
                                dataFolder?.subFolders?.map((data, index) => <div className='col-6 col-sm-6 col-md-6 col-lg-4 ' key={index}>
                                    <div className='cardForFolder' onContextMenu={() => rightClick()}
                                        onTouchStart={() => rightClick()} style={{ cursor: 'pointer' }} >
                                        <div className='d-flex justify-content-start align-items-center w-100' style={{ gap: ' 5px' }} onClick={() => navigate(`/dashboard/dashboard-subfolder-details/${data?._id}/${dataFolder?.name}/${data?.subName}`)}><p><FolderOpenIcon /></p>
                                            <p>{data?.subName}</p></div>


                                        <div>
                                            <DashboardFolderMenu name={data?.subName} id={data?.subName} handleClickOpenRe={handleClickOpenRe} handleShow={handleShow} isDelete={(certificate.find(fn => fn?.folder === data?.subName)) ? false : true} />
                                        </div>

                                        {/* <div className='d-flex justify-content-start align-items-center' style={{ gap: '0px' }}>
                                            <p onClick={() => handleClickOpenRe(data?.subName)}><ModeEditIcon /></p>
                                            <p onClick={() => handleShow(data?.subName)} className={`${certificate.find(fn => fn?.folder === data?.subName) ? 'd-none' : 'd-block'}`}><DeleteIcon /></p>
                                        </div> */}


                                    </div>
                                </div>
                                )
                            }
                        </div>
                }

                <div className='container mt-5'>
                    <div className='row gx-3 gy-5'>
                        {
                            certificatePro?.map((data, index) => <DashboardCertificateCardDetails data={data} index={index} dataFolder={dataFolderAll} dataFetch={dataFetchAll} />
                            )
                        }
                    </div>
                    <div className='mt-3'>
                        {docsPro?.map(data => <DashboardDocuments name={data?.fileName} size={data?.fileSize} date={data?.createdAt} id={data?._id} />)}
                    </div>
                </div>

                {open && <NewFolderPopUp open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} createNew={createNew} />}

                {openRe && <RenameFolderPopUp openRe={openRe} setOpenRe={setOpenRe} handleClickOpenRe={handleClickOpenRe} handleCloseRe={handleCloseRe} renameFunc={renameFunc} prev={subName} />}

                {show && <ConfirmationPopUp show={show} handleCancel={handleCancel} deleteFolder={deleteFolder} password={password} setPassword={setPassword} />}

            </div>
        </section>
    );
};

export default DashboardFolderDetails;