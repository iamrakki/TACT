import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { UserAuthContext } from '../../../Context/UserContext/UserContext';
import BottomHeader from './BottomHeader';
import MenuAvatar from '../MenuAvatar/MenuAvatar';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, LogOut } = useContext(UserAuthContext);

    // console.log(folderStructure);
    const pathname = useLocation().pathname;
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const callingMetamask = () => {
        // openWalletModal();
        // setAnchorEl(null);
    };
    const connectToTrustWallet = () => {
        return;
    }
    const connectToWalletConnect = () => {
        return;
    }
    const connectToCoinbase = () => {
        return;
    }
    return (
        <div className='header-bg'>
            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand} collapseOnSelect className=" p-2 text-white border-0  navbarFont">
                    <Container>
                        <Navbar.Brand href="#" as={Link} to={"/"} className='for-logo-width'>
                            <img src="/assets/images/logo.svg" alt="" className=' img-fluid' />

                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="w-75 text-white"
                            style={{ background: (window.innerWidth < 770) ? "radial-gradient(50% 50.00% at 50% 50.00%, #2D37A6 0%, #161958 100%)" : "transparent" }}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <img src="./assets/images/logo.svg" alt="" className=' img-fluid' />

                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end align-items-center flex-grow-1  text-white">
                                    <NavDropdown
                                        title="Products"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        className={`text-white px-sm-0 px-md-2 px-xl-3 bootstrap-custom-dropdown-header ${(pathname.includes("/home")) ? "" : ""}`}
                                    >
                                        <NavDropdown.Item href="#action3" as={Link} to={"/certificates"} >Certificates</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4" as={Link} to={"/documents"}>
                                            Documents
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Explorer
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#action1" as={Link} to={"/pricing"} className={`text-white px-sm-0 px-md-2 px-xl-3 ${(pathname.includes("/home")) ? "" : ""}`} >Pricing</Nav.Link>
                                    {/* {
                                    (!user?.walletAddress || user?.walletAddress === undefined || user?.walletAddress === "undefined") ? <Nav.Link onClick={() => {
                                        localStorage.setItem('selectedTab', "0");
                                        openWalletModalWarning();
                                    }} className={`text-white px-sm-0 px-md-2 px-xl-4 ${(pathname.includes("/dashboard")) ? "fw-bolder" : ""}`}>Dashboard</Nav.Link> :
                                        <Nav.Link href="#action2" as={Link} to={"/dashboard"} className={`text-white px-sm-0 px-md-2 px-xl-4 ${(pathname.includes("/dashboard")) ? "fw-bolder" : ""}`} onClick={() => {
                                            localStorage.setItem('selectedTab', "0");
                                        }}>Dashboard</Nav.Link>
                                } */}
                                    <NavDropdown
                                        title="Resources"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        className={`text-white px-sm-0 px-md-2 px-xl-3 bootstrap-custom-dropdown-header ${(pathname.includes("/home")) ? "" : ""}`}
                                    >
                                        <NavDropdown.Item href="#action3" as={Link} to={"/faq"}>FAQ</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4" as={Link} to={"/about-us"}>
                                            About US
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action5" as={Link} to={"/blogs"}>
                                            Blogs
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action4" as={Link} to={"/comingsoon"}>
                                            Tutorials
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#action3" className={`text-white px-sm-0 px-md-2 px-xl-3 ${(pathname.includes("/contact-us")) ? "" : ""}`} as={Link} to="/contact-us">Contact Us</Nav.Link>

                                    {
                                        user && <Nav.Link className='text-white'><MenuAvatar /></Nav.Link>
                                    }
                                    {!user && <Nav.Link className='text-white'>

                                        <Button variant="warning" className=' py-2 rounded-pill' onClick={() => navigate("/login")} style={{ width: '130px' }}>Sign In</Button>

                                    </Nav.Link>}
                                    {!user && <Nav.Link className='text-white'><Button variant="outline-light" className='px-4 py-2 rounded-pill' onClick={() => navigate("/sign-up")} style={{ width: '130px' }}>Register</Button>


                                    </Nav.Link>}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

            ))}

            <BottomHeader />
        </div>
    );
};

export default Header;