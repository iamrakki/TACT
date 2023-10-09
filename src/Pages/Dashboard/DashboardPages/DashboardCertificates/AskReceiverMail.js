import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const AskReceiverMail = ({ showTemplate, handleCloseTemplate, handleShowTemplate, validEmail, uploadToBlockchain, setLoading }) => {
    const [value, setValue] = useState("");

    return (
        <div>
            <Modal show={showTemplate} onHide={handleCloseTemplate} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Receiver Email Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleCloseTemplate(); setLoading(false); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        validEmail(value);
                        handleCloseTemplate();
                    }}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AskReceiverMail;