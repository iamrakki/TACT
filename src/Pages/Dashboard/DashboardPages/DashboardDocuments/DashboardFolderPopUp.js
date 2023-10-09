import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CryptoJS from "crypto-js";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonB from 'react-bootstrap/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import NewFolderPopUp from '../DashboardFolder/NewFolderPopUp';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth > 420 ? 400 : 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function ChildModal({ warnHandleClose, data, dataFetch }) {
    const { user, secret, checkPassword, certificate, dataFetchCertificate, folderStructure, setFolderStructure } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openFol, setOpenFol] = React.useState(false);

    const handleClickOpenFol = () => {
        setOpenFol(true);
    };

    const handleCloseFol = () => {
        setOpenFol(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        // setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
        setOpen(false);
    };
    const handleToggle = (event, nodeIds) => {
        setExpanded(() => nodeIds);
        // console.log(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(() => nodeIds);
        // console.log(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
        );
    };

    const handleSelectClick = () => {
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : [],
        );
    };

    const clickNext = () => {
        handleClose();
        warnHandleClose();

        const dataObj = {
            isInFolder: folderStructure?.isInFolder, folder: folderStructure?.folder, isSub: folderStructure?.isSub, folderId: folderStructure?.folderId
        }
        handleClose();

    }
    // console.log(folderStructure)
    const createNew = async (name, email) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);

        await axios.post("https://api.zecurechain.com/api/v1/folder", { name: name, email: user?.email }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(async res => {
                if (res.status == 200) {
                    toast.success(`${res.data?.data?.name} has been created!`);
                    await dataFetch();
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data?.message);
            })
            .finally(() => {
            })

        handleCloseFol();
    }
    return (
        <React.Fragment>

            <Button onClick={handleOpen}>Choose folder</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, height: 300, flexGrow: 1, overflow: 'hidden', color: 'black' }}>
                    <Typography gutterBottom className='py-2'>
                        <h5 style={{
                            color: '#000', fontFamily: 'Lexend', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal',
                        }}>Select Folder</h5>
                        <ButtonB variant="warning" className='rounded-pill' size='sm' onClick={() => handleClickOpenFol()} style={{
                            position: 'absolute',
                            right: 30,
                            top: 20,
                        }}><AiOutlineFolderOpen /> Create Folder</ButtonB>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: -5,
                                top: -5,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Typography>


                    <Box sx={{ height: 170, width: '100%', flexGrow: 1, overflowY: 'auto', color: '#5B5B5B', }}>
                        {
                            data ? <TreeView
                                aria-label="controlled"
                                // defaultCollapseIcon={<AiOutlineFolderOpen />}
                                // defaultCollapseIcon={<AiOutlineFolderOpen />}
                                // defaultExpandIcon={<AiOutlineFolderOpen />}
                                expanded={expanded}
                                selected={selected}
                                onNodeToggle={handleToggle}
                                onNodeSelect={handleSelect}
                                multiSelect
                                sx={{
                                    '& .MuiTreeItem-content': {
                                        borderBottom: '1px solid #CACACA;',
                                        marginBottom: '5px',
                                        height: '30px'

                                    },
                                    '& .MuiTreeItem-root': {

                                    },
                                    '& .MuiTreeItem-label': {
                                        color: '#5B5B5B',
                                        fontFamily: 'Lexend',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        lineHeight: 'normal',
                                    },
                                    '& .Mui-selected': {
                                        // backgroundColor: 'transparent !important'
                                    },

                                }}
                            >
                                {
                                    data?.map((item, index) => <TreeItem nodeId={item?._id} label={<div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{
                                            color: '#5B5B5B',
                                            fontFamily: 'Lexend',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 300,
                                            lineHeight: 'normal',
                                        }}>
                                            {item?.name}
                                        </Typography>
                                        {item?.subFolders?.length > 0 && (
                                            <ExpandMoreIcon style={{ marginLeft: 'auto' }} /> // Custom arrow icon
                                        )}
                                    </div>} onClick={() => setFolderStructure({ isInFolder: true, folder: item?.name, isSub: false, folderId: item?._id })} icon={<AiOutlineFolderOpen />}>
                                        {
                                            item?.subFolders?.map(sub => <TreeItem nodeId={sub?._id} icon={<AiOutlineFolderOpen />} label={<Typography sx={{
                                                color: '#5B5B5B',
                                                fontFamily: 'Lexend',
                                                fontSize: '14px',
                                                fontStyle: 'normal',
                                                fontWeight: 300,
                                                lineHeight: 'normal',
                                            }}>
                                                {sub?.subName}
                                            </Typography>} onClick={() => setFolderStructure({ isInFolder: true, folder: sub?.subName, isSub: true, folderId: sub?._id })} />)
                                        }
                                    </TreeItem>)
                                }


                            </TreeView> : <p>No folder found!</p>
                        }
                    </Box>

                    <Button onClick={clickNext} sx={{
                        position: 'absolute',
                        bottom: 7,
                        right: 8
                    }}>Next</Button>
                </Box>
            </Modal>
            {openFol && <NewFolderPopUp open={openFol} setOpen={setOpenFol} handleClickOpen={handleClickOpenFol} handleClose={handleCloseFol} createNew={createNew} />}
        </React.Fragment >
    );
}

const DashboardFolderPopUp = ({ warnOpen, setWarnOpen, warnHandleOpen, warnHandleClose, data, dataFetch }) => {
    const navigate = useNavigate();
    const { setFolderStructure } = useContext(UserAuthContext);

    let isInFolderStatic = false;
    let folderStatic = null;
    let isSubStatic = false;
    let folderIdStatic = null;
    const agreement = () => {
        let folderData = {
            isInFolder: isInFolderStatic,
            folder: folderStatic,
            isSub: isSubStatic,
            folderId: folderIdStatic
        }

        setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null });
        warnHandleClose(folderData);

    }
    return (
        <div >
            {/* <Button onClick={warnHandleOpen}>Open modal</Button> */}
            <Dialog
                open={warnOpen}
                onClose={warnHandleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Continue Without Folder?"}</DialogTitle>

                <DialogActions>
                    <ChildModal warnHandleClose={warnHandleClose} data={data} dataFetch={dataFetch} />
                    <Button onClick={() => { setFolderStructure({ isInFolder: false, folder: null, isSub: false, folderId: null }); agreement(); }}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DashboardFolderPopUp;