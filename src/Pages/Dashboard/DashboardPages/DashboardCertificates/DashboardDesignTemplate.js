import React from 'react';
import './DashboardDesignTemplate.css';
import { Button, Spinner } from 'react-bootstrap';
import { fabric } from 'fabric';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { BiRectangle, BiCircle } from 'react-icons/bi';
import { AiOutlineFileText } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import html2canvas from "html2canvas";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AskReceiverMail from './AskReceiverMail';
import ShowUser from './ShowUser';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { BlockchainAuthContext } from '../../../../Context/UserContext/BlockchainContext';
import axios from 'axios';
import QRCode from 'qrcode'
import CryptoJS from 'crypto-js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

const DashboardDesignTemplate = () => {
    const canvasRef = useRef(null);
    const { isInFolder, folder, isSub, folderId } = useParams();
    // console.log(isInFolder, folder, isSub, folderId);
    const certificateV3 = useRef(null);
    const navigate = useNavigate();
    const [canvas, setCanvas] = useState(null);
    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [color, setColor] = useState("#00000");
    const [colorBrush, setColorBrush] = useState("#00000");
    const [colorShadow, setColorShadow] = useState("#00000");
    const [thickness, setThickness] = useState(2);
    const [shadowWidth, setShadowWidth] = useState(30);
    const fileInputImgRef = useRef(null);
    const [mode, setMode] = useState("");
    const [history, setHistory] = useState([]);
    const [shadowOffset, setShadowOffset] = useState({ x: 0, y: 0 });
    const [showTemplate, setShowTemplate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState("");
    const [upType, setUpType] = useState("");
    const handleCloseTemplate = () => setShowTemplate(false);
    const handleShowTemplate = () => setShowTemplate(true);
    const handleClickOpen = () => setOpen(() => true);
    const handleClose = () => setOpen(() => false);
    const [open, setOpen] = useState(false);
    const [elements, setElements] = useState({ name: null, tHash: null, ipHash: null, qr: null });
    const [src, setSrc] = useState("");
    const { user, allUser, userRefetch, setUserRefetch } = useContext(UserAuthContext);
    const { mintNFT, } = useContext(BlockchainAuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: 'transparent',
            selection: false, // Disable default object selection
        });
        setCanvas(newCanvas);
        setHistory([newCanvas.toJSON()]);

        // Additional configurations for the canvas (e.g., dimensions, background, etc.)
        const img = new Image();
        img.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

        function deleteObject(eventData, transform) {
            var target = transform.target;
            var canvas = target.canvas;
            canvas.remove(target);
            canvas.requestRenderAll();
        }

        function renderIcon(icon) {
            return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
                var size = this.cornerSize;
                ctx.save();
                ctx.translate(left, top);
                ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
                ctx.drawImage(icon, -size / 2, -size / 2, size, size);
                ctx.restore();
            }
        }

        fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon(img),
            cornerSize: 24
        });
        fabric.Image.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon(img),
            cornerSize: 24
        });

        generateQR();
        return () => {
            // Clean up Fabric.js objects and event listeners on unmount if necessary
            newCanvas.dispose();
        };
    }, []);


    useEffect(() => {
        if (canvas) {
            canvas.isDrawingMode = isDrawingMode;
        }
    }, [isDrawingMode, canvas]);

    const exportAsImage = async () => {
        if (certificateV3.current) {

            const canvas = await html2canvas(certificateV3.current, {
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

    const handleFontColorChange = (e) => {
        const newFontColor = e.target.value;

        if (isDrawingMode) {
            const pencilBrush = new fabric.PencilBrush(canvas);
            pencilBrush.width = thickness;
            pencilBrush.color = e.target.value; // Set pencil color
            pencilBrush.shadowBlur = 10; // Add shadow-like effect
            pencilBrush.shadowColor = colorShadow; // Use the same color as pencil for shadow effect
            canvas.freeDrawingBrush = pencilBrush;
            setColorBrush(() => newFontColor);
        } else {
            const target = canvas.getActiveObject();
            if (target) {
                target.set('fill', newFontColor);
                setColor(() => newFontColor);
                canvas.renderAll();
            }
        }
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };
    const handleShadowColorChange = (e) => {

        if (isDrawingMode) {

            // canvas.freeDrawingBrush.width = parseInt(thickness);
            canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                blur: parseInt(shadowWidth),
                offsetX: parseFloat(shadowOffset?.x),
                offsetY: parseFloat(shadowOffset?.y),
                affectStroke: true,
                color: e.target.value,
            });
            canvas.requestRenderAll(); // Trigger canvas rendering to apply changes
            setColorShadow(() => e.target.value);
            const newState = canvas.toJSON();
            setHistory([...history, newState]);
        }
    };


    const handlePencilThicknessChange = (e) => {
        setThickness(() => parseInt(e.target.value));
        const pencilBrush = new fabric.PencilBrush(canvas);
        pencilBrush.width = parseInt(e.target.value); // Set pencil thickness
        pencilBrush.color = colorBrush;
        canvas.freeDrawingBrush = pencilBrush;
        // canvas.freeDrawingBrush.width = parseInt(thickness);
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt(shadowWidth),
            offsetX: parseFloat(shadowOffset?.x),
            offsetY: parseFloat(shadowOffset?.y),
            affectStroke: true,
            color: colorShadow,
        });
        handleChangeModeRecord(mode);
        canvas.requestRenderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };
    const handleShadowWidthChange = (e) => {
        setShadowWidth(() => parseInt(e.target.value));

        // canvas.freeDrawingBrush.width = parseInt(e.target.value);
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt(e.target.value),
            offsetX: parseFloat(shadowOffset?.x),
            offsetY: parseFloat(shadowOffset?.y),
            affectStroke: true,
            color: colorShadow,
        });
        canvas.requestRenderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };
    const handleShadowOffsetChange = (e) => {
        setShadowOffset({ x: e.target.value, y: e.target.value });

        // canvas.freeDrawingBrush.width = parseInt(e.target.value);
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseFloat(shadowWidth),
            offsetX: parseFloat(e.target.value),
            offsetY: parseFloat(e.target.value),
            affectStroke: true,
            color: colorShadow,
        });
        canvas.requestRenderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };



    const toggleDrawingMode = () => {
        setIsDrawingMode(!isDrawingMode);
        const boxTables = document.getElementById('boxTable');
        // console.log('Toggle button clicked', boxTables);
        boxTables.classList.toggle('boxblock'); // Toggle the 'block' class
        boxTables.classList.toggle('boxhidden'); // Toggle the 'hidden' class
        if (!isDrawingMode) {
            toast.success("You can draw on the page!")
            setThickness(() => 2); // Reset pencil thickness to default when switching to drawing mode
            setColorBrush(() => '#00000');
            setColorShadow(() => '#00000');
            const pencilBrush = new fabric.PencilBrush(canvas);
            pencilBrush.width = 2; // Set pencil thickness
            pencilBrush.color = '#00000';
            canvas.freeDrawingBrush = pencilBrush;
            setShadowWidth(() => 2);
            setShadowOffset({ x: 0, y: 0 });
            // canvas.freeDrawingBrush.width = 2;
            canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                blur: parseInt(30),
                offsetX: 0,
                offsetY: 0,
                affectStroke: true,
                color: '#00000',
            });

            canvas.requestRenderAll();
            const newState = canvas.toJSON();
            setHistory([...history, newState]);
            // else {
            //     // Reset brush to default (drawing) state
            //     canvas.isDrawingMode = false;
            // }
        };
    }
    const toggleEraserMode = () => {
        // setIsDrawingMode(false); // Disable drawing mode
        // canvas.isDrawingMode = true;
        // let width = 5;
        // console.log(canvas.isDrawingMode);
        // // if (canvas.isDrawingMode) {
        // toast.success("You can erase on the page!");
        // const eraserBrush = new fabric;
        // eraserBrush.width = width; // Set eraser thickness (same as pencil for simplicity)
        // eraserBrush.color = '#ffffff'; // Use white color for erasing
        // canvas.freeDrawingBrush = eraserBrush;
        // }

        //  same as `PencilBrush`
        // setIsDrawingMode(false); // Disable drawing mode
        // canvas.isDrawingMode = true;
        // canvas.freeDrawingBrush = new fabricPro.EraserBrush(canvas);
        // canvas.freeDrawingBrush.width = 10;
        // canvas.preparePattern();
        // canvas._render();

    };


    const drawRectangle = () => {
        setIsDrawingMode(false);
        const rectangle = new fabric.Rect({
            left: 100,
            top: 100,
            fill: color,
            width: 100,
            height: 100,
        });

        canvas.add(rectangle);
        canvas.renderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };

    const drawCircle = () => {
        setIsDrawingMode(false);
        const circle = new fabric.Circle({
            left: 200,
            top: 200,
            fill: color,
            radius: 50,
        });

        canvas.add(circle);
        canvas.renderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };

    const addText = () => {
        setIsDrawingMode(false);
        const text = new fabric.Textbox('Your Text Here', {
            left: 300,
            top: 300,
            fill: color,
        });

        canvas.add(text);
        canvas.renderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };
    const handleButtonClick = async () => {
        console.log("Button clicked");
        // Trigger the click event of the hidden file input when the button is clicked
        await fileInputImgRef.current.click();
    };
    const handleTemp = () => {
        handleButtonClick();
    }
    const handleImageUpload = (event) => {
        setIsDrawingMode(false);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const fabricImage = new fabric.Image(img);
                canvas.add(fabricImage);

                canvas.renderAll();
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    };

    const deleteSelected = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function () {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function () {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function () {

        var squareWidth = 10, squareDistance = 2;

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');

        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);

        return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function () {

        var squareWidth = 10, squareDistance = 5;
        var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
            width: squareWidth,
            height: squareWidth,
            angle: 45,
            fill: this.color
        });

        var canvasWidth = rect.getBoundingRect().width;

        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);

        return patternCanvas;
    };

    const handleChangeMode = (e) => {
        setMode(() => e.target.value);

        if (e.target.value === 'hline') {
            canvas.freeDrawingBrush = vLinePatternBrush;
        }
        else if (e.target.value === 'vline') {
            canvas.freeDrawingBrush = hLinePatternBrush;
        }
        else if (e.target.value === 'square') {
            canvas.freeDrawingBrush = squarePatternBrush;
        }
        else if (e.target.value === 'diamond') {
            canvas.freeDrawingBrush = diamondPatternBrush;
        }
        else {
            const pencilBrush = new fabric.PencilBrush(canvas);
            pencilBrush.width = parseFloat(thickness) // Set pencil thickness
            pencilBrush.color = colorBrush;
            canvas.freeDrawingBrush = pencilBrush;
            // canvas.freeDrawingBrush.width = parseInt(thickness);
            canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                blur: parseInt(shadowWidth),
                offsetX: parseFloat(shadowOffset?.x),
                offsetY: parseFloat(shadowOffset?.y),
                affectStroke: true,
                color: colorShadow,
            });
        }

        if (canvas.freeDrawingBrush) {
            var brush = canvas.freeDrawingBrush;
            brush.color = color;
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
            brush.width = parseInt(thickness);
            brush.shadow = new fabric.Shadow({
                blur: parseInt(shadowWidth),
                offsetX: parseFloat(shadowOffset?.x),
                offsetY: parseFloat(shadowOffset?.y),
                affectStroke: true,
                color: colorShadow,
            });
        }
        canvas.requestRenderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    }
    const handleChangeModeRecord = (e) => {
        setMode(() => e);

        if (e === 'hline') {
            canvas.freeDrawingBrush = vLinePatternBrush;
        }
        else if (e === 'vline') {
            canvas.freeDrawingBrush = hLinePatternBrush;
        }
        else if (e === 'square') {
            canvas.freeDrawingBrush = squarePatternBrush;
        }
        else if (e === 'diamond') {
            canvas.freeDrawingBrush = diamondPatternBrush;
        }
        else {
            const pencilBrush = new fabric.PencilBrush(canvas);
            pencilBrush.width = parseFloat(thickness) // Set pencil thickness
            pencilBrush.color = colorBrush;
            canvas.freeDrawingBrush = pencilBrush;
            // canvas.freeDrawingBrush.width = parseInt(thickness);
            canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                blur: parseInt(shadowWidth),
                offsetX: parseFloat(shadowOffset?.x),
                offsetY: parseFloat(shadowOffset?.y),
                affectStroke: true,
                color: colorShadow,
            });
        }

        if (canvas.freeDrawingBrush) {
            var brush = canvas.freeDrawingBrush;
            brush.color = color;
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
            brush.width = parseInt(thickness);
            brush.shadow = new fabric.Shadow({
                blur: parseInt(shadowWidth),
                offsetX: parseFloat(shadowOffset?.x),
                offsetY: parseFloat(shadowOffset?.y),
                affectStroke: true,
                color: colorShadow,
            });
        }
        canvas.requestRenderAll();
        const newState = canvas.toJSON();
        setHistory([...history, newState]);
    }
    const undo = () => {
        if (history.length > 1) {
            history.pop();
            const previousState = history[history.length - 1];
            canvas.loadFromJSON(previousState, () => canvas.renderAll());
            setHistory([...history]);
        }
    };

    const redo = () => {
        // Implement your own redo functionality, if needed.
        // You can store the previous states in a separate array and reapply them here.
    };
    const generateQR = async (email, IPFS, tHash) => {
        try {
            console.log("after gen", IPFS, tHash);
            let text = `Receiver Email: ${email} Issuer: ${(user?.org_individual_Name) ? user?.org_individual_Name : user?.email}, Certificate Hash: ${IPFS}, Transaction Hash: ${tHash} .`
            await QRCode.toDataURL(text).then(setSrc);
        } catch (err) {
            console.error(err, "err");
        }
    };
    const validEmail = async (e) => {

        const finding = allUser.find(mail => mail?.email === e);
        if (finding) {

            // setEmail(() => e);
            // setWalletAddress(() => finding?.walletAddress);
            uploadToBlockchain(e, finding?.walletAddress);
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
                        // setEmail(() => e);
                        // setWalletAddress(() => res.data?.data?.walletAddress);
                        uploadToBlockchain(e, res.data?.data?.walletAddress);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Something is wrong!");
                    // setEmail(() => "");
                })

        }
    }

    const uploadToBlockchain = async (email, walletAddress) => {
        setLoading(true);
        await exportAsImage();
        await exportAsImage();
        await exportAsImage();
        if (!img) {
            exportAsImage();
        }

        const data = new FormData();
        data.append("email", email);
        data.append("certificate", img);
        console.log("up type check", upType);
        const passingToBlockchain = await mintNFT([upType], [walletAddress]);

        if (passingToBlockchain && passingToBlockchain != null) {
            setElements({ name: email, tHash: passingToBlockchain?.transactionHash, ipHash: passingToBlockchain?.ipfsHashes, qr: src });
            generateQR(email, passingToBlockchain?.ipfsHashes[0],
                passingToBlockchain?.transactionHash);
            console.log("src", src);
            data.append("hash", passingToBlockchain?.transactionHash);
            data.append("ipHash", passingToBlockchain?.ipfsHashes[0]);
            data.append("issuer", user?.email);
            data.append("issuerName", user?.org_individual_Name ? user?.org_individual_Name : "");
            data.append("isInFolder", isInFolder);
            data.append("folder", folder);
            data.append("isSub", isSub);
            data.append("folderId", folderId);
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
        <section className='d-flex justify-content-center align-items-start' style={{ minHeight: '60vh' }}>

            <div className='container'>
                <div className='d-flex justify-content-start align-items-center flex-column flex-lg-row'>

                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '15px' }}>
                        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        <h4 className='dTitle mb-0'>Design Template</h4>
                    </div>
                </div>
                <div className='mt-3 d-flex justify-content-start align-items-center flex-wrap' style={{ gap: "15px" }}>
                    <Button variant='warning' onClick={() => toggleDrawingMode()}>
                        {isDrawingMode ? `Exit Drawing Mode` : 'Enter Drawing Mode'} <BsFillPencilFill className='mb-1' />
                    </Button>

                    <Button variant='warning' onClick={() => undo()}>Eraser <BiRectangle className='mb-1' /> </Button>
                    {/* <label htmlFor="width" className='text-primary fw-bold'>{thickness}</label> */}
                    {/* <input
                        id='width'
                        type="range"
                        min="1"
                        max="150"
                        value={thickness}
                        onChange={handlePencilThicknessChange}
                        style={{ marginLeft: '-10px' }}
                    /> */}
                    <label htmlFor="color" className='text-success'>Font Color:</label>
                    <input
                        disabled={isDrawingMode}
                        type="color"
                        id="color"
                        value={color}
                        onChange={handleFontColorChange}
                    // className='form-control'
                    />
                    <Button variant='warning' onClick={() => drawRectangle()}>Draw Rectangle <BiRectangle className='mb-1' /> </Button>
                    <Button variant='warning' onClick={() => drawCircle()}>Draw Circle <BiCircle /></Button>
                    <Button variant='warning' onClick={() => addText()}>Add Text <AiOutlineFileText /></Button>
                    <Button variant='warning' onClick={() => handleTemp()}>Add Image <AiOutlineFileText /></Button>
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden ref={fileInputImgRef} />
                    <Button variant='danger' onClick={() => { canvas.clear() }}>Clear All <BsFillTrashFill /></Button>

                </div>
                <div className='d-flex justify-content-center align-items-start my-5 flex-column flex-xl-row gapping'>
                    <div className="boxhidden" id='boxTable'>

                        <TableContainer component={Paper} sx={{ bgcolor: 'antiquewhite' }}>
                            <Table sx={{ minWidth: 325 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Operation</TableCell>
                                        <TableCell >Options</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >Mode</TableCell>
                                        <TableCell ><select id="fontFamily" value={mode} onChange={handleChangeMode} className='form-select'>
                                            <option value="pencil">Pencil</option>
                                            {/* <option value="spray">Spray</option> */}
                                            {/* <option value="pattern">Pattern</option> */}
                                            <option value="hline">Hline</option>
                                            <option value="vline">Vline</option>
                                            <option value="square">Square</option>
                                            <option value="diamond">Diamond</option>
                                            {/* <option value="texture">Texture</option> */}
                                            {/* Add more font options as needed */}
                                        </select></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >Line Width</TableCell>
                                        <TableCell ><label htmlFor="width" className='text-primary fw-bold mt-2'>{thickness}</label>
                                            <input
                                                id='width'
                                                type="range"
                                                min="1"
                                                max="150"
                                                value={thickness}
                                                onChange={handlePencilThicknessChange}
                                            /></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >Line Color</TableCell>
                                        <TableCell ><input type="color" value={colorBrush} onChange={handleFontColorChange} disabled={!isDrawingMode} /></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >Shadow Color</TableCell>
                                        <TableCell ><input type="color" value={colorShadow} onChange={handleShadowColorChange} /></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >Shadow Width</TableCell>
                                        <TableCell ><label htmlFor="swidth" className='text-primary fw-bold mt-2'>{shadowWidth}</label>
                                            <input
                                                id='swidth'
                                                type="range"
                                                min="1"
                                                max="150"
                                                value={shadowWidth}
                                                onChange={handleShadowWidthChange}
                                            /></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >Shadow Offset</TableCell>
                                        <TableCell ><label htmlFor="sOff" className='text-primary fw-bold mt-2'>{shadowOffset?.x}</label>
                                            <input
                                                id='sOff'
                                                type="range"
                                                min="1"
                                                max="150"
                                                value={shadowOffset?.x}
                                                onChange={handleShadowOffsetChange}
                                            /></TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    <div className=' bg-issue position-relative' ref={certificateV3}>
                        <img src="/assets/images/blankCard.png" alt="" className='img-fluid border border-1 border-dark' width={700} />
                        <div className='handleCanvas'>
                            <canvas ref={canvasRef} width={700} height={window.innerWidth < 650 ? 300 : 525} />
                        </div>
                    </div>
                </div>
                <div className=' titleCrV2 mt-3 marging'>
                    {
                        loading ? <Button variant='primary' className="text-global px-4 py-2 rounded-pill text-white" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span>Loading...</span>
                        </Button> :
                            <Button variant='primary' className="text-global px-4 py-2 rounded-pill text-white" onClick={() => { setLoading(true); handleShowTemplate(); exportAsImage() }} disabled={loading}>Upload  on Blockchain</Button>
                    }
                </div>
                {showTemplate && <AskReceiverMail showTemplate={showTemplate} handleCloseTemplate={handleCloseTemplate} handleShowTemplate={handleShowTemplate} validEmail={validEmail} uploadToBlockchain={uploadToBlockchain} setLoading={setLoading} />}
                {open && <ShowUser open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} elements={elements} />}
            </div>

        </section>
    );
};

export default DashboardDesignTemplate;