import React, { useContext, useEffect, useRef, useState } from 'react';
import './DashboardCertificates.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import html2canvas from "html2canvas";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import QRCode from 'qrcode'
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { BlockchainAuthContext } from '../../../../Context/UserContext/BlockchainContext';
import ShowUser from './ShowUser';

import { EditorState, ContentState, convertToRaw, convertFromRaw, Modifier, SelectionState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {
    toggleCustomInlineStyle, getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import * as XLSX from 'xlsx';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const DashboardCreateCertificateBulk = () => {
    const navigate = useNavigate();
    const { isInFolder, folder, isSub, folderId } = useParams();
    const { user, allUser, userRefetch, setUserRefetch, cerTemp } = useContext(UserAuthContext);
    const { mintNFT, } = useContext(BlockchainAuthContext);
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [sig1, setSig1] = useState({ origin: null, show: null });
    const [sig2, setSig2] = useState({ origin: null, show: null });
    const [logo, setLogo] = useState({ origin: null, show: null });
    const [dateCom, setDateCom] = useState("");
    const [dateValid, setDateValid] = useState("");
    const [img, setImg] = useState('');
    const certificateTemplate = useRef();
    const [date, setDate] = useState("");
    const [date2, setDate2] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const qrCodeBody = useRef(null);
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [src, setSrc] = useState("");
    const [upType, setUpType] = useState("");
    const [tempImgs, setTempImgs] = useState([]);
    const [elements, setElements] = useState({ name: null, tHash: null, ipHash: null, qr: null });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access specific query parameters
    const isBulk = queryParams.get('isBulk');
    let catchId = localStorage.getItem('imgID');
    const imgData = cerTemp.find(data => data?.id == catchId);
    console.log("bulk", isBulk)
    // const data = draftToHtml(convertToRaw(valueAbout.getCurrentContent()));
    // Default font and color styles
    const defaultFont = 'Playball';
    const defaultColor = 'rgb(0, 0, 139)';


    const [nameRich, setNameRich] = useState(() => EditorState.createEmpty());
    const [detailsRich, setDetailsRich] = useState(() => EditorState.createEmpty());
    // useEffect(() => {
    //     const fontSize = getSelectionCustomInlineStyle(nameRich, ['FONTSIZE',]).FONTSIZE

    //     setNameRich(() => toggleCustomInlineStyle(nameRich, 'fontFamily', 'Playball', nameRich, 'colorPicker', 'rgb(0, 0, 139)'));

    // }, [nameRich]);
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(null);

    // onchange event
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);

                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }


    const handleClickOpen = () => {
        setOpen(() => true);
    };

    const handleClose = () => {
        setOpen(() => false);
    };
    const [web3Info, setWeb3Info] = useState({
        IPFS: null,
        tHash: null,
        TId: null
    });
    const [loading, setLoading] = useState(false);
    const handleFileUpload = (e) => {
        setSelectedFiles([...e.target.files]);
    };


    const generateQR = async (IPFS, tHash) => {
        try {
            console.log("after gen", IPFS, tHash);
            let text = `Name: ${name}, Course_Details: ${details}, Date: ${date}, Issuer: ${(user?.org_individual_Name) ? user?.org_individual_Name : user?.email}, Certificate Hash: ${IPFS}, Transaction Hash: ${tHash} .`
            await QRCode.toDataURL(text).then(setSrc);
        } catch (err) {
            console.error(err, "err");
        }
    };

    useEffect(() => {
        // exportAsImage(certificateTemplate.current, "heelo");
        window.scrollTo(0, 0);
        // generateQR();
        if (img) {
            exportAsImage();
        }
    }, [img]);

    useEffect(() => {
        // Check if qrCodeBody.current is set and if it is an HTMLCanvasElement

        generateQR();
    }, []);


    const exportAsImage = async () => {
        if (certificateTemplate.current) {

            const canvas = await html2canvas(certificateTemplate.current, {
                allowTaint: true,
                useCORS: true,
            });
            const image = canvas.toDataURL("image/jpeg", 1.0);
            // download the image
            // console.log(image, "img");
            setImg(() => image);
            const blobing = await (await fetch(image)).blob();
            setUpType(() => blobing);
            // console.log(blobing);
        }
    };

    const formatDate = (inputDate) => {
        // Parse the input date string to a Date object
        const dateObject = new Date(inputDate);

        // Months in JavaScript are zero-based (0 - January, 1 - February, etc.)
        // Create an array of month names
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Extract the day, month, and year from the Date object
        const day = dateObject.getDate();
        const month = months[dateObject.getMonth()];
        const year = dateObject.getFullYear();

        // Format the date as "on July 20, 2023"
        const formattedDate = `${((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 6) || (imgData?.id == 7) || (imgData?.id == 8)) ? "" : "on"} ${month} ${day}, ${year}`;
        return formattedDate;
    }

    const fixingDateCom = (e) => {
        // console.log("date", e.target.value);
        const formattedDate = formatDate(e.target.value);
        setDate(() => e.target.value);
        setDateCom(() => formattedDate);
    }
    const fixingDateValid = (e) => {
        const formattedDate = formatDate(e.target.value);
        setDate2(() => e.target.value);
        setDateValid(() => formattedDate);
    }
    const maxCharacterLimit = 23;
    useEffect(() => {
        const contentState = nameRich.getCurrentContent();
        const plainText = contentState.getPlainText('');
        const characterCount = plainText.length;
        // console.log("plain", plainText);
        setName(() => plainText);
        // Check if the character count exceeds the limit
        if (characterCount > maxCharacterLimit) {
            // Truncate the content and prevent further input
            const truncatedText = plainText.slice(0, maxCharacterLimit);
            const truncatedContentState = ContentState.createFromText(truncatedText);
            const truncatedEditorState = EditorState.createWithContent(truncatedContentState);

            // Set the selection to the end of the truncated content
            const selection = truncatedEditorState.getSelection();
            const newSelection = selection.merge({
                anchorOffset: maxCharacterLimit,
                focusOffset: maxCharacterLimit,
            });
            const finalEditorState = EditorState.acceptSelection(truncatedEditorState, newSelection);

            setNameRich(() => finalEditorState);
            toast.error("Character limit reached!");
        }
    }, [nameRich]);
    const handleInputChangeName = (editorState) => {
        setNameRich(() => editorState);
        // console.log(editorState)
    };

    const maxCDetails = 40;
    useEffect(() => {
        const contentState = detailsRich.getCurrentContent();
        const plainText = contentState.getPlainText('');
        const characterCount = plainText.length;
        setDetails(() => plainText);
        // Check if the character count exceeds the limit
        if (characterCount > maxCDetails) {
            // Truncate the content and prevent further input
            const truncatedText = plainText.slice(0, maxCDetails);
            const truncatedContentState = ContentState.createFromText(truncatedText);
            const truncatedEditorState = EditorState.createWithContent(truncatedContentState);

            // Set the selection to the end of the truncated content
            const selection = truncatedEditorState.getSelection();
            const newSelection = selection.merge({
                anchorOffset: maxCDetails,
                focusOffset: maxCDetails,
            });
            const finalEditorState = EditorState.acceptSelection(truncatedEditorState, newSelection);

            setDetailsRich(() => finalEditorState);
            toast.error("Character limit reached!");
        }
    }, [detailsRich]);
    const handleInputChangeDetails = (e) => {

        setDetailsRich(() => e);
    };

    const validEmail = async (e) => {

        const finding = allUser.find(mail => mail?.email === e.target.value);
        if (finding) {

            setEmail(() => e.target.value);
            setWalletAddress(() => finding?.walletAddress);
        }
        else {

            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);

            await axios.post("https://api.zecurechain.com/api/v1/e-walletAddress", { email: e.target.value }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        // console.log(res.data);
                        setEmail(() => e.target.value);
                        setWalletAddress(() => res.data?.data?.walletAddress);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Something is wrong!");
                    setEmail(() => "");
                })

        }
    }
    const validEmailExcel = async (e) => {

        const finding = allUser.find(mail => mail?.email === e);
        if (finding) {

            setEmail(() => e);
            setWalletAddress(() => finding?.walletAddress);
        }
        else {

            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);

            await axios.post("https://api.zecurechain.com/api/v1/e-walletAddress", { email: e }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        // console.log(res.data);
                        setEmail(() => e);
                        setWalletAddress(() => res.data?.data?.walletAddress);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Something is wrong!");
                    setEmail(() => "");
                })

        }
    }
    const validEmailExcelArray = async (e) => {

        const finding = allUser.find(mail => mail?.email === e);
        if (finding) {

            // setEmail(() => e);
            return finding?.walletAddress;
        }
        else {

            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);

            const res = await axios.post("https://api.zecurechain.com/api/v1/e-walletAddress", { email: e }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
            if (res.status == 200) {
                // console.log(res.data);
                // setEmail(() => e);
                return res.data?.data?.walletAddress;
            }
        }
    }

    const convertExcelDate = (excelDate) => {
        const dateObj = new Date((excelDate - 25569) * 86400 * 1000); // Convert to milliseconds

        // Step 2: Format the Date object to "YYYY-MM-DD" format
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 to get the correct month
        const day = String(dateObj.getDate()).padStart(2, "0");

        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
    // submit event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);


            setExcelData(() => data);
            console.log("Got Excel Data", data[0]);
            validEmailExcel(data[0].Email);
            // setEmail(() => data[0].Email);
            setName(() => data[0].Name)
            setDetails(() => data[0]?.Course);
            // setNameRich(() => data[0].Name);
            // setDetailsRich(() => data[0]?.Course);

            const convertOne = convertExcelDate(data[0]?.Date_of_Completion);
            const convertTwo = convertExcelDate(data[0]?.Validity);

            const formattedDateOne = formatDate(convertOne);
            const formattedDateTwo = formatDate(convertTwo);

            setDate(() => convertOne);
            setDateCom(() => formattedDateOne);
            setDate2(() => convertTwo);
            setDateValid(() => formattedDateTwo);

            const blocksFromHtml = htmlToDraft(data[0].Name);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            // console.log(EditorState.createWithContent(contentState));
            setNameRich(() => EditorState.createWithContent(contentState));

            const blocksFromHtml2 = htmlToDraft(data[0].Course);
            const contentState2 = ContentState.createFromBlockArray(blocksFromHtml2?.contentBlocks, blocksFromHtml2?.entityMap);
            // console.log(EditorState.createWithContent(contentState2));

            setDetailsRich(() => EditorState.createWithContent(contentState2));
        }
    }
    const generateQRExcel = async (nameex, detailsex, dateex, userex, IPFS, tHash) => {
        try {
            // console.log("after gen", IPFS, tHash);
            let text = `Name: ${nameex}, Course_Details: ${detailsex}, Date: ${dateex}, Issuer: ${userex}, Certificate Hash: ${IPFS}, Transaction Hash: ${tHash} .`
            await QRCode.toDataURL(text).then(setSrc);
        } catch (err) {
            console.error(err, "err");
        }
    };
    const subCerMulti = async (e) => {
        // e.preventDefault();
        setLoading(true);
        // let dateOfCompletion = e.target.dateOfCompletion.value;
        // let validity = e.target.validity.value;


        let emailEX = [];
        let nameEX = [];
        let courseNameEX = [];
        let dateOfCompletionEX = [];
        let validityEX = [];
        let dateOfCompletionImgEX = [];
        let validityImgEX = [];
        let walletAddressEX = [];
        let isInFolderEX = isInFolder;
        let folderEX = folder;
        let isSubEX = isSub;
        let folderIdEX = folderId;
        let hashEX;
        let ipHashEX = [];
        let issuerEX = user?.email;
        let issuerNameEX = user?.org_individual_Name ? user?.org_individual_Name : "";
        let certificateEX = [];
        let n = excelData?.length;
        let logo1 = sig1?.origin;
        let logo2 = logo?.origin;
        let logo3 = sig2?.origin;
        let qrEX = [];

        for (let i = 0; i < excelData?.length; i++) {

            emailEX.push(excelData[i].Email);
            nameEX.push(excelData[i].Name);
            courseNameEX.push(excelData[i].Course);
            let dateF = formatDate(excelData[i].Date_of_Completion);
            let dateE = formatDate(excelData[i].Date_of_Completion);
            let dateFX = convertExcelDate(excelData[i].Date_of_Completion);
            let dateEX = convertExcelDate(excelData[i].Date_of_Completion);
            dateOfCompletionImgEX.push(dateF);
            validityImgEX.push(dateE);
            dateOfCompletionEX.push(dateFX);
            validityEX.push(dateEX);
            let wallet = await validEmailExcelArray(excelData[i].Email);
            await generateQRExcel(excelData[i].Name, excelData[i].Course, dateFX, user?.org_individual_Name ? user?.org_individual_Name : user?.email, undefined, undefined)
            if (wallet) { walletAddressEX.push(wallet); };

            qrEX.push(src);
            // console.log(src);
        }
        // console.log(qrEX);
        const dataExcel = {
            nameEX: nameEX,
            courseNameEX: courseNameEX,
            dateOfCompletionImgEX: dateOfCompletionImgEX,
            qrEX: qrEX
        };

        const dataForm = new FormData();
        dataForm.append("logo1", logo1);
        dataForm.append("logo2", logo2);
        dataForm.append("logo3", logo3);
        dataForm.append("n", excelData?.length);
        dataForm.append("issuerEX", issuerEX);
        dataForm.append("issuerNameEX", issuerNameEX);
        dataForm.append("dataExcel", JSON.stringify(dataExcel));
        // dataForm.append("nameEX", nameEX);
        let upImgs = [];

        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);
        await axios.post("https://api.zecurechain.com/api/v1/certificate/convertToImage", dataForm, {
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(async res => {
                if (res.status == 200) {
                    console.log(res.data);
                    setTempImgs(() => res.data.data);
                    for (let i = 0; i < (res.data?.data).length; i++) {
                        let blobing = await (await fetch(res.data?.data[i])).blob();
                        let file = new File([blobing], 'image.jpg', { type: 'image/jpeg' });
                        upImgs.push(file);
                        certificateEX.push(res.data?.data[i]);
                    }
                    // console.log(upImgs);
                    const passingToBlockchain = await mintNFT(upImgs, walletAddressEX);
                    // console.log(passingToBlockchain?.ipfsHashes[0], passingToBlockchain?.transactionHash);

                    for (let i = 0; i < (res.data?.data).length; i++) {
                        ipHashEX.push(passingToBlockchain?.ipfsHashes[i]);
                    }

                    hashEX = passingToBlockchain?.transactionHash;

                    const secondData = {
                        emailEX,
                        nameEX,
                        courseNameEX,
                        dateOfCompletionEX,
                        validityEX,
                        isInFolderEX,
                        folderEX,
                        isSubEX,
                        folderIdEX,
                        hashEX,
                        ipHashEX,
                        issuerEX,
                        issuerNameEX,
                        certificateEX,
                        qrEX,
                        n
                    }

                    await axios.post("https://api.zecurechain.com/api/v1/certificate/createDataWithExcel", secondData, {
                        headers: {
                            "Content-Type": "Application/json",
                            Authorization: `Bearer ${JSON.parse(token)}`,
                        }
                    })
                        .then(res => {
                            if (res.status == 200) {
                                toast.success("Successfully uploaded all!");
                                emailEX = [];
                                nameEX = [];
                                courseNameEX = [];
                                dateOfCompletionEX = [];
                                validityEX = [];
                                dateOfCompletionImgEX = [];
                                validityImgEX = [];
                                walletAddressEX = [];
                                isInFolderEX = "";
                                folderEX = "";
                                isSubEX = "";
                                folderIdEX = "";
                                hashEX = "";
                                ipHashEX = [];
                                issuerEX = "";
                                issuerNameEX = "";
                                certificateEX = [];
                                n = null;
                                logo1 = "";
                                logo2 = "";
                                logo3 = "";
                                qrEX = [];
                                e.target.reset();
                                setName("");
                                setDetails("");
                                setSig1("");
                                setSig2("");
                                setLogo("");
                                setDateCom("");
                                setDateValid("");
                                setDate("");
                                setDate2("");
                                setUserRefetch(!userRefetch);
                            }
                        })
                        .catch((e) => {
                            toast.error("Something is wrong!");
                        })


                }
            })
            .catch((e) => {
                console.log(e);
                toast.error("Something is wrong!");
            })
            .finally(() => {

                setLoading(false);
            })

        setLoading(false);

    }

    const subCer = async (e) => {
        e.preventDefault();
        setLoading(true);
        // generateQR();

        let dateOfCompletion = e.target.dateOfCompletion.value;
        let validity = e.target.validity.value;
        console.log("Date", dateOfCompletion,
            validity);
        // console.log("sub", img);
        // let data1 = { email: email, name: name, courseName: details, dateOfCompletion: dateOfCompletion, validity: validity, certificate: img };
        exportAsImage();
        exportAsImage();
        if (!img) {
            exportAsImage();
        }
        // let finalImg = img;
        const data = new FormData();
        data.append("email", email);
        data.append("name", name);
        data.append("certificate", img);
        data.append("courseName", details);
        data.append("dateOfCompletion", dateOfCompletion);
        data.append("validity", validity);

        data.append("isInFolder", isInFolder);
        data.append("folder", folder);
        data.append("isSub", isSub);
        data.append("folderId", folderId);

        setWeb3Info({
            IPFS: null,
            tHash: null,
            TId: null
        });

        exportAsImage();
        const passingToBlockchain = await mintNFT([upType], [walletAddress]);

        if (passingToBlockchain && passingToBlockchain != null) {

            setWeb3Info({
                IPFS: passingToBlockchain?.ipfsHashes,
                tHash: passingToBlockchain?.transactionHash,
                TId: null
            });
            console.log("getting after call", passingToBlockchain?.ipfsHashes[0],
                passingToBlockchain?.transactionHash,);
            generateQR(passingToBlockchain?.ipfsHashes[0],
                passingToBlockchain?.transactionHash);
            exportAsImage();
            exportAsImage();
            exportAsImage();
            setElements({ name: name, tHash: passingToBlockchain?.transactionHash, ipHash: passingToBlockchain?.ipfsHashes, qr: src });
            data.append("hash", passingToBlockchain?.transactionHash);
            data.append("ipHash", passingToBlockchain?.ipfsHashes[0]);
            data.append("issuer", user?.email);
            data.append("issuerName", user?.org_individual_Name ? user?.org_individual_Name : "");
            data.append("qrCode", src);
            exportAsImage();
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);

            await axios.post("https://api.zecurechain.com/api/v1/certificate/create-certificate", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(token)}`,
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        toast.success("Successfully Uploaded");
                        // console.log(res.data);
                        e.target.reset();
                        setName("");
                        setDetails("");
                        setSig1("");
                        setSig2("");
                        setLogo("");
                        setDateCom("");
                        setDateValid("");
                        setDate("");
                        setDate2("");
                        handleClickOpen();
                        setUserRefetch(!userRefetch);
                    }
                    else {
                        console.log("errors from while saving");
                        toast.error("Something is wrong");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Something is wrong");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        else {
            toast.error("Something is wrong");
            console.log(passingToBlockchain?.ipfsHashes,
                passingToBlockchain?.transactionHash,);
            // console.log("errors from while saving2");
        }
        setLoading(false);
    }
    return (
        <section className='mb-5'>
            <div className='container mt-3 mb-5'>
                <div className='d-flex justify-content-start align-items-center' style={{ gap: '15px' }}>
                    <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                    <h4 className='dTitle'>Certificate</h4>
                </div>
                <p style={{
                    color: '#545454',
                    fontFamily: 'Saira',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                }}
                    className='ps-4 ms-3'
                >
                    choose your fonts and colors and fill details to preview certificate
                </p>
                {/* <p className='pt-2 text-secondary'>My Folder /Unitic services</p> */}

                <div className={`${(isBulk == 'false') ? 'd-none' : 'd-block'}`}>
                    <div className='widthHandle mx-auto mt-5 mb-4'>
                        <div className='w-100 box-cer' id="cerToSVG" ref={certificateTemplate}>
                            <img src={`${imgData?.temp}`} alt="" className='img-fluid' />
                            <img src={src} alt="logo" className={`${(imgData?.id == 5) ? `handleQrCodeV3CT${imgData?.id}` : 'handleQrCodeV2'} img-fluid`} width={80} />
                            <div className={`handleTextCerV1CT${imgData?.id}`}>
                                <h3 className='handleNameCerV3' dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(nameRich.getCurrentContent())) }}></h3>
                                <p className='mb-0 handleDetailsCerV3' dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(detailsRich.getCurrentContent())) }} ></p>
                                {
                                    ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 6) || (imgData?.id == 7) || (imgData?.id == 8)) ? <></> :
                                        <p className={`mb-0 handleDetailsDateV3`}>{dateCom}</p>
                                }

                                {console.log(imgData?.id)}
                            </div>
                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 6) || (imgData?.id == 7) || (imgData?.id == 8)) &&
                                <p className={`mb-0 handleDetailsDateV3 handleDetailsDateDefinite${imgData?.id}`}>{dateCom}</p>
                            }

                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) ? <></> :
                                    <div className={`handleImgCerV3CT${imgData?.id}`}>
                                        <div className='w-100 h-100 text-start'> <img src={sig1?.show} alt="" className='' /> </div>
                                        <div className='w-100 h-100 text-center'> <img src={logo?.show} alt="" className=' rounded-circle' /> </div>
                                        <div className='w-100 h-100 text-end'> <img src={sig2?.show} alt="" className='' />

                                        </div>
                                    </div>
                            }


                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) &&
                                <div className={`handleImgCerV4CT${imgData?.id}`}>

                                    <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' />
                                </div>
                            }
                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) &&
                                <div className={`handleImgCerV3CT${imgData?.id}`}>
                                    {/* <div className='w-100 h-100 text-center handleDiffLogo'> <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' /> </div> */}
                                    <img src={sig1?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className='' />
                                </div>
                            }


                        </div>
                    </div>

                    <div>
                        <div className='handleDownloadOfferSheet px-2 px-lg-0'>
                            <h5>Download our Excel Template fill Details and upload Again</h5>
                            <a href="/assets/msOffice/sampleOrigin.xlsx" download={true} className='mb-0 pt-1 downloadText' target='_blank'><FileDownloadOutlinedIcon /> Template Excel File</a>

                        </div>
                        <div className={`mx-auto text-center mt-3 px-2 px-lg-0 handleExcelPart`}>
                            <form className="form-group custom-form mx-auto text-center" onSubmit={handleFileSubmit}>
                                <h5>Upload your excel sheet</h5>
                                <input type="file" className="form-control my-3" required onChange={handleFile} />
                                <Button variant='success' type="submit">Upload Excel</Button>
                                {typeError && (
                                    <div className="alert alert-danger" role="alert">{typeError}</div>
                                )}
                            </form>

                        </div>

                        {/* <div className='mt-4 mb-5 form-issueV2 mx-auto text-center'>
                            <label>Upload your Signature</label> <br />
                            <input type="file" name="signature" onChange={(e) => {
                                setSig1({
                                    origin: e.target.files[0],
                                    show: URL.createObjectURL(e.target.files[0])
                                });
                                exportAsImage();
                            }} required accept="image/*" /> <br />
                            {((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) ? <></> : <>  <label>Upload your Signature2</label> <br />
                                <input type="file" name="signature2" onChange={(e) => {
                                    setSig2({
                                        origin: e.target.files[0],
                                        show: URL.createObjectURL(e.target.files[0])
                                    });
                                    exportAsImage();
                                }} required accept="image/*" /> <br /> </>}
                            <label>Upload your logo</label> <br />
                            <input type="file" name="logo" onChange={(e) => {
                                setLogo({
                                    origin: e.target.files[0],
                                    show: URL.createObjectURL(e.target.files[0])
                                });
                                exportAsImage();
                            }} required accept="image/*" /> <br />

                            <div className='text-center mx-auto mt-3'>
                                {
                                    loading ? <Button variant='warning' className="text-global px-4 py-2 rounded-pill" disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span>Loading...</span>
                                    </Button> :
                                        <Button variant='warning' className="text-global px-4 py-2 rounded-pill" onClick={() => {

                                            excelData?.length > 1 && subCerMulti();
                                        }}>Upload  on Blockchain</Button>
                                }
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className={`${(isBulk == 'true') ? 'd-none' : 'd-flex'}  justify-content-between align-items-start mt-4 mx-auto flex-column flex-lg-row gapping`}>
                    <div className='mx-auto w-100'>
                        <p className='text-center titleCr'>Please Fill the details for Certificate</p>

                        <div className='form-issue w-100 mt-4 mb-0 mb-lg-5'>
                            <form onSubmit={excelData?.length > 1 ? subCerMulti : subCer}>
                                <label>Receiver Email-Id</label> <br />
                                <input type="email" name="email" required value={email} onBlur={(e) => validEmail(e)} onChange={(e) => setEmail(e.target.value)} /> <br />
                                <label>Name</label> <br />
                                <Editor
                                    editorState={nameRich}
                                    onEditorStateChange={handleInputChangeName}
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName border mt-2 p-2"
                                    toolbarClassName="toolbarClassName text-black"
                                    toolbar={{
                                        options: ['inline', 'fontFamily', 'colorPicker'],
                                        inline: {
                                            options: ['bold', 'italic', 'underline']
                                        },
                                        fontFamily: {
                                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Courier New', 'Playball'],
                                        },
                                        colorPicker: {
                                            colors: ['rgb(0, 0, 139)', 'rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'], // Example of custom colors
                                        },
                                    }}

                                />
                                {/* <label>Name</label> <br />
                                <input type="text" name="name" value={name} onChange={handleInputChangeName} required /> <br /> */}
                                <label className='mt-3'>Course Name</label> <br />
                                <Editor
                                    editorState={detailsRich}
                                    onEditorStateChange={handleInputChangeDetails}
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName border mt-2 p-2"
                                    toolbarClassName="toolbarClassName text-black"
                                    toolbar={{
                                        options: ['inline', 'fontFamily', 'colorPicker'],
                                        inline: {
                                            options: ['bold', 'italic', 'underline'],
                                        },
                                        fontFamily: {
                                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Courier New'],
                                        },
                                        colorPicker: {
                                            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'], // Example of custom colors
                                        },
                                    }}
                                />

                                {/* <input type="text" name="courseName" value={details} onChange={handleInputChangeDetails} required /> <br /> */}
                                <label className='mt-3'>Date of Completion</label> <br />
                                <input type="date" name="dateOfCompletion" required value={date} onChange={(e) => {
                                    fixingDateCom(e);
                                    // generateQR();
                                }} /> <br />
                                <label>Validity</label> <br />
                                <input type="date" name="validity" required value={date2} onChange={(e) => fixingDateValid(e)} /> <br />
                                <label>Upload your Signature</label> <br />
                                <input type="file" name="signature" onChange={(e) => {
                                    setSig1({
                                        origin: e.target.files[0],
                                        show: URL.createObjectURL(e.target.files[0])
                                    });
                                    exportAsImage();
                                }} required accept="image/*" /> <br />
                                {((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) ? <></> : <>  <label>Upload your Signature2</label> <br />
                                    <input type="file" name="signature2" onChange={(e) => {
                                        setSig2({
                                            origin: e.target.files[0],
                                            show: URL.createObjectURL(e.target.files[0])
                                        });
                                        exportAsImage();
                                    }} required accept="image/*" /> <br /> </>}
                                <label>Upload your logo</label> <br />
                                <input type="file" name="logo" onChange={(e) => {
                                    setLogo({
                                        origin: e.target.files[0],
                                        show: URL.createObjectURL(e.target.files[0])
                                    });
                                    exportAsImage();
                                }} required accept="image/*" /> <br />

                                <div className='text-center titleCr mt-3'>
                                    {
                                        loading ? <Button variant='warning' className="text-global px-4 py-2 rounded-pill" disabled>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span>Loading...</span>
                                        </Button> :
                                            <Button variant='warning' className="text-global px-4 py-2 rounded-pill" type='submit'>Upload  on Blockchain</Button>
                                    }
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className='mx-auto mt-0 mt-lg-3 w-100'>
                        <div className='w-100 box-cer' id="cerToSVG" ref={certificateTemplate}>
                            <img src={`${imgData?.temp}`} alt="" className='img-fluid' />
                            <img src={src} alt="logo" className={`${(imgData?.id == 5) ? `handleQrCodeV3CT${imgData?.id}` : 'handleQrCodeV2'} img-fluid`} width={80} />
                            <div className={`handleTextCerV1CT${imgData?.id}`}>
                                <h3 className='handleNameCerV3' dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(nameRich.getCurrentContent())) }}></h3>
                                <p className='mb-0 handleDetailsCerV3' dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(detailsRich.getCurrentContent())) }} ></p>
                                {
                                    ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 6) || (imgData?.id == 7) || (imgData?.id == 8)) ? <></> :
                                        <p className={`mb-0 handleDetailsDateV3`}>{dateCom}</p>
                                }

                                {console.log(imgData?.id)}
                            </div>
                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 6) || (imgData?.id == 7) || (imgData?.id == 8)) &&
                                <p className={`mb-0 handleDetailsDateV3 handleDetailsDateDefinite${imgData?.id}`}>{dateCom}</p>
                            }

                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) ? <></> :
                                    <div className={`handleImgCerV3CT${imgData?.id}`}>
                                        <div className='w-100 h-100 text-start'> <img src={sig1?.show} alt="" className='' /> </div>
                                        <div className='w-100 h-100 text-center'> <img src={logo?.show} alt="" className=' rounded-circle' /> </div>
                                        <div className='w-100 h-100 text-end'> <img src={sig2?.show} alt="" className='' />

                                        </div>
                                    </div>
                            }


                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) &&
                                <div className={`handleImgCerV4CT${imgData?.id}`}>

                                    <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' />
                                </div>
                            }
                            {
                                ((imgData?.id == 3) || (imgData?.id == 4) || (imgData?.id == 5) || (imgData?.id == 7) || (imgData?.id == 8)) &&
                                <div className={`handleImgCerV3CT${imgData?.id}`}>
                                    {/* <div className='w-100 h-100 text-center handleDiffLogo'> <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' /> </div> */}
                                    <img src={sig1?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className='' />
                                </div>
                            }


                        </div>

                        <div className={`mx-auto text-center pt-3 ${(isBulk == 'false') && 'd-none'}`}>
                            <form className="form-group custom-form mx-auto text-center" onSubmit={handleFileSubmit}>
                                <input type="file" className="form-control my-3" required onChange={handleFile} />
                                <Button variant='success' type="submit">Upload Excel</Button>
                                {typeError && (
                                    <div className="alert alert-danger" role="alert">{typeError}</div>
                                )}
                            </form>

                        </div>
                    </div>
                    {/* <div className='mx-auto box-image3 mt-0 mt-lg-3' id="cerToSVG" ref={certificateTemplate}>
                        <img src={src} alt="logo" className='handleQrCode' />
                        <h3 className='handleNameCer'>{name}</h3>
                        <p className='mb-0 handleDetailsCer'>{details}</p>
                        <p className='mb-0 handleDetailsCer'>{dateCom}</p>
                        <div className='d-flex justify-content-center align-items-center handleImgCer'>
                            <div className='w-100 h-100 text-end'> <img src={sig1?.show} alt="" className='' /> </div>
                            <div className='w-50 h-100 text-center'> <img src={logo?.show} alt="" className=' rounded-circle' /> </div>
                            <div className='w-100 h-100 text-start'> <img src={sig2?.show} alt="" className='' /> </div>
                        </div>
                    </div> */}
                </div>
                {open && <ShowUser open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} elements={elements} />}
            </div>
        </section >
    );
};

export default DashboardCreateCertificateBulk;