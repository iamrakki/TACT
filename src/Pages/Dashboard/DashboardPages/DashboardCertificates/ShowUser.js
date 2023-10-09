import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paperWidthSm': {
        maxWidth: '1000px'
    }
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ShowUser({ open, setOpen, handleClickOpen, handleClose, elements }) {
    const { user, allUser } = React.useContext(UserAuthContext);
    const downloadCard = React.useRef(null);
    const [cardIssue, setCardIssue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [pdfUrl, setPdfUrl] = React.useState('');

    const exportAsImage = async () => {
        if (downloadCard.current) {

            const canvas = await html2canvas(downloadCard.current, {
                allowTaint: true,
                useCORS: true,
            });
            const image = canvas.toDataURL("image/jpeg", 1.0);
            // download the image
            // console.log(image, "img");
            setCardIssue(() => image);
            setLoading(() => false);
        }
    };

    // const handleDownload = () => {
    //     exportAsPDF();
    //     const link = document.createElement('a');
    //     link.href = pdfUrl;
    //     link.download = 'card_certificate.pdf'; // Set the desired file name for the downloaded PDF
    //     link.click();
    // };

    const exportAsPDF = async () => {

        try {
            setLoading(true);
            // const content = downloadCard.current;
            const content = document.getElementById('downloadCard').innerHTML;

            await axios.post("https://api.zecurechain.com/api/v1/certificate/convert-pdf-buffer", { content: content }, {
                headers: {
                    "content-type": "application/json"
                },
                responseType: 'arraybuffer'
            })
                .then(res => {
                    // console.log(res.data);
                    // if (res.status == 200) {
                    // setPdfUrl(() => res.data?.data);
                    // const link = document.createElement('a');
                    // link.href = res.data?.data;
                    // link.target = '_blank';
                    // link.download = 'card_certificate.pdf'; // Set the desired file name for the downloaded PDF
                    // link.click();
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'certificate.pdf';
                    a.click();
                    // }
                })
                .catch((e) => {
                    console.log(e)
                })
                .finally(() => {
                    setLoading(false);
                })

            // html2canvas(input, { backgroundColor: 'white' }).then(canvas => {
            //     const imgData = canvas.toDataURL('image/png');
            //     const pdf = new jsPDF({
            //         orientation: input.offsetWidth > input.offsetHeight ? 'landscape' : 'portrait',
            //         unit: 'px',
            //         format: [input.offsetWidth, input.offsetHeight],
            //     });
            //     pdf.addImage(imgData, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight);
            //     pdf.save('invoice_hidayahmart.pdf');

            // });

        } catch (error) {
            console.error('Error converting to PDF:', error);
        }

    };



    // React.useEffect(() => {
    //     // exportAsImage(QRCodeTemp.current, "qrCode");

    //     // console.log(cardIssue);
    //     exportAsImage();
    //     if (!cardIssue && loading) {
    //         exportAsImage();
    //     }

    //     setInterval(() => {
    //         if (!cardIssue) {

    //             exportAsImage();
    //         }
    //     }, 1000);

    // }, [cardIssue, loading]);

    const renderRing = () => {
        return
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div id='downloadCard'>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} className="handleTxtSize">

                        Certificate Issued Successfully
                    </BootstrapDialogTitle>
                    <Typography gutterBottom sx={{ color: 'black', fontSize: "20px" }}>Blockchain Certificate Details</Typography>
                    <Typography className='d-flex justify-content-between align-items-center'>

                        <Typography gutterBottom>
                            <p className='mb-1 text-break'><span className=' text-dark' style={{ fontWeight: 700 }}>Issuer Name:</span> {user?.org_individual_Name ? user?.org_individual_Name : user?.email}</p>
                            <p className='mb-1 text-break'><span className=' text-dark' style={{ fontWeight: 700 }}>Receiver Name:</span> {elements?.name}</p>
                            <p className='mb-1 d-flex justify-content-start align-items-start'><span className=' text-dark' style={{ width: "145px", fontWeight: 700 }}>Transaction Hash:</span> <span>{elements?.tHash}</span></p>
                            <p className='mb-1 d-flex justify-content-start align-items-start'><span className='text-dark' style={{ width: "135px", fontWeight: 700 }}>Certificate Hash:</span> <a href={`https://gateway.pinata.cloud/ipfs/${elements?.ipHash}`} target='_blank' rel="noreferrer">{elements?.ipHash}</a></p>
                        </Typography>
                        <Typography gutterBottom>
                            <img src={elements?.qr} alt="logo" className='ms-2' style={{ height: '100px', width: '100px' }} />
                        </Typography>

                    </Typography>
                </div>
                <DialogActions>
                    {
                        loading ? <Button autoFocus disabled>
                            Loading...
                        </Button> : <Button autoFocus onClick={() => exportAsPDF()}>
                            Download
                        </Button>
                    }

                    <Button autoFocus onClick={() => handleClose()}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}