import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ConfirmationPopUp = ({ show, handleCancel, deleteFolder, password, setPassword }) => {

    return (
        <div>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure to delete this folder?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-danger'>Please enter your password.</h5>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                autoFocus
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { deleteFolder(); handleCancel() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ConfirmationPopUp;