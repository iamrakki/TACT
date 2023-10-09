import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button } from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        paddingTop: '5px',
        paddingBottom: '0px',
        color: '#5B5B5B',
        fontFamily: 'Lexend',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        justifyContent: 'center'
    },
    '& .MuiDialog-paper': {
        maxWidth: '450px',
        width: '450px',
        // height: '226px',
    },
    '& .MuiDialogTitle-root': {
        color: '#000',
        fontFamily: 'Lexend',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        paddingTop: '20px'
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


const NewFolderPopUp = ({ open, setOpen, handleClickOpen, handleClose, createNew }) => {
    const [name, setName] = useState("");
    const { user, secret } = useContext(UserAuthContext);

    const handleSubmit = async () => {
        await createNew(name, user?.email);
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create New Folder
                </BootstrapDialogTitle>
                <DialogContent >
                    <Typography gutterBottom>
                        <input type="text" className='folder-input' autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                    </Typography>
                    <Typography gutterBottom>
                        Only Empty Folders Can Be Deleted
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button variant="warning" className='rounded-pill mb-2' style={{ fontSize: '18px', height: '50px', width: '150px' }} autoFocus onClick={() => handleSubmit()}>Create</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default NewFolderPopUp;