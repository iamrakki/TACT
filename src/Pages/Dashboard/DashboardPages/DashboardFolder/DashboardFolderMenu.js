import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const options = [
    'Move'
];

const ITEM_HEIGHT = 48;

const DashboardFolderMenu = ({ name, id, handleClickOpenRe, handleShow, isDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const Id = open ? 'simple-popover' : undefined;
    return (
        <div className=''>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                aria-describedby={Id}

            >
                <MoreVertIcon sx={{ position: 'absolute', right: -10, color: 'darkblue' }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}

                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem key={"1"} onClick={() => { handleClose(); handleClickOpenRe(name) }} className='d-flex justify-content-start align-items-center' style={{ gap: "3px" }}>
                    <ModeEditIcon /> <span className='pt-1'> Edit</span>
                </MenuItem>
                <MenuItem key={"1"} onClick={() => { handleClose(); handleShow(id) }} className={`${isDelete ? '' : 'd-none'} d-flex justify-content-start align-items-center`} style={{ gap: "3px" }}>
                    <DeleteIcon /> <span className='pt-1'> Delete</span>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DashboardFolderMenu;