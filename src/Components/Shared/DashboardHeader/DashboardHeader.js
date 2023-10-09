import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import './DashboardHeader.css';
import MenuAvatar from '../MenuAvatar/MenuAvatar';
import DashboardSearchBar from '../../../Pages/Dashboard/DashboardSearchBar';

const DashboardHeader = () => {

    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    return (
        <div className='d-none d-lg-block '>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} collapseOnSelect className=" p-3 text-white border-0 " style={{ background: 'radial-gradient(50% 50.00% at 50% 50.00%, #2D37A6 0%, #161958 100%)', border: "0", fontWeight: '400' }}>
                    <Container fluid>
                        <Navbar.Brand href="#" as={Link} to={"/"} className='for-logo-width'>
                            <img src="/assets/images/logo.png" alt="" className=' img-fluid' />

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
                                    <img src="/assets/images/logo.png" alt="" className=' img-fluid' />

                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end align-items-center flex-grow-1  text-white" style={{ gap: '50px' }}>

                                    <DashboardSearchBar classes={""} />
                                    <MenuAvatar />
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

            <div className='container-fluid mx-auto text-center'>
                <hr style={{ color: "white", border: "0px", background: "white" }} />

            </div>
        </div>
    );
};

export default DashboardHeader;