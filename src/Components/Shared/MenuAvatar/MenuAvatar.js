import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { UserAuthContext } from '../../../Context/UserContext/UserContext';
import { useNavigate } from 'react-router';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';


const MenuAvatar = () => {
    const { user, LogOut } = useContext(UserAuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, pt: 0, pb: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={`${user?.photo ? user?.photo : '/assets/images/avatar.jpg'}`}
                            sx={{ width: 42, height: 42 }}
                        />
                        <ArrowDropDownIcon fontSize='large' color='white' sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        backgroundColor: '#E5E9FF',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    navigate("/dashboard/dashboard-home");
                    sessionStorage.setItem('selectedTab', '0');
                    handleClose();
                }}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon> Dashboard
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate("/dashboard/dashboard-profile");
                    handleClose();
                }}>
                    <ListItemIcon><PersonAddAltIcon /></ListItemIcon> Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate("/pricing");
                    handleClose();
                }}>
                    <ListItemIcon><SubtitlesIcon /></ListItemIcon> My Subscription
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate("/contact-us");
                    handleClose();
                }}>
                    <ListItemIcon><HeadphonesIcon /></ListItemIcon> Support
                </MenuItem>
                <MenuItem onClick={() => { LogOut(); handleClose(); }}>
                    <ListItemIcon >
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment >
    );
};

export default MenuAvatar;