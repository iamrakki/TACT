import React, { useContext, useEffect, useRef, useState } from 'react';
import { fabric } from "fabric";
import { Button, Form, Spinner } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './DashboardCreateCertificateTemplate.css';
import html2canvas from "html2canvas";
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { BlockchainAuthContext } from '../../../../Context/UserContext/BlockchainContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import AskReceiverMail from './AskReceiverMail';
import ShowUser from './ShowUser';
import QRCode from 'qrcode'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

export const DashboardCreateCertificateTemplate = () => {
    const variant = 'warning';
    const fileInputRef = useRef(null);
    const { isInFolder, folder, isSub, folderId } = useParams();
    const fileInputImgRef = useRef(null);
    const [previewImg, setPreviewImg] = useState("");
    const [canvas, setCanvas] = useState(null);
    const canvasRef = useRef(null);
    const [refetch, setRefetch] = useState(false);
    const [textboxes, setTextboxes] = useState([]);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const certificateTemplateV2 = useRef(null);
    const [img, setImg] = useState("");
    const [upType, setUpType] = useState("");
    // const [walletAddress, setWalletAddress] = useState("");
    const [showTemplate, setShowTemplate] = useState(false);
    // const [email, setEmail] = useState("");
    const { user, allUser, userRefetch, setUserRefetch } = useContext(UserAuthContext);
    const { mintNFT, } = useContext(BlockchainAuthContext);
    const handleCloseTemplate = () => setShowTemplate(false);
    const handleShowTemplate = () => setShowTemplate(true);
    const handleClickOpen = () => setOpen(() => true);
    const handleClose = () => setOpen(() => false);
    const [open, setOpen] = useState(false);
    const [elements, setElements] = useState({ name: null, tHash: null, ipHash: null, qr: null });
    const [src, setSrc] = useState("");
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontColor, setFontColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial, Helvetica, sans-serif');
    const [selectedTextbox, setSelectedTextbox] = useState(null);

    useEffect(() => {
        // Create the canvas once when the component mounts
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: 'transparent',
        });
        setCanvas(fabricCanvas);

        const img = new Image();
        img.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

        function deleteObject(eventData, transform) {
            var target = transform.target;
            var canvas = target.canvas;
            canvas.remove(target);
            canvas.requestRenderAll();
            setTextboxes((prevTextboxes) => prevTextboxes.filter((item) => item !== target));
        }
        function deleteObjectImg(eventData, transform) {
            var target = transform.target;
            var canvas = target.canvas;
            canvas.remove(target);
            canvas.requestRenderAll();
            setImages((prevTextboxes) => prevTextboxes.filter((item) => item !== target));
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
            mouseUpHandler: deleteObjectImg,
            render: renderIcon(img),
            cornerSize: 24
        });

        // Clean up the canvas when the component unmounts
        return () => {
            fabricCanvas.dispose();
        };
    }, []);

    const addTextbox = () => {

        const textbox = new fabric.Textbox('Your text here', {
            left: 350,
            top: 30,
            width: 200,
            fontSize: 24,
            fontFamily: 'Arial, Helvetica, sans-serif',
            borderColor: 'black',
            fill: 'black',
        });

        // Add the new textbox to the canvas
        canvas.add(textbox);
        canvas.setActiveObject(textbox);
        canvas.renderAll();

        // Update the textboxes state with the new textbox
        setTextboxes((prevTextboxes) => [...prevTextboxes, textbox]);

    };
    // Event listener for text changes (moved outside of the useEffect)
    useEffect(() => {
        if (canvas) {
            canvas.on('text:changed', (options) => {
                console.log('Text changed:', options.target.text);
            });
            canvas.on('object:selected', (e) => {
                setSelectedTextbox(e.target);
                setFontStyle(e.target.fontStyle || 'normal');
                setFontColor(e.target.fill || '#000000');
                setFontFamily(e.target.fontFamily || 'Arial, Helvetica, sans-serif');
            });
        }
    }, [canvas]);

    useEffect(() => {
        if (img) {
            exportAsImage();
        }
    }, [img]);
    useEffect(() => {
        window.scrollTo(0, 0);
        generateQR();
    }, []);
    const handleFontStyleChange = (e) => {
        const newFontStyle = e.target.value;
        const target = canvas.getActiveObject();
        if (target && target.type === 'textbox') {
            target.set('fontStyle', newFontStyle);
            setFontStyle(newFontStyle);
            canvas.renderAll();
        }
    };

    const handleFontColorChange = (e) => {
        const newFontColor = e.target.value;
        const target = canvas.getActiveObject();
        if (target && target.type === 'textbox') {
            target.set('fill', newFontColor);
            setFontColor(newFontColor);
            canvas.renderAll();
        }
    };

    const handleFontFamilyChange = (e) => {
        const newFontFamily = e.target.value;
        const target = canvas.getActiveObject();
        if (target && target.type === 'textbox') {
            target.set('fontFamily', newFontFamily);
            setFontFamily(newFontFamily);
            canvas.renderAll();
        }
    };
    const deleteLastTextbox = () => {
        if (textboxes.length > 0) {
            const lastTextbox = textboxes[textboxes.length - 1];
            canvas.remove(lastTextbox);
            setTextboxes((prevTextboxes) => prevTextboxes.slice(0, -1));
        }
    };
    const FontOptions = () => {
        return (
            <div className='handleAllOptions overflow-hidden d-flex flex-wrap justify-content-start align-items-center' style={{ gap: "15px" }}>
                <label htmlFor="fontStyle" className='text-primary'>Font Style:</label>
                <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange} className='form-select'>
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                    <option value="underline">Underline</option>
                    <option value="oblique">Oblique</option>
                </select>
                <label htmlFor="fontColor" className='text-success'>Font Color:</label>
                <input
                    type="color"
                    id="fontColor"
                    value={fontColor}
                    onChange={handleFontColorChange}
                // className='form-control'
                />
                {/* <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                <Form.Control
                    type="color"
                    id="exampleColorInput"
                    value={fontColor}
                    onChange={handleFontColorChange}
                    title="Choose your color"
                /> */}
                <label htmlFor="fontFamily" className='text-danger'>Font Family:</label>
                <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange} className='form-select'>
                    <option value="Arial, Helvetica, sans-serif">Arial</option>
                    <option value="Times New Roman, serif">Times New Roman</option>
                    <option value="Verdana, Geneva, sans-serif">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Impact">Impact</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Playball">Playball</option>
                    {/* Add more font options as needed */}
                </select>
            </div>
        );
    };
    // const addImage = (url) => {
    //     fabric.Image.fromURL(url, (img) => {
    //         // Add the new image to the canvas
    //         img.set({
    //             left: 100,
    //             top: 100,

    //         });
    //         img.scale(0.5).set('flipX', true);
    //         canvas.add(img);
    //         canvas.setActiveObject(img);
    //         canvas.renderAll();

    //         // Update the images state with the new image
    //         setImages((prevImages) => [...prevImages, img]);
    //     });
    // };

    const addImage = (file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const url = event.target.result;
            fabric.Image.fromURL(url, (img) => {
                // Add the new image to the canvas
                img.set({ left: 250, top: 100 });
                img.scale(0.5).set('flipX', true);
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();

                // Update the images state with the new image
                setImages((prevImages) => [...prevImages, img]);
            });
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            addImage(file);
        }
    };

    const deleteLastItem = () => {
        // const lastTextbox = textboxes[textboxes.length - 1];
        // const lastImage = images[images.length - 1];

        // if (lastTextbox) {
        //     canvas.remove(lastTextbox);
        //     setTextboxes((prevTextboxes) => prevTextboxes.slice(0, -1));
        // } else if (lastImage) {
        //     canvas.remove(lastImage);
        //     setImages((prevImages) => prevImages.slice(0, -1));
        // }

        if (images.length > 0) {
            const lastImage = images[images.length - 1];
            canvas.remove(lastImage);
            setImages((prevImages) => prevImages.slice(0, -1));
        }

    };

    const handleTemp = () => {
        handleButtonClick();
    }
    const handleTempImg = () => {
        handleButtonClickImg();
    }
    const handleButtonClick = async () => {
        console.log("Button clicked");
        // Trigger the click event of the hidden file input when the button is clicked
        await fileInputRef.current.click();
    };
    const handleButtonClickImg = async () => {
        console.log("Button clicked");
        // Trigger the click event of the hidden file input when the button is clicked
        await fileInputImgRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        let url = URL.createObjectURL(event.target.files[0]);
        setPreviewImg(() => url);
        // Do something with the selected file, like uploading or displaying it
        console.log('Selected file:', selectedFile);
    };
    const generateQR = async (email, IPFS, tHash) => {
        try {
            console.log("after gen", IPFS, tHash);
            let text = `Receiver Email: ${email} Issuer: ${(user?.org_individual_Name) ? user?.org_individual_Name : user?.email}, IPFS Hash: ${IPFS}, Transaction Hash: ${tHash} .`
            await QRCode.toDataURL(text).then(setSrc);
        } catch (err) {
            console.error(err, "err");
        }
    };
    const exportAsImage = async () => {
        if (certificateTemplateV2.current) {

            const canvas = await html2canvas(certificateTemplateV2.current, {
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
            data.append("issuerName", user?.org_individual_Name);
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
                        <h4 className='dTitle mb-0'>Create Template</h4>
                    </div>

                    <div className="text-center mx-auto d-none">
                        <input type="file" id="upload" accept="image/*" hidden ref={fileInputRef}
                            onChange={handleFileChange} />
                        <p className='m-0' onClick={() => handleButtonClick()}> Upload Template</p>
                        <input type="file" accept="image/*" onChange={handleFileInputChange} hidden ref={fileInputImgRef} />
                        <p className='mb-0' onClick={() => handleButtonClickImg()}>Upload Img</p>
                    </div>
                </div>
                <div className='mt-3 d-flex justify-content-start align-items-center flex-wrap' style={{ gap: "15px" }}>
                    <Button variant='warning' onClick={() => handleTemp()}> Upload Template</Button>
                    <Button variant='warning' onClick={() => addTextbox()}>Add text</Button>
                    {/* {selectedTextbox && <FontOptions />} */}
                    <Button variant='warning' onClick={() => handleTempImg()}>Add Image</Button>
                    <FontOptions />
                </div>

                {/* <div className='mx-auto text-center my-5'>
                    {previewImg && <img src={previewImg} alt="img" className='img-fluid' width={700} />}
                </div> */}
                {/* <div className={`bg-issue mx-auto text-center my-5`} style={{ backgroundImage: `url(${previewImg})` }} ref={certificateTemplateV2}>
                    <div>
                        <canvas ref={canvasRef} width={700} height={window.innerWidth < 650 ? 300 : 500} />
                    </div>
                </div> */}

                <div className='mx-auto text-center my-5 bg-issue position-relative' ref={certificateTemplateV2}>
                    {previewImg && <img src={previewImg} alt="img" className='img-fluid img-height' />}
                    <div className='handleCanvas'>
                        <canvas ref={canvasRef} width={700} height={window.innerWidth < 650 ? 300 : 500} />
                    </div>
                </div>

                <div className='text-center titleCrV2 mt-3'>
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
                            <Button variant='warning' className="text-global px-4 py-2 rounded-pill" onClick={() => { setLoading(true); handleShowTemplate(); exportAsImage() }} disabled={!previewImg}>Upload  on Blockchain</Button>
                    }
                </div>
                {showTemplate && <AskReceiverMail showTemplate={showTemplate} handleCloseTemplate={handleCloseTemplate} handleShowTemplate={handleShowTemplate} validEmail={validEmail} uploadToBlockchain={uploadToBlockchain} setLoading={setLoading} />}
                {open && <ShowUser open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} elements={elements} />}
            </div>
        </section >
    );
};
