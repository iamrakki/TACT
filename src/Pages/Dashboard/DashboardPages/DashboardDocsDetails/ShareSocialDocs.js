import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
    PinterestShareButton,
    PinterestIcon,
    WhatsappIcon,
    WhatsappShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    InstapaperShareButton,
    InstapaperIcon
} from "react-share";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ShareSocialDocs = ({ open, setOpen, handleClickOpen, handleClose, pdfUrl }) => {
    // console.log("pdfurl", pdfUrl)
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='d-flex justify-content-between align-items-start'><span>Social Share</span> <span onClick={() => handleClose()} style={{ cursor: 'pointer' }}><CloseIcon /></span></DialogTitle>
                <DialogContent>
                    <div className="d-flex justify-content-center gap-2 mb-3 mt-2">

                        <LinkedinShareButton url={`${pdfUrl}`} title={`Document`}>
                            <LinkedinIcon size={40} round={true} />
                        </LinkedinShareButton>
                        <EmailShareButton url={`${pdfUrl}`} subject={`Document`}>
                            <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                        <TwitterShareButton

                            url={
                                `${pdfUrl}`
                            }
                            title={`Document`}
                        >
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                        <FacebookShareButton

                            url={
                                window.location.origin +
                                `${pdfUrl}`
                            }
                            title={`Document`}
                        >
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton

                            url={
                                `${pdfUrl}`
                            }
                            title={`Document`}
                        >
                            <FacebookMessengerIcon size={40} round={true} />
                        </FacebookMessengerShareButton>




                        <WhatsappShareButton

                            url={
                                `${pdfUrl}`
                            }
                            title={`Document`}
                        >
                            <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                        {/* 
                        <InstapaperShareButton
                            url={
                                window.location.origin +
                                `/`
                            }
                            title={`Certificate`}
                        >
                            <InstapaperIcon size={40} round={true} />
                        </InstapaperShareButton> */}
                    </div>
                </DialogContent>
                {/* <DialogActions>

                </DialogActions> */}
            </Dialog>
        </div>

    );
};

export default ShareSocialDocs;