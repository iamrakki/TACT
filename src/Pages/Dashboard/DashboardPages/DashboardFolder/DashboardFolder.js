import React, { useState } from 'react';
import './DashboardFolder.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NewFolderPopUp from './NewFolderPopUp';
import { useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RenameFolderPopUp from './RenameFolderPopUp';
import Modal from 'react-bootstrap/Modal';
import ConfirmationPopUp from './ConfirmationPopUp';
import Loader from '../../../../Components/Loader/Loader';
import MuiMenu from './MuiMenu';
import DashboardDocuments from '../DashboardDocuments/DashboardDocuments';
import DashboardCertificateCardDetails from '../DashboardCertificates/DashboardCertificateCardDetails';
import DashboardFolderMenu from './DashboardFolderMenu';

const DashboardFolder = () => {
    const [dataFolder, setDataFolder] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const { user, secret, checkPassword, certificate, dataFetchCertificate, folderStructure, setFolderStructure, docs, dataFetchDocument } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openRe, setOpenRe] = useState(false);
    const [parent, setParent] = useState("");
    const [show, setShow] = useState(false);
    const [givenId, setGivenId] = useState("");
    const [password, setPassword] = useState("");
    const [certificatePro, setCertificatePro] = useState([]);
    const [docsPro, setDocsPro] = useState([]);
    console.log(dataFolder);
    useEffect(() => {
        if (!certificate) {
            dataFetchCertificate(user?.email, user);

        }
        if (!docs) {
            dataFetchDocument(user?.email);

        }
        if (user?.types === "issuer") {

            let adjusting = certificate.filter(data => {
                return data?.isInFolder === false &&
                    data?.folder == "null" &&  // Assuming "null" is a string
                    data?.isSub === false &&
                    data?.folderId == "null";  // Assuming "null" is a string
            });
            setCertificatePro(() => adjusting);
            // console.log(adjusting);

        }
        else if (user?.types === "individual") {

            let adjusting = certificate.filter(data => data?.isInFolderRec === false && data?.folderRec == null && data?.isSubRec === false && data?.folderIdRec == null);
            setCertificatePro(() => adjusting);
            // console.log(certificate,adjusting, 'cer')
        }


        let adjusting = docs.filter(data => data?.isInFolder === false && data?.folder == null && data?.isSub === false && data?.folderId == null);
        setDocsPro(() => adjusting);
        window.scrollTo(0, 0);

        // console.log(docs, docsPro);
    }, [certificate, dataFetchCertificate, user, dataFetchDocument, docs]);

    // console.log(certificate, 'cer')
    const handleCancel = () => setShow(false);
    const handleShow = (getId) => {
        setGivenId(() => getId);
        setShow(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseRe = () => {
        setOpenRe(false);
    };

    const handleClickOpenRe = (pN) => {
        setParent(() => pN);
        setOpenRe(true);
    };

    const rightClick = () => {
        // alert("opened!");
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
                // console.log(res.data)
                if (res.status == 200) {
                    setDataFolder(() => res.data?.data);
                }
            })
            .catch((e) => {
                console.log(e);
                // toast.dismiss();
                // toast.error(e.response.data?.message);
            })
            .finally(() => { setLoading(false); })
    }
    useEffect(() => {
        dataFetch();
        window.scrollTo(0, 0);
        setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
    }, [secret, refetch, user?.email]);
    // console.log("structure", folderStructure);
    const createNew = async (name, email) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

        await axios.post("https://api.zecurechain.com/api/v1/folder", { name: name, email: user?.email }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    toast.success(`${res.data?.data?.name} has been created!`);
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

    const renameFunc = async (rename, email, parentName, prevName) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

        await axios.put("https://api.zecurechain.com/api/v1/folder/rename-folder?type=parent", { rename: rename, email: email, parentName: parent }, {
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
                let adjusting = certificate.filter(data => data?.isInFolder === false && data?.folder == "null" && data?.isSub === false && data?.folderId == "null");
                setCertificatePro((() => adjusting));
            })

        handleCloseRe();
    }

    const deleteFolder = async () => {

        const checkPasswordIssue = await checkPassword(user?.email, password);
        console.log("check", checkPassword);
        if (checkPasswordIssue) {
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

            await axios.delete(`https://api.zecurechain.com/api/v1/folder/delete-folder/${givenId}?type=parent`, {
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
    // const isInFolder = false;
    // const folder = null;
    // const isSub = false;
    // const folderId = null;
    return (
        <section className='d-flex justify-content-center align-items-start' style={{ minHeight: '60vh' }}>
            <div className='container'>
                <div>
                    <div className='d-flex justify-content-start justify-content-lg-between align-items-start align-items-lg-center flex-column flex-lg-row' style={{ gap: '15px' }}>
                        <h4 className='dTitle mb-0'>Drive</h4>

                        <div className='d-flex justify-content-start align-items-center   flex-wrap' style={{ gap: '15px' }}>
                            {/* <Button variant="warning" className='rounded-pill  py-2' onClick={() => navigate(`/dashboard/dashboard-create-certificates/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Create a certificate</Button> */}

                            {/* <Button variant="warning" className='rounded-pill py-2' onClick={() => navigate(`/dashboard/dashboard-create-template/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Create template</Button>
                                    <Button variant="warning" className='rounded-pill  py-2' onClick={() => navigate(`/dashboard/dashboard-design-template/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}`)}>+ Design Template</Button> */}

                            <Button variant="warning" className='rounded-pill  py-2' onClick={() => handleClickOpen()}>+ Add New Folder</Button>
                        </div>
                    </div>

                    {
                        !loading ? <div className='row gx-3 gy-4 pt-3'>
                            {
                                dataFolder?.map((data, index) => <div className='col-6 col-sm-6 col-md-6 col-lg-4 ' key={index}>
                                    <div className='cardForFolder' onContextMenu={() => rightClick()}
                                        onTouchStart={() => rightClick()} style={{ cursor: 'pointer' }} >
                                        <div className='d-flex justify-content-start align-items-center w-100' style={{ gap: ' 5px' }} onClick={() => navigate(`/dashboard/dashboard-folder-details/${data?._id}`)}><p><FolderOpenIcon /></p>
                                            <p>{data?.name}</p></div>

                                        <div>
                                            <DashboardFolderMenu name={data?.name} id={data?._id} handleClickOpenRe={handleClickOpenRe} handleShow={handleShow} isDelete={(certificate.some(c => c?.folder === data?.name) ||
                                                certificate.some(c => data?.subFolders?.some(sub => sub?.subName === c?.folder))) ? false : true} />
                                        </div>
                                        {/* <div className='d-flex justify-content-start align-items-center' style={{ gap: '0px' }}>
                                                    <p onClick={() => handleClickOpenRe(data?.name)}><ModeEditIcon /></p>

                                                    <p onClick={() => handleShow(data?._id)} className={`${certificate.some(c => c?.folder === data?.name) ||
                                                        certificate.some(c => data?.subFolders?.some(sub => sub?.subName === c?.folder)) ? 'd-none' : 'd-block'}`}><DeleteIcon /></p>
                                                </div> */}

                                    </div>
                                </div>
                                )
                            }
                        </div> : <div className='mt-5'><Loader /></div>
                    }

                </div>

                {(dataFolder.length <= 0 && certificatePro.length <= 0 && docsPro.length <= 0) &&
                    <div className='mx-auto text-center mb-3 mt-4'>
                        <img src="/assets/images/emptyC.png" alt="" className='img-fluid w-25' />
                        <p className='pt-4 pb-2' style={{
                            color: '#5B5B5B',
                            fontFamily: 'Lexend',
                            fontSize: '24px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal',
                        }}>No data found on your Account</p>
                        {/* <Button variant="warning" className='rounded-pill px-4 py-2' onClick={() => handleClickOpen()}>+ Add New Folder</Button> */}
                    </div>
                }

                <div className='row gx-3 gy-4 pt-5'>
                    {
                        certificatePro?.map((data, index) => <DashboardCertificateCardDetails data={data} index={index} dataFolder={dataFolder} dataFetch={dataFetch} />
                        )
                    }
                </div>

                <div className='mt-3'>
                    {docsPro?.map(data => <DashboardDocuments name={data?.fileName} size={data?.fileSize} date={data?.createdAt} id={data?._id} />)}
                </div>

                {open && <NewFolderPopUp open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} createNew={createNew} />}

                {openRe && <RenameFolderPopUp openRe={openRe} setOpenRe={setOpenRe} handleClickOpenRe={handleClickOpenRe} handleCloseRe={handleCloseRe} renameFunc={renameFunc} prev={parent} />}

                {show && <ConfirmationPopUp show={show} handleCancel={handleCancel} deleteFolder={deleteFolder} password={password} setPassword={setPassword} />}
            </div>
        </section>
    );
};

export default DashboardFolder;