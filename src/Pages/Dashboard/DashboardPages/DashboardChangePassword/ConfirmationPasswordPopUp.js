import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

const ConfirmationPasswordPopUp = ({ open, setOpen, handleClickOpen, handleClose, user }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const sendWithOtp = async () => {
        setLoading(true);
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);
        await axios.post(`https://api.zecurechain.com/api/v1/user/sending-verification-otp/${user?.email}`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    // console.log(res.data)
                    handleClose();
                    navigate("/dashboard/dashboard-otp");
                    toast.success("We have sent a otp to your mail, please verify it!");
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error("Failed to send otp!");
            })
            .finally(() => {
                setLoading(false);
            })

    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm to change your password?"}
                </DialogTitle>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>No</Button>
                    <Button variant="outlined" disabled={loading} onClick={() => {
                        sendWithOtp()
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationPasswordPopUp;