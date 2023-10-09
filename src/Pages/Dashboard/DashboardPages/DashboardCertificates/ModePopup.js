import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const ModePopup = ({ modeOpen, setModeOpen, handleModeOpen, handleModeClose, path }) => {
    const { folderStructure } = useContext(UserAuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <Dialog
                open={modeOpen}
                onClose={handleModeClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Choose your mode"}
                    <p style={{
                        color: "#545454",
                        textAlign: "start",
                        fontFamily: 'Saira, sans-serif',
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal"
                    }} className='mb-0'>A Blockchain + AI Based Product Made For Super-easy & Time-saving on </p>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleModeClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ padding: '10px 24px', paddingBottom: '30px' }} className='mx-auto'>

                    <Button onClick={() => {
                        handleModeClose();
                        navigate(`${path}/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}?isBulk=${false}`);
                    }} sx={{ borderRadius: '54px', border: ' 1px solid #2A339B', width: '150px' }} className='me-2'>Individual</Button>
                    <Button onClick={() => {
                        handleModeClose();
                        navigate(`${path}/${folderStructure?.isInFolder}/${folderStructure?.folder}/${folderStructure?.isSub}/${folderStructure?.folderId}?isBulk=${true}`);
                    }} sx={{ borderRadius: '54px', border: ' 1px solid #2A339B', width: '150px' }} className='ms-2' >
                        Bulk
                    </Button>


                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ModePopup;