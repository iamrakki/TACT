import React, { useContext } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UserAuthContext } from '../../../Context/UserContext/UserContext';

const ForgotPassword = ({ show, handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPass, setCPass] = useState("");
    const { secret, requestLoading, setRequestLoading, signUpUserIndi, signUpUserIssuer, verifyingOTP, loginUser, user, setUserRefetch, loadingUser, forgotPassword, sendResetPasswordMail } = useContext(UserAuthContext);

    const reseting = async () => {

        await sendResetPasswordMail(email);
        handleClose();
    }

    return (
        <div className=''>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Current Password"
                                autoFocus
                                required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                autoFocus
                                required
                                value={cPass} onChange={(e) => setCPass(e.target.value)}
                            />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => reseting()}>
                        Reset Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ForgotPassword;