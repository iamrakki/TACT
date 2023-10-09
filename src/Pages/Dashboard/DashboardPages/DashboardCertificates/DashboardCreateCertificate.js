import React, { useContext, useEffect, useRef, useState } from "react";
import "./DashboardCertificates.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Spinner } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import html2canvas from "html2canvas";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-hot-toast";
import QRCode from "qrcode";
import { UserAuthContext } from "../../../../Context/UserContext/UserContext";
import { BlockchainAuthContext } from "../../../../Context/UserContext/BlockchainContext";
import ShowUser from "./ShowUser";
import { getSelectedInlineStyle } from "draftjs-utils";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  SelectionState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from "draftjs-utils";
import * as XLSX from "xlsx";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Alert, Stack, Tooltip } from "@mui/material";
import UploadSuccess from "../../../../Components/Shared/UploadedSuccessfully/UploadSuccess";
import Gifloader from "../../../../Components/Shared/GifLoader/Gifloader";
import DashboardShowUserCard from "./DashboardShowUserCard";

const DashboardCreateCertificate = () => {
  const navigate = useNavigate();
  const { isInFolder, folder, isSub, folderId } = useParams();
  const { user, allUser, userRefetch, setUserRefetch, cerTemp, folderStructure, setFolderStructure } =
    useContext(UserAuthContext);
  // console.log(folderStructure);
  const { mintNFT } = useContext(BlockchainAuthContext);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [sig1, setSig1] = useState({ origin: null, show: null });
  const [sig2, setSig2] = useState({ origin: null, show: null });
  const [logo, setLogo] = useState({ origin: null, show: null });
  const [dateCom, setDateCom] = useState("");
  const [dateValid, setDateValid] = useState("");
  const [img, setImg] = useState("");
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
  const [bulkChecking, setBulkChecking] = useState(false);
  const [isWarn, setIsWarn] = useState(true);
  const [detailsCardShow, setDetailsCardShow] = useState(false);

  const [elements, setElements] = useState({
    name: null,
    tHash: null,
    ipHash: null,
    qr: null,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isFocusName, setIsFocusName] = useState(false);
  const [isFocusDetails, setIsFocusDetails] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentWidthD, setContentWidthD] = useState(0);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const inputDate1 = useRef(null);
  const inputDate2 = useRef(null);

  const handleLabelClick1 = () => {
    fileInputRef1?.current.click(); // Trigger the hidden file input when the label is clicked
  };

  const handleLabelClick2 = () => {
    fileInputRef2?.current.click(); // Trigger the hidden file input when the label is clicked
  };

  const handleLabelClick3 = () => {
    fileInputRef3?.current.click(); // Trigger the hidden file input when the label is clicked
  };

  // Access specific query parameters
  let isBulk = queryParams.get("isBulk");
  let catchId = localStorage.getItem("imgID");
  const imgData = cerTemp.find((data) => data?.id == catchId);

  useEffect(() => {
    if (isBulk == "true") {
      setBulkChecking(() => true);
    } else {
      setBulkChecking(() => false);
    }
  }, [isBulk]);
  // console.log(bulkChecking, 'bulkCheck');
  // const data = draftToHtml(convertToRaw(valueAbout.getCurrentContent()));
  // Default font and color styles
  const defaultFont = "Playball";
  const defaultColor = "rgb(0, 0, 139)";

  const [nameRich, setNameRich] = useState(() => EditorState.createEmpty());
  const [detailsRich, setDetailsRich] = useState(() =>
    EditorState.createEmpty()
  );
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
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Select Excel File Only");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleClickOpen = () => {
    setOpen(() => true);
  };

  const handleClose = () => {
    setUserRefetch(!userRefetch);
    setOpen(() => false);
  };
  const [web3Info, setWeb3Info] = useState({
    IPFS: null,
    tHash: null,
    TId: null,
  });
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const generateQR = async (IPFS, tHash) => {
    try {
      console.log("after gen", IPFS, tHash);
      let text = `Name: ${name}, Course_Details: ${details}, Date: ${date}, Issuer: ${user?.org_individual_Name ? user?.org_individual_Name : user?.email
        }, Certificate Hash: ${IPFS}, Transaction Hash: ${tHash} .`;
      await QRCode.toDataURL(text).then(setSrc);
    } catch (err) {
      console.error(err, "err");
    }
  };

  useEffect(() => {
    // exportAsImage(certificateTemplate.current, "heelo");
    // window.scrollTo(0, 0);
    // generateQR();
    if (img) {
      exportAsImage();
    }
  }, [img]);

  useEffect(() => {
    // Check if qrCodeBody.current is set and if it is an HTMLCanvasElement
    window.scrollTo(0, 0);
    if (catchId > 7) {
      navigate(-1);
      toast.error("Coming soon!");
    }
    if (user?.types != "issuer") {
      navigate("/");
    }
    generateQR();
  }, [catchId, user]);

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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract the day, month, and year from the Date object
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    const day2 = dateObject.getDate().toString().padStart(2, "0");
    const month2 = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are 0-indexed in JavaScript
    const year2 = dateObject.getFullYear();

    const formattedDateString = `${day}-${month}-${year} DD-MM-YEAR`;

    // Format the date as "on July 20, 2023"
    const formattedDate = `${imgData?.id == 3 ||
      imgData?.id == 4 ||
      imgData?.id == 5 ||
      imgData?.id == 7 ||
      imgData?.id == 8
      ? `${day2}-${month2}-${year2}`
      : `on ${month} ${day}, ${year}`
      }`;
    return formattedDate;
  };

  const fixingDateCom = (e) => {
    // console.log("date", e.target.value);
    const formattedDate = formatDate(e.target.value);
    setDate(() => e.target.value);
    setDateCom(() => formattedDate);
  };
  const fixingDateValid = (e) => {
    const formattedDate = formatDate(e.target.value);
    setDate2(() => e.target.value);
    setDateValid(() => formattedDate);
  };
  const maxCharacterLimit = 23;
  // useEffect(() => {
  //     const contentState = nameRich.getCurrentContent();
  //     const blockMap = contentState.getBlockMap();
  //     let lineCount = 0;
  //     let exceededLines = false;
  //     let lastValidBlockKey = null;
  //     let validBlocks = [];
  //     const plainText = contentState.getPlainText('');
  //     const characterCount = plainText.length;
  //     // console.log("plain", plainText);
  //     setName(() => plainText);
  //     // Check if the character count exceeds the limit

  //     blockMap.forEach((block) => {
  //         if (lineCount < 1) {
  //             if (block.getType() === 'unstyled') {
  //                 lineCount++;
  //                 lastValidBlockKey = block.getKey();
  //                 if (characterCount > maxCharacterLimit) {
  //                     // Truncate the content and prevent further input
  //                     const truncatedText = plainText.slice(0, maxCharacterLimit);
  //                     const truncatedContentState = ContentState.createFromText(truncatedText);
  //                     const truncatedEditorState = EditorState.createWithContent(truncatedContentState);

  //                     // Set the selection to the end of the truncated content
  //                     const selection = truncatedEditorState.getSelection();
  //                     const newSelection = selection.merge({
  //                         anchorOffset: maxCharacterLimit,
  //                         focusOffset: maxCharacterLimit,
  //                     });
  //                     const finalEditorState = EditorState.acceptSelection(truncatedEditorState, newSelection);

  //                     setNameRich(() => finalEditorState);
  //                     toast.dismiss();
  //                     toast.error("Character limit reached!");
  //                 }
  //             }

  //             validBlocks.push(block);
  //         } else {
  //             exceededLines = true;

  //         }
  //     });

  //     if (exceededLines) {
  //         const newContentState = ContentState.createFromBlockArray(validBlocks);
  //         const newEditorState = EditorState.createWithContent(newContentState);
  //         setNameRich(() => newEditorState);
  //         toast.dismiss();
  //         toast.error("Line limited");
  //     }

  // }, [nameRich]);
  const getAppliedStyles = (editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const endOffset = selection.getEndOffset();
    const currentBlock = currentContent.getBlockForKey(startKey);
    const text = currentBlock.getText();

    const inlineStyles = [];

    currentBlock.findStyleRanges(
      (character) =>
        startOffset <= character.offset && character.offset <= endOffset,
      (start, end) => {
        const style = currentBlock.getInlineStyleAt(start);

        if (style.size > 0) {
          style.forEach((styleType) => {
            inlineStyles.push(styleType);
          });
        }
      }
    );
    console.log(inlineStyles);
    return Array.from(new Set(inlineStyles)); // Remove duplicates
  };
  const test = () => {
    const appliedStyles = getAppliedStyles(nameRich);
    console.log(appliedStyles);
    console.log(draftToHtml(convertToRaw(nameRich.getCurrentContent())));
  };
  const handleInputChangeName = (editorState) => {
    // const currentInlineStyle = nameRich.getCurrentInlineStyle();
    // const currentInlineStyle = getSelectedInlineStyle(nameRich);
    // console.log(currentInlineStyle);

    setNameRich(() => editorState);
    // console.log(editorState)
  };
  let MAX_LINES = imgData?.id == 7 ? 3 : (imgData?.id == 3 ||
    imgData?.id == 4 ||
    imgData?.id == 5 ||
    imgData?.id == 6 ||
    imgData?.id == 8
    ? 2
    : 1);
  const maxCDetails = 40;

  // blockMap.forEach((block) => {
  //     if (block.getType() === 'unstyled') {
  //         const blockText = block.getText();
  //         if (blockText.length > MAX_CHARACTERS_PER_LINE) {
  //             const truncatedBlockText = blockText.slice(0, MAX_CHARACTERS_PER_LINE);
  //             const truncatedContentState = contentState.merge({
  //                 blockMap: contentState.getBlockMap().set(block.getKey(), block.merge({ text: truncatedBlockText })),
  //             });
  //             const newEditorState = EditorState.push(editorState, truncatedContentState, 'change-block-data');
  //         }
  //         setEditorState(newEditorState);

  //         exceededLines = true;
  //     }
  // });

  // useEffect(() => {
  //     const contentState = detailsRich.getCurrentContent();
  //     const blockMap = contentState.getBlockMap();
  //     let lineCount = 0;
  //     let exceededLines = false;
  //     let lastValidBlockKey = null;
  //     let validBlocks = [];

  //     blockMap.forEach((block) => {
  //         if (lineCount < MAX_LINES) {
  //             if (block.getType() === 'unstyled') {
  //                 lineCount++;
  //                 lastValidBlockKey = block.getKey();
  //                 const plainText = contentState.getPlainText('');
  //                 const characterCount = plainText.length;
  //                 setDetails(() => plainText);
  //                 // Check if the character count exceeds the limit

  //                 const blockText = block.getText();
  //                 // if (blockText.length > maxCDetails) {
  //                 //     const truncatedBlockText = blockText.slice(0, maxCDetails);
  //                 //     const truncatedContentState = contentState.merge({
  //                 //         blockMap: contentState.getBlockMap().set(block.getKey(), block.merge({ text: truncatedBlockText })),
  //                 //     });
  //                 //     const newEditorState = EditorState.push(detailsRich, truncatedContentState, 'change-block-data');
  //                 //     setDetailsRich(() => newEditorState)
  //                 // }

  //                 if ((blockText.length > maxCDetails)) {
  //                     // // Truncate the content and prevent further input
  //                     // const truncatedText = plainText.slice(0, maxCDetails);
  //                     // const truncatedContentState = ContentState.createFromText(truncatedText);
  //                     // const truncatedEditorState = EditorState.createWithContent(truncatedContentState);

  //                     // // Set the selection to the end of the truncated content
  //                     // const selection = truncatedEditorState.getSelection();
  //                     // const newSelection = selection.merge({
  //                     //     anchorOffset: maxCDetails,
  //                     //     focusOffset: maxCDetails,
  //                     // });
  //                     // const finalEditorState = EditorState.acceptSelection(truncatedEditorState, newSelection);

  //                     const truncatedBlockText = blockText.slice(0, maxCDetails);
  //                     const truncatedContentState = contentState.merge({
  //                         blockMap: contentState.getBlockMap().set(block.getKey(), block.merge({ text: truncatedBlockText })),
  //                     });
  //                     const newEditorState = EditorState.push(detailsRich, truncatedContentState, 'change-block-data');

  //                     setDetailsRich(() => newEditorState);
  //                     toast.dismiss();
  //                     toast.error("Character limit reached!");
  //                 }
  //             }
  //             validBlocks.push(block);
  //         } else {
  //             exceededLines = true;

  //         }
  //     });

  //     if (exceededLines) {
  //         const newContentState = ContentState.createFromBlockArray(validBlocks);
  //         const newEditorState = EditorState.createWithContent(newContentState);
  //         setDetailsRich(() => newEditorState);
  //         toast.dismiss();
  //         toast.error("Line limited");
  //     }

  // }, [detailsRich, MAX_LINES]);
  useEffect(() => {
    const currentContent = nameRich.getCurrentContent();
    const selection = nameRich.getSelection();
    const startKey = selection.getStartKey();
    const currentBlock = currentContent.getBlockForKey(startKey);
    const plainText = currentContent.getPlainText("");
    // Create a temporary element to measure the width
    const tempElement = document.createElement("span");
    tempElement.style.whiteSpace = "nowrap";
    tempElement.style.visibility = "hidden";
    tempElement.innerText = plainText;

    // Append the temporary element to the document body
    document.body.appendChild(tempElement);

    // Get the width of the temporary element
    const contentWidth = tempElement.offsetWidth;

    // Remove the temporary element from the document body
    document.body.removeChild(tempElement);

    // console.log(contentWidth);
    setContentWidth(() => contentWidth);
    setName(() => plainText);

    const currentContentd = detailsRich.getCurrentContent();
    const selectiond = detailsRich.getSelection();
    const startKeyd = selectiond.getStartKey();
    const currentBlockd = currentContentd.getBlockForKey(startKeyd);
    const plainTextd = currentContentd.getPlainText("");
    // Create a temporary element to measure the width
    const tempElementD = document.createElement("span");
    tempElementD.style.whiteSpace = "nowrap";
    tempElementD.style.visibility = "hidden";
    tempElementD.innerText = plainTextd;

    // Append the temporary element to the document body
    document.body.appendChild(tempElementD);

    // Get the width of the temporary element
    const contentWidthD = tempElementD.offsetWidth;

    // Remove the temporary element from the document body
    document.body.removeChild(tempElementD);

    // console.log(contentWidthD);
    setContentWidthD(() => contentWidthD);
    setDetails(() => plainTextd);

    // console.log("info", plainText, plainTextd);
  }, [nameRich, detailsRich]);

  const handleBeforeInputName = (chars, editorState) => {
    if (isBulk == "true") return "handled";

    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const currentBlock = currentContent.getBlockForKey(startKey);
    const plainText = currentContent.getPlainText("");
    const characterCount = plainText.length;

    if (characterCount >= maxCharacterLimit) {
      toast.dismiss();
      toast.error("Character limit reached!");
      return "handled"; // Prevent further input
    }

    if (
      currentBlock.getType() === "unstyled" &&
      currentBlock.getLength() >= maxCharacterLimit
    ) {
      return "handled"; // Prevent further input
    }
    return "not-handled"; // Allow input
  };
  const handleBeforeInput = (chars, editorState) => {
    if (isBulk == "true") return "handled";
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const currentBlock = currentContent.getBlockForKey(startKey);
    const plainText = currentContent.getPlainText("");
    const characterCount = plainText.length;

    if (characterCount >= MAX_LINES * maxCDetails) {
      toast.dismiss();
      toast.error("Character limit reached!");
      return "handled"; // Prevent further input
    }
    if (
      currentBlock.getType() === "unstyled" &&
      currentBlock.getLength() >= maxCDetails
    ) {
      // Insert a newline character
      const newContentState = Modifier.splitBlock(currentContent, selection);
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "split-block"
      );
      setDetailsRich(() => newEditorState);
      return "handled"; // Prevent further input
    }

    return "not-handled"; // Allow input
  };

  const handleReturn = (event, editorState) => {
    return "handled"; // Prevent the default behavior of creating a new line
  };

  const handlePastedText = (text, html, editorState) => {
    // Prevent any pasted text
    if (isBulk == "true") {
      return "handled";
    }
  };

  const handleKeyDown = (e, editorState) => {
    // Prevent any text removal using backspace or delete key
    if (isBulk == "true") {
      console.log("handleKeyDown called", e);
      const selection = editorState.getSelection();
      if (selection.isCollapsed() && (e === "backspace" || e === "delete")) {
        // e.preventDefault();
        console.log("handleKeyDown called two");
        return "handled";
      }
    }
  };

  const handleBeforeTextPaste = (text) => {
    // Prevent any pasted text
    if (isBulk == "true") {
      return text;
    }
  };

  const handlePaste = (text, html, editorState) => {
    // Prevent any pasted text
    if (isBulk == "true") {
      return "handled";
    }
  };

  const handleInputChangeDetails = (e) => {
    setDetailsRich(() => e);
  };

  const validEmail = async (e) => {
    const finding = allUser.find((mail) => mail?.email === e.target.value);
    if (finding) {
      setEmail(() => e.target.value);
      setWalletAddress(() => finding?.walletAddress);
    } else {
      const token = CryptoJS.AES.decrypt(
        localStorage.getItem("userToken"),
        process.env.REACT_APP_MY_SECRET_KYE
      ).toString(CryptoJS.enc.Utf8);

      await axios
        .post(
          "https://api.zecurechain.com/api/v1/e-walletAddress",
          { email: e.target.value },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        )
        .then((res) => {
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
        });
    }
  };
  const validEmailExcel = async (e) => {
    const finding = allUser.find((mail) => mail?.email === e);
    if (finding) {
      setEmail(() => e);
      setWalletAddress(() => finding?.walletAddress);
    } else {
      const token = CryptoJS.AES.decrypt(
        localStorage.getItem("userToken"),
        process.env.REACT_APP_MY_SECRET_KYE
      ).toString(CryptoJS.enc.Utf8);

      await axios
        .post(
          "https://api.zecurechain.com/api/v1/e-walletAddress",
          { email: e },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        )
        .then((res) => {
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
        });
    }
  };
  const validEmailExcelArray = async (e) => {
    const finding = allUser.find((mail) => mail?.email === e);
    if (finding) {
      // setEmail(() => e);
      return finding?.walletAddress;
    } else {
      const token = CryptoJS.AES.decrypt(
        localStorage.getItem("userToken"),
        process.env.REACT_APP_MY_SECRET_KYE
      ).toString(CryptoJS.enc.Utf8);

      const res = await axios.post(
        "https://api.zecurechain.com/api/v1/e-walletAddress",
        { email: e },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      if (res.status == 200) {
        // console.log(res.data);
        // setEmail(() => e);
        return res.data?.data?.walletAddress;
      }
    }
  };

  const convertExcelDate = (excelDate) => {
    const dateObj = new Date((excelDate - 25569) * 86400 * 1000); // Convert to milliseconds

    // Step 2: Format the Date object to "YYYY-MM-DD" format
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 to get the correct month
    const day = String(dateObj.getDate()).padStart(2, "0");

    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    setBulkChecking(() => false);
    window.scrollTo(0, 0);
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      setExcelData(() => data);
      // console.log("Got Excel Data", data[0]);
      validEmailExcel(data[0].Email);
      // setEmail(() => data[0].Email);
      setName(() => data[0].Name);
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
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      // console.log(EditorState.createWithContent(contentState));
      setNameRich(() => EditorState.createWithContent(contentState));

      const blocksFromHtml2 = htmlToDraft(data[0].Course);
      const contentState2 = ContentState.createFromBlockArray(
        blocksFromHtml2?.contentBlocks,
        blocksFromHtml2?.entityMap
      );
      // console.log(EditorState.createWithContent(contentState2));

      setDetailsRich(() => EditorState.createWithContent(contentState2));
    }
  };
  const generateQRExcel = async (
    nameex,
    detailsex,
    dateex,
    userex,
    IPFS,
    tHash
  ) => {
    try {
      // console.log("after gen", IPFS, tHash);
      let text = `Name: ${nameex}, Course_Details: ${detailsex}, Date: ${dateex}, Issuer: ${userex}, Certificate Hash: ${IPFS}, Transaction Hash: ${tHash} .`;
      await QRCode.toDataURL(text).then(setSrc);
    } catch (err) {
      console.error(err, "err");
    }
  };

  const maxCer = {
    basic: (user?.types == "individual") ? 0 : 2,
    foundationY: (user?.types == "individual") ? 0 : 100,
    foundationM: (user?.types == "individual") ? 0 : 100,
    intermediateY: (user?.types == "individual") ? 0 : 200,
    intermediateM: (user?.types == "individual") ? 0 : 200,
    enterpriseY: (user?.types == "individual") ? 0 : 500,
    enterpriseM: (user?.types == "individual") ? 0 : 500,
  };

  const subCerMulti = async (e) => {
    e.preventDefault();
    if (user?.types === "individual") {
      return toast.error("Individual users are not allowed to issue!")
    }

    setIsWarn(true);
    setLoading(true);
    const token = CryptoJS.AES.decrypt(
      localStorage.getItem("userToken"),
      process.env.REACT_APP_MY_SECRET_KYE
    ).toString(CryptoJS.enc.Utf8);

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
      setIsWarn(false);
      setLoading(false);
      return toast.error("Your subscription has expired!");
    }


    if ((tracks[currentYearIndex].cer + excelData?.length) < maxCer[user?.type_of_subscription?.name]) {
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

        if (excelData[i].Email.length <= 0 || excelData[i].Name <= 0 || excelData[i].Course <= 0 || excelData[i].Date_of_Completion <= 0 || excelData[i].Validity <= 0) {
          setLoading(false);
          setIsWarn(false);
          return toast.error("Please fill up all fields");
        }


        if (excelData[i].Email === user?.email) {
          setLoading(false);
          return toast.error("Use different mail Id");
        }
        emailEX.push(excelData[i].Email);
        nameEX.push(excelData[i].Name);
        courseNameEX.push(excelData[i].Course);
        let dateF = formatDate(excelData[i].Date_of_Completion);
        let dateE = formatDate(excelData[i].Validity);
        let dateFX = convertExcelDate(excelData[i].Date_of_Completion);
        let dateEX = convertExcelDate(excelData[i].Validity);
        dateOfCompletionImgEX.push(dateF);
        validityImgEX.push(dateE);
        dateOfCompletionEX.push(dateFX);
        validityEX.push(dateEX);
        let wallet = await validEmailExcelArray(excelData[i].Email);
        await generateQRExcel(
          excelData[i].Name,
          excelData[i].Course,
          dateFX,
          user?.org_individual_Name ? user?.org_individual_Name : user?.email,
          undefined,
          undefined
        );
        if (wallet) {
          walletAddressEX.push(wallet);
        }

        qrEX.push(src);
        // console.log(src);
      }
      // console.log(qrEX);
      const dataExcel = {
        nameEX: nameEX,
        courseNameEX: courseNameEX,
        dateOfCompletionImgEX: dateOfCompletionImgEX,
        qrEX: qrEX,
      };

      const dataForm = new FormData();
      dataForm.append("logo1", logo1);
      dataForm.append("logo2", logo2);
      dataForm.append("logo3", logo3);
      dataForm.append("imgID", catchId);
      dataForm.append("n", excelData?.length);
      dataForm.append("issuerEX", issuerEX);
      dataForm.append("issuerNameEX", issuerNameEX);
      dataForm.append("dataExcel", JSON.stringify(dataExcel));
      // dataForm.append("nameEX", nameEX);
      let upImgs = [];


      await axios
        .post(
          "https://api.zecurechain.com/api/v1/certificate/convertToImage",
          dataForm,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        )
        .then(async (res) => {
          if (res.status == 200) {
            // console.log(res.data);
            setTempImgs(() => res.data.data);
            for (let i = 0; i < (res.data?.data).length; i++) {
              let blobing = await (await fetch(res.data?.data[i])).blob();
              let file = new File([blobing], "image.jpg", { type: "image/jpeg" });
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
              n,
            };

            await axios
              .post(
                "https://api.zecurechain.com/api/v1/certificate/createDataWithExcel",
                secondData,
                {
                  headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${JSON.parse(token)}`,
                  },
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  // toast.success("Successfully uploaded all!");
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
                  setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
                  let info = { folder: folder, number: excelData?.length, sub: "Certificate" };
                  localStorage.setItem("Info", JSON.stringify(info));
                  navigate("/dashboard/dashboard-upload-confirmation");


                }
              })
              .catch((e) => {
                toast.error(`${e?.response?.data?.message}`);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error(`${e?.response?.data?.message}`);
        })
        .finally(() => {
          setLoading(false);
        });

      setLoading(false);
    }
    else {
      setIsWarn(false);
      setLoading(false);
      toast.error("Certificate Count Limit Exceeded");
    }

  };

  const subCer = async (e) => {
    e.preventDefault();
    if (user?.types === "individual") {
      return toast.error("Individual users are not allowed to issue!")
    }
    if (email === user?.email) {
      return toast.error("Use different mail Id");
    }
    setIsWarn(true);
    setLoading(true);
    // generateQR();
    const token = CryptoJS.AES.decrypt(
      localStorage.getItem("userToken"),
      process.env.REACT_APP_MY_SECRET_KYE
    ).toString(CryptoJS.enc.Utf8);
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
    let subs = (lastChar === 'M') ? oneMonthAfterGivenDate : oneYearAfterGivenDate;
    // console.log(currentYear, givenYear)
    // isExpire?
    if (currentYear > givenYear || currentDate >= subs) {
      // console.log("enter");
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
      setIsWarn(false);
      setLoading(false);
      return toast.error("Your subscription has expired due to max");
    }


    if ((tracks[currentYearIndex].cer) < maxCer[user?.type_of_subscription?.name]) {



      let dateOfCompletion = e.target.dateOfCompletion.value;
      let validity = e.target.validity.value;
      // console.log("Folder Check", folderStructure);
      // console.log("sub", img);
      // let data1 = { email: email, name: name, courseName: details, dateOfCompletion: dateOfCompletion, validity: validity, certificate: img };
      await exportAsImage();
      await exportAsImage();
      if (!img) {
        await exportAsImage();
      }
      await exportAsImage();
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
        TId: null,
      });

      await exportAsImage();
      const passingToBlockchain = await mintNFT([upType], [walletAddress]);

      if (passingToBlockchain && passingToBlockchain != null) {
        setWeb3Info({
          IPFS: passingToBlockchain?.ipfsHashes,
          tHash: passingToBlockchain?.transactionHash,
          TId: null,
        });
        // console.log(
        //   "getting after call",
        //   passingToBlockchain?.ipfsHashes[0],
        //   passingToBlockchain?.transactionHash
        // );
        generateQR(
          passingToBlockchain?.ipfsHashes[0],
          passingToBlockchain?.transactionHash
        );
        await exportAsImage();
        await exportAsImage();
        await exportAsImage();
        setElements({
          name: name,
          tHash: passingToBlockchain?.transactionHash,
          ipHash: passingToBlockchain?.ipfsHashes,
          qr: src,
        });
        data.append("hash", passingToBlockchain?.transactionHash);
        data.append("ipHash", passingToBlockchain?.ipfsHashes[0]);
        data.append("issuer", user?.email);
        data.append("issuerName", user?.org_individual_Name ? user?.org_individual_Name : "");
        data.append("qrCode", src);
        exportAsImage();


        await axios
          .post(
            "https://api.zecurechain.com/api/v1/certificate/create-certificate",
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          )
          .then((res) => {
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
              setLoading(false);
              // console.log("id", res.data?.data?._id);
              // localStorage.getItem("instantID")
              localStorage.setItem("instantID", res.data?.data?._id);
              // setInstantID(() => res.data?.data?._id);
              let info = { folder: folder, number: excelData?.length, sub: "Certificate" };
              localStorage.setItem("Info", JSON.stringify(info));
              setDetailsCardShow(true);
              setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
              navigate(`/dashboard/dashboard-upload-details/${res.data?.data?._id}`);
              setUserRefetch(!userRefetch);

              // handleClickOpen();
            } else {
              // console.log("errors from while saving");
              toast.error("Something is wrong");
            }
          })
          .catch((e) => {
            console.log(e);
            toast.error(`${e?.response?.data?.message}`);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("Something is wrong");
        console.log(
          passingToBlockchain?.ipfsHashes,
          passingToBlockchain?.transactionHash
        );
        // console.log("errors from while saving2");
      }
      setLoading(false);
    }
    else {
      setIsWarn(false);
      setLoading(false);
      toast.error("Certificate Count Limit Exceeded");
    }
  };
  // console.log("Open", detailsCardShow)
  return (
    <section className="mb-5">
      {
        loading ? <Gifloader name={"Certificate"} /> :
          <div className="container mt-3 mb-5">
            <div
              className="d-flex justify-content-start align-items-center"
              style={{ gap: "15px" }}
            >
              <ArrowBackIcon
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              <h4 className="dTitle">Certificate</h4>
            </div>
            {/* <button onClick={() => test()}>test</button> */}
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
              className="ps-4 ms-3"
            >
              choose your fonts and colors and fill details to preview certificate
            </p>
            {/* <p className='pt-2 text-secondary'>My Folder /Unitic services</p> */}

            {detailsCardShow ? <DashboardShowUserCard setDetailsCardShow={setDetailsCardShow} detailsCardShow={detailsCardShow} /> : <>
              <div className={`${bulkChecking == false ? "d-none" : "d-block"}`}>
                <div className="widthHandle mx-auto mt-5 mb-4">
                  <div
                    className={`w-100 box-cer box-cer-A4-${imgData?.id}`}
                    id="cerToSVG"
                    ref={certificateTemplate}
                  >
                    <img src={`${imgData?.temp}`} alt="" className="img-fluid" />
                    <img
                      src={src}
                      alt="logo"
                      className={`${imgData?.id == 5
                        ? `handleQrCodeV3CT${imgData?.id}`
                        : "handleQrCodeV2"
                        } img-fluid handleQrCodeV4CT${imgData?.id}`}
                      width={80}
                    />
                    <div
                      className={`handleTextCerV1CT${imgData?.id}`}
                      style={{ width: "55%" }}
                    >
                      <h3
                        className={`handleNameCerV3 handleNameCerV3Definite${imgData?.id}`}
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(nameRich.getCurrentContent())
                          ),
                        }}
                      ></h3>
                      <p
                        className={`mb-0 handleDetailsCerV3 handleDetailsCerV3Definite${imgData?.id}`}
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(detailsRich.getCurrentContent())
                          ),
                        }}
                      ></p>
                      {imgData?.id == 3 ||
                        imgData?.id == 4 ||
                        imgData?.id == 5 ||
                        imgData?.id == 8 ? (
                        <></>
                      ) : (
                        <p className={`mb-0 handleDetailsDateV3 handleDetailsDateV3Definite${imgData?.id}`}>{dateCom}</p>
                      )}

                      {/* {console.log(imgData?.id)} */}
                    </div>
                    {(imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 8) && (
                        <p
                          className={`mb-0 handleDetailsDateV3 handleDetailsDateDefinite${imgData?.id}`}
                        >
                          {dateCom}
                        </p>
                      )}

                    {imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 6 ||
                      imgData?.id == 7 ||
                      imgData?.id == 8 ? (
                      <></>
                    ) : (
                      <div className={`handleImgCerV3CT${imgData?.id}`}>
                        <div className="w-100 h-100 text-center">
                          <img src={sig1?.show} alt="" className="" />
                        </div>
                        <div className={`handleLog${imgData?.id} h-100 text-center`}>
                          <img
                            src={logo?.show}
                            alt=""
                            className="h-100 rounded-circle"
                          />{" "}
                        </div>
                        <div className="w-100 h-100 text-center">
                          <img src={sig2?.show} alt="" className="" />
                        </div>
                      </div>
                    )}

                    {(imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 6 ||
                      imgData?.id == 7 ||
                      imgData?.id == 8) && (
                        <div className={`handleImgCerV4CT${imgData?.id}`}>
                          <img
                            src={logo?.show}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            className=" rounded-circle"
                          />
                        </div>
                      )}
                    {(imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 5 ||
                      imgData?.id == 8) && (
                        <div className={`handleImgCerV3CT${imgData?.id}`}>
                          {/* <div className='w-100 h-100 text-center handleDiffLogo'> <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' /> </div> */}
                          <img
                            src={sig1?.show}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            className=""
                          />
                        </div>
                      )}
                    {(imgData?.id == 6 || imgData?.id == 7) && (
                      <div className={`handleImgCerV3CT${imgData?.id}`}>
                        {/* <div className='w-100 h-100 text-center handleDiffLogo'> <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' /> </div> */}
                        <div className="w-100 h-100 text-center">
                          <img
                            src={sig1?.show}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            className=""
                          />
                        </div>
                        <div className="w-100 h-100 text-center">
                          <img
                            src={sig2?.show}
                            alt=""
                            className=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="handleDownloadOfferSheet px-2 px-lg-0">
                    <h5>Download our Excel Template fill Details and upload Again</h5>
                    <a
                      href="/assets/msOffice/sampleOrigin.xlsx"
                      download={true}
                      className="mb-0 pt-1 downloadText"
                      target="_blank"
                    >
                      <FileDownloadOutlinedIcon /> Template Excel File
                    </a>
                  </div>
                  <div
                    className={`mx-auto text-center mt-3 px-2 px-lg-0 handleExcelPart`}
                  >
                    <form
                      className="form-group custom-form mx-auto text-center"
                      onSubmit={handleFileSubmit}
                    >
                      <h5>Upload your excel sheet</h5>
                      <input
                        type="file"
                        className="form-control mt-1 handleScanWidth"
                        style={{ border: typeError && "1px solid #dd3c3c" }}
                        required
                        onChange={handleFile}
                      />{" "}
                      <br />
                      <p className="mb-0">
                        <small>{typeError}</small>
                      </p>
                      <Button
                        variant="success"
                        className="mt-2"
                        type="submit"
                        disabled={typeError}
                      >
                        Upload Excel
                      </Button>
                      {/* {typeError && (
                                    <>
                                        <br />
                                        <Stack className='handleAlertWidth  my-2 text-center mx-auto' spacing={2}>
                                            <Alert severity="error" >{typeError}</Alert>
                                        </Stack>

                                    </>
                                )} */}
                    </form>
                  </div>
                </div>
              </div>

              <div
                className={`${bulkChecking == true ? "d-none" : "d-flex"
                  }  justify-content-between align-items-start mt-2 mx-auto flex-column flex-lg-row gapping`}
              >
                <div className="mx-auto w-100">
                  <p className="text-center titleCr">
                    Please Fill the details for Certificate
                  </p>

                  <div className="form-issue mt-4 mb-0 mb-lg-5" style={{ width: '90%' }}>
                    <form onSubmit={excelData?.length > 1 ? subCerMulti : subCer}>
                      <label>Receiver Email-Id <span className="text-danger fs-5">*</span></label> <br />
                      <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onBlur={(e) => validEmail(e)}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={isBulk == "true"}
                        style={{ border: (email.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                      />{" "}
                      <br />
                      <label>Name <span className="text-danger fs-5">*</span></label> <br />
                      <Editor
                        toolbarOnFocus
                        onFocus={(e) => {
                          setIsFocusName(() => true);
                        }}
                        onBlur={(e) => {
                          setIsFocusName(() => false);
                        }}
                        editorState={nameRich}
                        onEditorStateChange={(e) => handleInputChangeName(e)}
                        handleBeforeInput={handleBeforeInputName}
                        handleReturn={handleReturn}
                        handlePastedText={handlePastedText}
                        handleKeyCommand={handleKeyDown}
                        handleBeforeTextPaste={handleBeforeTextPaste}
                        handlePaste={handlePaste}
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        editorStyle={{
                          height: "45px",
                          borderRadius: "42px",
                          paddingLeft: "10px",
                          border: (nameRich.getCurrentContent().getPlainText("").length > 0 || isWarn) ? "" : "1px solid #dd3c3c"
                        }}

                        toolbarClassName="toolbarClassName text-black"
                        toolbarStyle={{
                          display: isFocusName ? "flex" : "none",
                          left: `${contentWidth + 30}px`,
                        }}
                        toolbar={{
                          options: ["fontFamily", "colorPicker", "inline"],

                          fontFamily: {
                            options: [
                              "Arial",
                              "Georgia",
                              "Impact",
                              "Tahoma",
                              "Times New Roman",
                              "Verdana",
                              "Courier New",
                              "Playball",
                            ],
                          },
                          colorPicker: {
                            colors: [
                              "rgb(0, 0, 139)",
                              "rgb(97,189,109)",
                              "rgb(26,188,156)",
                              "rgb(84,172,210)",
                              "rgb(44,130,201)",
                              "rgb(147,101,184)",
                              "rgb(71,85,119)",
                              "rgb(204,204,204)",
                              "rgb(65,168,95)",
                              "rgb(0,168,133)",
                              "rgb(61,142,185)",
                              "rgb(41,105,176)",
                              "rgb(85,57,130)",
                              "rgb(40,50,78)",
                              "rgb(0,0,0)",
                              "rgb(247,218,100)",
                              "rgb(251,160,38)",
                              "rgb(235,107,86)",
                              "rgb(226,80,65)",
                              "rgb(163,143,132)",
                              "rgb(239,239,239)",
                              "rgb(255,255,255)",
                              "rgb(250,197,28)",
                              "rgb(243,121,52)",
                              "rgb(209,72,65)",
                              "rgb(184,49,47)",
                              "rgb(124,112,107)",
                              "rgb(209,213,216)",
                            ], // Example of custom colors
                          },
                          inline: {
                            options: ["bold", "italic", "underline"],
                          },
                        }}
                      />
                      <label className="mt-3">Course Name <span className="text-danger fs-5">*</span></label> <br />
                      <Editor
                        toolbarOnFocus
                        onFocus={(e) => {
                          setIsFocusDetails(() => true);
                        }}
                        onBlur={(e) => {
                          setIsFocusDetails(() => false);
                        }}
                        editorState={detailsRich}
                        onEditorStateChange={(e) => handleInputChangeDetails(e)}
                        handleBeforeInput={handleBeforeInput}
                        handleReturn={handleReturn}
                        handlePastedText={handlePastedText}
                        handleKeyCommand={handleKeyDown}
                        handleBeforeTextPaste={handleBeforeTextPaste}
                        handlePaste={handlePaste}
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        toolbarClassName="toolbarClassName text-black"
                        editorStyle={{
                          borderRadius: "36px",
                          height: "64px",
                          paddingLeft: "10px",
                          paddingTop: "10px",
                          border: (detailsRich.getCurrentContent().getPlainText("").length > 0 || isWarn) ? "" : "1px solid #dd3c3c"
                        }}
                        toolbarStyle={{
                          display: isFocusDetails ? "flex" : "none",
                          left: `${contentWidthD + 30}px`,
                        }}
                        toolbar={{
                          options: ["fontFamily", "colorPicker", "inline"],

                          fontFamily: {
                            options: [
                              "Arial",
                              "Georgia",
                              "Impact",
                              "Tahoma",
                              "Times New Roman",
                              "Verdana",
                              "Courier New",
                            ],
                          },
                          colorPicker: {
                            colors: [
                              "rgb(97,189,109)",
                              "rgb(26,188,156)",
                              "rgb(84,172,210)",
                              "rgb(44,130,201)",
                              "rgb(147,101,184)",
                              "rgb(71,85,119)",
                              "rgb(204,204,204)",
                              "rgb(65,168,95)",
                              "rgb(0,168,133)",
                              "rgb(61,142,185)",
                              "rgb(41,105,176)",
                              "rgb(85,57,130)",
                              "rgb(40,50,78)",
                              "rgb(0,0,0)",
                              "rgb(247,218,100)",
                              "rgb(251,160,38)",
                              "rgb(235,107,86)",
                              "rgb(226,80,65)",
                              "rgb(163,143,132)",
                              "rgb(239,239,239)",
                              "rgb(255,255,255)",
                              "rgb(250,197,28)",
                              "rgb(243,121,52)",
                              "rgb(209,72,65)",
                              "rgb(184,49,47)",
                              "rgb(124,112,107)",
                              "rgb(209,213,216)",
                            ], // Example of custom colors
                          },
                          inline: {
                            options: ["bold", "italic", "underline"],
                          },
                        }}
                      />
                      {/* <input type="text" name="courseName" value={details} onChange={handleInputChangeDetails} required /> <br /> */}
                      <label className="mt-3 pt-1">Date of Completion <span className="text-danger fs-5">*</span></label> <br />
                      <input
                        type="date"
                        name="dateOfCompletion"
                        ref={inputDate1}
                        required
                        value={date}
                        onChange={(e) => {
                          fixingDateCom(e);
                          // generateQR();
                        }}
                        onClick={() => inputDate1.current.showPicker()}
                        readOnly={isBulk == "true"}
                        style={{ border: (date.length > 0 || isWarn) ? "" : "1px solid #dd3c3c", cursor: 'pointer' }}
                      />{" "}
                      <br />
                      <label className="mt-1 pt-1">Validity <span className="text-danger fs-5">*</span></label> <br />
                      <input
                        type="date"
                        name="validity"
                        ref={inputDate2}
                        required
                        value={date2}
                        onChange={(e) => fixingDateValid(e)}
                        onClick={() => inputDate2.current.showPicker()}
                        readOnly={isBulk == "true"}
                        style={{ border: (date2.length > 0 || isWarn) ? "" : "1px solid #dd3c3c", cursor: 'pointer' }}
                      />{" "}
                      <br />
                      <label className="mt-1 pt-1">Upload your Signature <span className="text-danger fs-5">*</span></label>{" "}
                      <br />
                      <div className="input-groupCus" style={{ border: (sig1.origin?.name.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}>
                        <input
                          type="text"
                          readOnly
                          style={{ cursor: 'pointer' }}
                          class="form-control"
                          id="inputGroupFile0x"
                          name="demo"
                          value={sig1.origin?.name}
                          onClick={() => handleLabelClick1()}

                        />
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile01"
                          name="signature"
                          ref={fileInputRef1}
                          onChange={(e) => {
                            setSig1({
                              origin: e.target.files[0],
                              show: URL.createObjectURL(e.target.files[0]),
                            });
                            exportAsImage();
                          }}
                          required
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <label
                          class="input-group-textCus"
                          onClick={() => handleLabelClick1()}
                        >
                          Upload
                        </label>
                      </div>
                      {imgData?.id == 3 ||
                        imgData?.id == 4 ||
                        imgData?.id == 5 ||
                        imgData?.id == 8 ? (
                        <></>
                      ) : (
                        <>
                          {" "}
                          <label className="mt-1 pt-1">
                            Upload your Signature2 <span className="text-danger fs-5">*</span>
                          </label>{" "}
                          <br />
                          <div className="input-groupCus" style={{ border: (sig2.origin?.name.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}>
                            <input
                              type="text"
                              readOnly
                              style={{ cursor: 'pointer' }}
                              class="form-control"
                              id="inputGroupFile0xx"
                              name="demo"
                              value={sig2.origin?.name}
                              onClick={() => handleLabelClick2()}

                            />
                            <input
                              type="file"
                              class="form-control"
                              id="inputGroupFile02"
                              name="signature2"
                              ref={fileInputRef2}
                              onChange={(e) => {
                                setSig2({
                                  origin: e.target.files[0],
                                  show: URL.createObjectURL(e.target.files[0]),
                                });
                                exportAsImage();
                              }}
                              required
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                            <label
                              class="input-group-textCus"
                              onClick={() => handleLabelClick2()}
                            >
                              Upload
                            </label>
                          </div>{" "}
                        </>
                      )}
                      <label className="mt-1 pt-1">Upload your logo <span className="text-danger fs-5">*</span></label> <br />
                      <div className="input-groupCus" style={{ border: (logo.origin?.name.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}>
                        <input
                          type="text"
                          readOnly
                          style={{ cursor: 'pointer' }}
                          class="form-control"
                          id="inputGroupFile0xxxx"
                          name="demo"
                          value={logo.origin?.name}
                          onClick={() => handleLabelClick3()}
                        />
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile03"
                          name="logo"
                          ref={fileInputRef3}
                          onChange={(e) => {
                            setLogo({
                              origin: e.target.files[0],
                              show: URL.createObjectURL(e.target.files[0]),
                            });
                            exportAsImage();
                          }}
                          required
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <label
                          class="input-group-textCus"
                          onClick={() => handleLabelClick3()}
                        >
                          Upload
                        </label>
                      </div>
                      <div className="text-center titleCr mt-3 mb-2">

                        <Button
                          variant="warning"
                          className="text-global px-4 py-2 rounded-pill"
                          type="submit"
                          onClick={() => setIsWarn(false)}
                        >
                          Upload on Blockchain
                        </Button>

                      </div>
                    </form>
                  </div>
                </div>

                <div className="mx-auto mt-0 mt-lg-3 w-100">
                  <div
                    className={`w-100 box-cer box-cer-A4-${imgData?.id}`}
                    id="cerToSVG"
                    ref={certificateTemplate}
                  >
                    <img src={`${imgData?.temp}`} alt="" className="img-fluid" />
                    <img
                      src={src}
                      alt="logo"
                      className={`${imgData?.id == 5
                        ? `handleQrCodeV3CT${imgData?.id}`
                        : "handleQrCodeV2"
                        } img-fluid handleQrCodeV4CT${imgData?.id}`}
                      width={80}
                    />
                    <div
                      className={`handleTextCerV1CT${imgData?.id}`}
                      style={{ width: "55%" }}
                    >
                      <h3
                        className={`handleNameCerV3 handleNameCerV3Definite${imgData?.id}`}
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(nameRich.getCurrentContent())
                          ),
                        }}
                      ></h3>
                      <p
                        className={`mb-0 handleDetailsCerV3 handleDetailsCerV3Definite${imgData?.id}`}
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(detailsRich.getCurrentContent())
                          ),
                        }}
                      ></p>
                      {imgData?.id == 3 ||
                        imgData?.id == 4 ||
                        imgData?.id == 5 ||
                        imgData?.id == 8 ? (
                        <></>
                      ) : (
                        <p className={`mb-0 handleDetailsDateV3 handleDetailsDateV3Definite${imgData?.id}`}>{dateCom}</p>
                      )}

                      {/* {console.log(imgData?.id)} */}
                    </div>
                    {(imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 8) && (
                        <p
                          className={`mb-0 handleDetailsDateV3 handleDetailsDateDefinite${imgData?.id}`}
                        >
                          {dateCom}
                        </p>
                      )}

                    {imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 6 ||
                      imgData?.id == 7 ||
                      imgData?.id == 8 ? (
                      <></>
                    ) : (
                      <div className={`handleImgCerV3CT${imgData?.id}`}>
                        <div className="w-100 h-100 text-center">
                          <img src={sig1?.show} alt="" className="" />
                        </div>
                        <div className={`handleLog${imgData?.id} h-100 text-center`}>
                          <img
                            src={logo?.show}
                            alt=""
                            className="h-100 rounded-circle"
                          />{" "}
                        </div>
                        <div className="w-100 h-100 text-center">
                          <img src={sig2?.show} alt="" className="" />
                        </div>
                      </div>
                    )}

                    {(imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 6 ||
                      imgData?.id == 7 ||
                      imgData?.id == 8) && (
                        <div className={`handleImgCerV4CT${imgData?.id}`}>
                          <img
                            src={logo?.show}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            className=" rounded-circle"
                          />
                        </div>
                      )}
                    {(imgData?.id == 3 ||
                      imgData?.id == 4 ||
                      imgData?.id == 5 ||
                      imgData?.id == 5 ||
                      imgData?.id == 8) && (
                        <div className={`handleImgCerV3CT${imgData?.id}`}>
                          {/* <div className='w-100 h-100 text-center handleDiffLogo'> <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' /> </div> */}
                          <img
                            src={sig1?.show}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            className=""
                          />
                        </div>
                      )}
                    {(imgData?.id == 6 || imgData?.id == 7) && (
                      <div className={`handleImgCerV3CT${imgData?.id}`}>
                        {/* <div className='w-100 h-100 text-center handleDiffLogo'> <img src={logo?.show} alt="" style={{ maxWidth: '100%', height: '100%' }} className=' rounded-circle' /> </div> */}
                        <div className="w-100 h-100 text-center">
                          <img
                            src={sig1?.show}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                            className=""
                          />
                        </div>
                        <div className="w-100 h-100 text-center">
                          <img
                            src={sig2?.show}
                            alt=""
                            className=""
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: "100%",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>


              {open && (
                <ShowUser
                  open={open}
                  setOpen={setOpen}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  elements={elements}
                />
              )}
            </>}
          </div>


      }
    </section>
  );
};

export default DashboardCreateCertificate;
