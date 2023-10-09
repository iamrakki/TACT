import React, { useCallback, useContext, useEffect, useState } from 'react';
import './DashboardDocuments.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import CryptoJS from "crypto-js";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDropzone } from 'react-dropzone';
import { BlockchainAuthContext } from '../../../../Context/UserContext/BlockchainContext';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import DashboardLinearLoader from './DashboardLinearLoader';
import DashboardFolderPopUp from './DashboardFolderPopUp';
import QRCode from "qrcode";
import Gifloader from '../../../../Components/Shared/GifLoader/Gifloader';
import SubscriptionWarnPopup from '../../../../Components/Shared/SubscriptionWarnPopup';

const DashboardAddDocuments = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [walletAddress, setWalletAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUp, setLoadingUp] = useState(false);
    const { mintNFT } = useContext(BlockchainAuthContext);
    const [src, setSrc] = useState("");
    const { user, allUser, secret, folderStructure, setUserRefetch, userRefetch, setFolderStructure } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [warnOpen, setWarnOpen] = useState(false);
    const [uploadTime, setUploadTime] = useState(false);

    const maxDoc = {
        basic: 2,
        foundationY: 100,
        foundationM: 100,
        intermediateY: 200,
        intermediateM: 200,
        enterpriseY: 500,
        enterpriseM: 500,
    };

    const warnHandleOpen = () => {

        setWarnOpen(true);
    };
    // console.log(modeOpen, "mode");

    // console.log(folderStructure);
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

    const bytesToMB = async (bytes) => {
        const megabytes = bytes / (1024 * 1024);
        let theSize = megabytes.toFixed(2);
        if (theSize > 50) {
            return false;
        }
        else {
            return theSize;

        }
    }
    const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        window.scrollTo(0, 0);
        sessionStorage.setItem("countDoc", 0);
        dataFetch();
    }, []);

    // Callback function to handle the file drop event
    const onDrop = useCallback(async (acceptedFiles) => {
        // Do something with the uploaded files (e.g., send them to the server)
        setIsLoading(true);

        try {
            // Simulate an asynchronous upload operation (replace this with your actual upload logic)
            // Simulate an asynchronous upload operation (replace this with your actual upload logic)
            // console.log('Uploaded Files:', acceptedFiles);
            setUploadTime(true);
            const file = acceptedFiles[0];

            const givenDate = new Date(user?.type_of_subscription?.purchasedDate);
            const currentDate = new Date();

            const givenYear = givenDate.getFullYear();
            const givenMonth = givenDate.getMonth();
            const givenDay = givenDate.getDate();

            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();

            const oneYearAfterGivenDate = new Date(givenYear + 1, givenMonth, givenDay);
            const oneMonthAfterGivenDate = new Date(givenYear, givenMonth + 1, givenDay);

            let currentCer = user?.type_of_subscription?.docs;
            let userSub = user?.type_of_subscription?.name;
            let lastChar = userSub[userSub.length - 1];


            // console.log(acceptedFiles);
            let updatedFiles = [];
            let updatedFileNames = [];
            let walletAddresses = [];

            if (user?.types == "individual" && acceptedFiles?.length > 1) {
                toast.dismiss();
                toast.error("Please take any of subscription");
                setUploadTime(false);
                setIsLoading(false);
                return "t";
            }

            for (let i = 0; i < acceptedFiles?.length; i++) {
                const file = acceptedFiles[i];

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const tracks = user?.type_of_subscription?.track;
                const currentYearIndex = tracks.findIndex(entry => entry.year === currentYear);

                const updatedCount = Number(sessionStorage.getItem("countDoc"));

                console.log("count", maxDoc[user?.type_of_subscription?.name] - tracks[currentYearIndex].docs)
                // let upTemp = updatedCount > 0 ? updatedCount : 0;
                if ((tracks[currentYearIndex].docs + acceptedFiles?.length - 1) >= maxDoc[user?.type_of_subscription?.name]) {
                    setIsLoading(false);
                    // return toast.error(`Select only ${maxDoc[user?.type_of_subscription?.name] - tracks[currentYearIndex].docs} Docs`)
                    return toast.error("Please take any of subscription");

                }

                let subs = (lastChar === 'M') ? oneMonthAfterGivenDate : oneYearAfterGivenDate;
                // console.log(currentDate, oneYearAfterGivenDate, lastChar, subs)
                // isExpire?
                if (currentYear > givenYear || currentDate >= subs) {
                    await axios.put("https://api.zecurechain.com/api/v1/user/get-expired", {}, {
                        headers: {
                            "Content-Type": "Application/json",
                            Authorization: `Bearer ${JSON.parse(token)}`,
                        },
                    })
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                    setUploadTime(false);
                    setIsLoading(false);
                    return toast.error("Your subscription has expired!");
                }

                if ((tracks[currentYearIndex].docs + updatedCount) < maxDoc[user?.type_of_subscription?.name]) {
                    console.log("enter")
                    const fileExtension = file?.name.split(".").pop().toLowerCase();
                    if ([".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt"].includes("." + fileExtension)) {
                        // File is allowed, you can proceed with form submission or other processing logic here
                        let checkTheSize = await bytesToMB(file.size);
                        if (checkTheSize && checkTheSize <= 50) {


                            updatedFiles.push(file);
                            updatedFileNames.push({
                                file: file?.name,
                                size: checkTheSize,
                            });
                            walletAddresses.push(user?.walletAddress);

                            sessionStorage.setItem("countDoc", updatedCount + 1);
                            // cnt

                            // console.log("count after update:", count);
                        }
                        else {
                            toast.dismiss();
                            // console.log("Enter deAccess");
                            toast.error("Maximum File Size 50 MB");
                        }

                    } else {
                        toast.dismiss();
                        toast.error("File is not allowed");
                        // File is not allowed, display an error message or take appropriate action
                        console.error("File is not allowed");
                    }
                }
                else {
                    toast.dismiss();
                    toast.error("Document Count Limit Exceeded");
                }
            }

            setFiles((oldFiles) => [...oldFiles, ...updatedFiles]);
            setFileNames((oldFiles) => [...oldFiles, ...updatedFileNames]);
            setWalletAddress((old) => [...old, ...walletAddresses]);
            setTimeout(() => {
                setUploadTime(false);
            }, 1500);



        } catch (error) {
            toast.dismiss();
            toast.error("Something is wrong");
            console.error('Error uploading files:', error);
        } finally {
            setIsLoading(false);
            // setProgress(0);
        }
    }, [maxDoc, user]);
    // Simulate an asynchronous upload operation to the backend
    const uploadFileToBackend = async (file) => {
        // const passingToBlockchain = await mintNFT([file], [user?.walletAddress]);
        return new Promise((resolve) => {
            // Simulating the upload process and receiving the backend response
            setTimeout(() => {
                // Replace this with your actual API call to the backend
                const randomResponse = 200;
                resolve({ status: randomResponse });
            }, 2000); // Simulating a 2-second upload delay
        });
    };
    // Use the `useDropzone` hook to set up the drag and drop area
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled: isLoading,
    });

    const generateQR = async (
        IPFS,
        tHash,
        date,
        time,
        name,
        email,
        file
    ) => {
        try {
            let text = `document_Name: ${file}, Person_Name: ${name}, Date: ${date}, Time: ${time}, Document Hash: ${IPFS}, Transaction Hash: ${tHash}, Email: ${email}.`;
            const src = await QRCode.toDataURL(text); // Wait for QR code generation
            return src; // Return the generated QR code
        } catch (err) {
            console.error(err, "err");
            return null; // Return null in case of an error
        }
    };
    // useEffect(() => {
    //     if (localStorage.getItem("hideNested") == "true") {
    //         setLoadingUp(() => true);
    //     }
    //     else {
    //         setLoadingUp(() => false);
    //     }
    // }, [loadingUp])
    // console.log(user)
    const upBlockchain = async (folderData) => {
        try {
            setLoadingUp(true);
            localStorage.setItem("hideNested", "true");
            // console.log(passingToBlockchain);

            const givenDate = new Date(user?.type_of_subscription?.purchasedDate);
            const currentDate = new Date();

            const givenYear = givenDate.getFullYear();
            const givenMonth = givenDate.getMonth();
            const givenDay = givenDate.getDate();

            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();

            const oneYearAfterGivenDate = new Date(givenYear + 1, givenMonth, givenDay);
            const oneMonthAfterGivenDate = new Date(givenYear, givenMonth + 1, givenDay);
            let userSub = user?.type_of_subscription?.name;
            let lastChar = userSub[userSub.length - 1];

            const tracks = user?.type_of_subscription?.track;
            const currentYearIndex = tracks.findIndex(entry => entry.year === currentYear);

            if (user?.types == "individual" && user?.type_of_subscription?.name == "basic" && tracks[currentYearIndex].docs >= 2) {
                setLoadingUp(false);
                return toast.error("Please take any of subscription");
            }

            let subs = (lastChar === 'M') ? oneMonthAfterGivenDate : oneYearAfterGivenDate;
            // console.log(currentDate, oneYearAfterGivenDate, lastChar, subs)
            // isExpire?
            if (currentYear > givenYear || currentDate >= subs) {
                await axios.put("https://api.zecurechain.com/api/v1/user/get-expired", {}, {
                    headers: {
                        "Content-Type": "Application/json",
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                setLoadingUp(false);
                return toast.error("Your subscription has expired!");
            }

            if ((tracks[currentYearIndex].docs) < maxDoc[user?.type_of_subscription?.name]) {
                // console.log(folderStructure)
                // console.log(files);
                // console.log(fileNames);
                // console.log(files, walletAddress);
                const passingToBlockchain = await mintNFT(files, walletAddress);
                // console.log(passingToBlockchain);
                if (passingToBlockchain) {
                    let n = files?.length;
                    // Get the user's locale
                    const userLocale = navigator.language || navigator.userLanguage;

                    // Create a new Date object to get the current date and time
                    const currentDate = new Date();

                    // Format the date and time based on the user's locale
                    const formattedDate = currentDate.toLocaleDateString(userLocale, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });

                    const formattedTime = currentDate.toLocaleTimeString(userLocale, {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                    const qrCodes = [];
                    for (let i = 0; i < n; i++) {
                        let genQr = await generateQR(
                            passingToBlockchain?.ipfsHashes[i],
                            passingToBlockchain?.transactionHash,
                            formattedDate,
                            formattedTime,
                            user?.org_individual_Name,
                            user?.email,
                            fileNames[i]?.file
                        );
                        if (genQr) {
                            qrCodes.push(genQr); // Push the generated QR code into qrCodes
                        }
                    }
                    // console.log(qrCodes);
                    await axios.post("https://api.zecurechain.com/api/v1/document/create-document", {
                        ipfsHashes: passingToBlockchain?.ipfsHashes,
                        transactionHash: passingToBlockchain?.transactionHash,
                        isInFolder: folderData ? folderData?.isInFolder : folderStructure?.isInFolder,
                        folder: folderData ? folderData?.folder : folderStructure?.folder,
                        isSub: folderData ? folderData?.isSub : folderStructure?.isSub,
                        folderId: folderData ? folderData?.folderId : folderStructure?.folderId,
                        email: user?.email,
                        issuerName: user?.org_individual_Name ? user?.org_individual_Name : user?.email,
                        fileName: fileNames,
                        qr: qrCodes,
                        localDate: formattedDate,
                        localTime: formattedTime,
                        n: n
                    }, {
                        headers: {
                            "Content-Type": "Application/json",
                            Authorization: `Bearer ${JSON.parse(token)}`,
                        },
                    })
                        .then(res => {
                            if (res.status == 200) {
                                // toast.success("Uploaded successfully!");
                                setFileNames([]);
                                setFiles([]);
                                setSrc("");
                                setWalletAddress([]);
                                setUserRefetch(!userRefetch);
                                let info = { folder: folderData ? folderData?.folder : folderStructure?.folder, number: n, sub: "Document" };
                                localStorage.setItem("Info", JSON.stringify(info));
                                navigate("/dashboard/dashboard-upload-confirmation");
                                setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
                                sessionStorage.setItem("countDoc", 0);
                                setUserRefetch(!userRefetch);

                            }
                        })
                        .catch((e) => {
                            console.log(e);
                            toast.error(`${e?.response?.data?.message}`);
                        })
                        .finally(() => {
                            localStorage.removeItem("hideNested");
                            setLoadingUp(false);
                        });
                }
                else {
                    toast.error("Failed to upload!");
                }
                localStorage.removeItem("hideNested");
                setLoadingUp(false);
            }
            else {
                setLoadingUp(false);
                toast.error("Document Count Limit Exceeded");
            }

        } catch (error) {
            console.log(error);
            setLoadingUp(false);
            toast.error("Failed to upload!");
        }
    }
    const warnHandleClose = async (folderData, isPress) => {
        setWarnOpen(false);
        // console.log(folderData)
        if (folderData) {
            // console.log(folderData)
            setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
        }
        // console.log(folderStructure);
        if (isPress != "backdropClick") {

            await upBlockchain(folderData);
        }
    };


    const cancel = async (indexBase) => {
        // console.log("decrease", indexBase);
        // decreasing();

        // Remove from files
        const updatedFiles = files.filter((file, index) => index !== indexBase);

        // Remove from fileNames
        const updatedFileNames = fileNames.filter((fileName, index) => index !== indexBase);
        // Remove from wallet
        const updatedWallet = walletAddress.filter((wallet, index) => index !== indexBase);
        // updateCnt = updatedFiles.length - 1;
        // console.log(updatedFiles.length - 1)
        setFiles(() => updatedFiles);
        setFileNames(() => updatedFileNames);
        setWalletAddress(() => updatedWallet);
        const getOld = Number(sessionStorage.getItem("countDoc"));
        sessionStorage.setItem("countDoc", getOld - 1);
        // console.log(
        //     files,
        //     fileNames,
        //     walletAddress);
    }
    // console.log("popup", loadingUp);
    // localStorage.setItem("hideNested", "true");
    return (
        <section style={{ minHeight: '50vh' }}>
            {
                loadingUp ? <Gifloader name={"Document"} /> :

                    <div className='container'>
                        <h4 className='dTitle'>My Documents</h4>
                        <p
                            style={{
                                color: "#545454",
                                fontFamily: "Saira",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "normal",
                                whiteSpace: "2px"
                            }}
                            className=""
                        >
                            5 free Count to Store on BlockChain
                        </p>
                        {/* <p className='text-danger fw-bolder pt-3'>1 free Count to Store on BlockChain</p> */}

                        <div className='size-div mx-auto'>
                            <div className='upload-div mx-auto text-center w-100 mb-5' {...getRootProps()} style={{ cursor: "pointer", background: isDragActive ? '#f2f2f2' : 'white', }}>
                                <div className='upload-space' >
                                    <AddCircleOutlineOutlinedIcon fontSize='large' />

                                    <input {...getInputProps()} />
                                    {isLoading ? (
                                        <p>Uploading... {Math.round(0)}%</p>
                                    ) : isDragActive ? (
                                        <p>Drop the files here ...</p>
                                    ) : (
                                        <>
                                            <h4 className='pt-2'>Drag & Drop or Selected File</h4>
                                            <p>Maximum File Size  50 MB</p></>
                                    )}

                                </div>
                            </div>
                            {fileNames.length > 0 &&
                                fileNames?.map((data, index) =>
                                    <div className='row gy-3 mt-2' key={index}>
                                        <div className='col-12'>
                                            <div className='doc-progress w-100'>
                                                <div className='f-child'>
                                                    <img src="/assets/images/Files.png" alt="" className='img-fluid' />
                                                </div>
                                                <div className='s-child'>
                                                    <p className='mb-0'>{data?.file}</p>
                                                    <p className='mb-0 mt-0'><small className='text-secondary'>{data?.size} MB</small></p>
                                                    {/* <Box sx={{ height: 20 }}>
                                                <LinearProgressWithLabel value={progress} />
                                            </Box> */}
                                                    <DashboardLinearLoader cancel={cancel} index={index} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                            <div className='text-center titleDoc mt-3'>
                                {
                                    loadingUp ? <Button variant='warning' className="text-global px-4 py-2 rounded-pill" disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span>Loading...</span>
                                    </Button> :
                                        <Button
                                            variant="warning"
                                            className="text-global px-4 py-2 rounded-pill"
                                            onClick={() => { warnHandleOpen(); }}
                                            disabled={!files || files.length == 0 || uploadTime}
                                        >
                                            Upload on Blockchain
                                        </Button>
                                }
                            </div>

                        </div>

                        {warnOpen && <DashboardFolderPopUp warnOpen={warnOpen} setWarnOpen={setWarnOpen} warnHandleOpen={warnHandleOpen} warnHandleClose={warnHandleClose} data={data} dataFetch={dataFetch} />}
                    </div>
            }
        </section >
    );
};

export default DashboardAddDocuments;