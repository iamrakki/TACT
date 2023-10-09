import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ButtonB from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function DeclinedPopUp(props) {
    const { open, setOpen, handleClickOpen, handleClose, ...other } = props;
    const navigate = useNavigate();
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                disableEscapeKeyDown={true} // Disable closing via Escape key
                aria-describedby="alert-dialog-slide-description"
                {...other}

            >
                <DialogTitle>{"Subscribe Now for Exclusive Access!"}</DialogTitle>
                <DialogContent sx={{
                    '&.MuiDialogContent-root': {
                        paddingBottom: '10px'
                    }
                }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        14 days Trail Period Completed, Subscribe to View & get Credits
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    '&.MuiDialogActions-root': {
                        paddingBottom: '15px'
                    }
                }}>
                    <ButtonB variant='warning' onClick={() => { navigate("/pricing"); handleClose(); }}>Subscribe</ButtonB>
                    <ButtonB variant='danger' style={{
                        textAlign: "center",
                        fontFamily: "Lexend",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal"
                    }} onClick={() => { navigate("/"); handleClose(); }}>Cancel</ButtonB>
                </DialogActions>
            </Dialog>
        </div>
    );
}
DeclinedPopUp.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};