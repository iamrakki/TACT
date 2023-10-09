import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ButtonB from 'react-bootstrap/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { UserAuthContext } from '../../Context/UserContext/UserContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import DashboardSearchBar from './DashboardSearchBar';
import DeclinedPopUp from './DeclinedPopUp';

const TabWithIcon = ({ label, icon, ...rest }) => (
    <Tab
        {...rest}
        label={
            <div className='d-flex justify-content-start align-items-center text-start w-100'>
                <img src={icon} alt="Icon" style={{ marginRight: '8px' }} className='img-fluid' />
                {label}
            </div>
        }
    />
);

const Dashboard = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const hideNested = pathname.includes("/dashboard-create-certificates");
    const { user, lock } = useContext(UserAuthContext);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        sessionStorage.setItem('selectedTab', newValue.toString());
    };
    useEffect(() => {
        const selectedTab = sessionStorage.getItem('selectedTab');
        if (selectedTab && !pathname.includes("/dashboard-profile")) {
            setValue(parseInt(selectedTab));
        }
        else {
            setValue(0);
        }
    }, [navigate, pathname]);
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        if (user && (user?.isLock || lock)) {
            handleClickOpen();
        }
    }, [user, value, lock]);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, bgcolor: 'radial-gradient(50% 50.00% at 50% 50.00%, #2D37A6 0%, #161958 100%)', color: 'white' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className='mx-auto text-center d-flex justify-content-center align-items-center mb-2 mt-3'>
                <Avatar
                    alt="Remy Sharp"
                    src={`${user?.photo ? user?.photo : '/assets/images/avatar.jpg'}`}
                    sx={{ width: 56, height: 56, }}
                />
            </div>
            <Divider sx={{ bgcolor: 'white' }} />

            <DashboardSearchBar classes={"mt-4 ms-1"} />
            <List>
                <ListItem disablePadding >
                    <ListItemButton onClick={() => navigate("dashboard-home")}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={"/assets/images/dashboardHomeL.svg"}
                                className=''

                                sx={{
                                    borderRadius: '0', width: 22, height: 22, ml: '1px'

                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={"DASHBOARD"} sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 400
                            }
                        }} />
                    </ListItemButton>
                </ListItem>
                {user?.types == "issuer" && <ListItem disablePadding >
                    <ListItemButton onClick={() => navigate("dashboard-certificates-origin")}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={"/assets/images/certificatelogov3L.svg"}
                                sx={{
                                    borderRadius: '0', width: 25, height: 25,

                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={"CERTIFICATE"} sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 400
                            }
                        }} />
                    </ListItemButton>
                </ListItem>}
                {/* <ListItem disablePadding >
                    <ListItemButton onClick={() => navigate("dashboard-certificates")}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={"/assets/images/certificatelogo.png"}
                                className="img-fluid"
                            />
                        </ListItemAvatar>
                        <ListItemText primary={"My Certificate"} sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 400
                            }
                        }} />
                    </ListItemButton>
                </ListItem> */}
                <ListItem disablePadding >
                    <ListItemButton onClick={() => navigate("dashboard-document")}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={"/assets/images/FileArchiveL.svg"}
                                sx={{
                                    borderRadius: '0', width: 25, height: 25,

                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={"DOCUMENT"} sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 400
                            }
                        }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding >
                    <ListItemButton onClick={() => navigate("dashboard-folder")}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={"/assets/images/FolderSimpleLockL.svg"}
                                sx={{
                                    borderRadius: '0', width: 25, height: 25,

                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={"MY DRIVE"} sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 400
                            }
                        }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding >
                    <ListItemButton onClick={() => navigate("dashboard-explorer")}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={"/assets/images/BinocularsL.svg"}
                                sx={{
                                    borderRadius: '0', width: 25, height: 25,

                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={"EXPLORER"} sx={{
                            '& .MuiTypography-root': {
                                fontWeight: 400
                            }
                        }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    return (
        <section >
            <div className={`${(hideNested) ? 'd-none' : ''}`}>
                <div className='d-none d-sm-none d-lg-block'>
                    <div className='ms-4 ps-5 mb-3'>
                        {/* <Button variant="warning" className='px-4 py-2 ms-2 rounded-pill fs-5'>+ New</Button> */}

                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <ButtonB variant="warning" className='px-4 py-2 ms-2 rounded-pill fs-5' {...bindTrigger(popupState)} >+ New</ButtonB>
                                    {/* <Button variant="contained" {...bindTrigger(popupState)} className='px-4 py-2 ms-2 warning rounded-pill'>
                                        + New
                                    </Button> */}
                                    <Menu {...bindMenu(popupState)}>
                                        {user?.types == "issuer" && <MenuItem onClick={() => {
                                            setValue(() => 1); sessionStorage.setItem('selectedTab', "1");
                                            navigate("dashboard-certificates-origin"); popupState.close();
                                        }} sx={{ fontFamily: 'Lexend', fontSize: '16px', color: '#2A339B' }}><img src="/assets/images/certificatelogov3.png" className='img-fluid pe-2' alt="" /> Certificate</MenuItem>}
                                        <MenuItem onClick={() => { setValue(() => 2); sessionStorage.setItem('selectedTab', "2"); navigate("dashboard-document"); popupState.close(); }} sx={{ fontFamily: 'Lexend', fontSize: '16px', color: '#2A339B' }}><img src="/assets/images/FileArchive.png" className='img-fluid pe-2' alt="" /> Document</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>

                    </div>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', justifyContent: 'start', alignItems: 'start', }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{
                                width: 325, mt: '15px', textAlign: 'left',
                                '& .MuiTab-root': {
                                    color: '#2A339B',
                                    fontFamily: 'Lexend',
                                    fontSize: '17px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginBottom: '15px',
                                    textAlign: 'left',
                                    minWidth: '220px',
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    background: '#D6DBFB',
                                    borderRadius: "10px",
                                    color: '#2A339B',
                                    fontFamily: 'Lexend',
                                    fontSize: '17px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    minWidth: '220px',
                                    // boxShadow: '0 .2rem 0.5rem #D6DBFB',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    textAlign: 'left',
                                    backgroundImage: 'url("https://i.ibb.co/tp6zphv/right-Arrow.png")', // Add your image URL here
                                    backgroundSize: '12% auto',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 10px center',
                                }
                            }}
                        >
                            <TabWithIcon label="DASHBOARD" icon={`${pathname.includes("dashboard-home") ? '/assets/images/dashboardHomeIn.png' : '/assets/images/dashboardHome.png'}`} onClick={() => navigate("dashboard-home")} />
                            <TabWithIcon label="CERTIFICATE" className={`${user?.types == "issuer" ? "" : "d-none"}`} icon={`${pathname.includes("dashboard-certificates-origin") ? '/assets/images/certificatelogov3In.png' : '/assets/images/certificatelogov3.png'}`} onClick={() => navigate("dashboard-certificates-origin")} />
                            {/* <TabWithIcon label="My Certificate" icon="/assets/images/certificatelogo.png" onClick={() => navigate("dashboard-certificates")} /> 

                            {`${pathname.includes("dashboard-explore") ? '/assets/images/BinocularsIn.png' : '/assets/images/Binoculars.png'}`}
                            */}
                            <TabWithIcon label="DOCUMENT" icon={`${pathname.includes("dashboard-document") ? '/assets/images/FileArchiveIn.png' : '/assets/images/FileArchive.png'}`} onClick={() => navigate("dashboard-document")} />
                            <TabWithIcon label="MY DRIVE" icon={`${pathname.includes("dashboard-folder") ? '/assets/images/FolderSimpleLockIn.png' : '/assets/images/FolderSimpleLock.png'}`} onClick={() => navigate("dashboard-folder")} />
                            <TabWithIcon label="EXPLORER" icon={`${pathname.includes("dashboard-explore") ? '/assets/images/BinocularsIn.png' : '/assets/images/Binoculars.png'}`} onClick={() => navigate("dashboard-explorer")} />
                        </Tabs>

                        <div className='w-100 pb-5 pt-3' style={{ marginTop: '-80px', borderLeft: '1px solid radial-gradient(50% 50.00% at 50% 50.00%, #2D37A6 0%, #161958 100%)', minHeight: '90vh' }}>
                            <Outlet />
                        </div>

                    </Box>
                </div>

                <div className='d-block d-sm-block d-lg-none'>
                    <div >
                        <div className='handleSmDashHead'>
                            <img src="/assets/images/logo.png" alt="" className='img-fluid' width={150} onClick={() => navigate("/")} />
                            <ButtonB onClick={toggleDrawer('right', true)} variant='light'><MenuIcon /></ButtonB>
                        </div>
                        <SwipeableDrawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                            onOpen={toggleDrawer('right', true)}
                        >
                            {list('right')}
                        </SwipeableDrawer>
                    </div>
                    <div className='w-100 pb-5 pt-3 overflow-hidden'>
                        <Outlet />
                    </div>
                </div>
            </div>

            {open && <DeclinedPopUp open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />}

            <div className={`${(hideNested) ? '' : 'd-none'}`}>
                <Outlet />
            </div>
        </section >
    );
};

export default Dashboard;