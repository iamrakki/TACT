import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ButtonB from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubscriptionWarnPopup({ open, setOpen, handleClickOpen, handleClose }) {

    const navigate = useNavigate();

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle >{"Dear User"}</DialogTitle>
                <DialogContent sx={{
                    '&.MuiDialogContent-root': {
                        paddingBottom: '10px'
                    }
                }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        Trail version ends in <span className='fw-bold'>14 days</span>, subscribe Now.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    '&.MuiDialogActions-root': {
                        paddingBottom: '15px'
                    }
                }}>

                    <ButtonB variant='danger' style={{
                        textAlign: "center",
                        fontFamily: "Lexend",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal"
                    }} onClick={() => { handleClose(); }}>Later</ButtonB>
                    <ButtonB variant='warning' onClick={() => { navigate("/pricing"); handleClose(); }}>Subscribe</ButtonB>
                </DialogActions>
            </Dialog>
        </div>
    );
}