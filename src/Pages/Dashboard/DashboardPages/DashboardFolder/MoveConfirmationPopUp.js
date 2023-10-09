import React from 'react';
import { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MoveConfirmationPopUp = ({ show, handleCancel, confirmFolder, password, setPassword }) => {

    return (
        <div>

            <Dialog open={show} onClose={handleCancel}>
                <DialogTitle>Are you sure to move this file?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To confirm your authorization please enter your password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={() => { confirmFolder(); handleCancel() }}>Move</Button>
                </DialogActions>
            </Dialog>

            {/* <Modal show={show} onHide={handleCancel} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure to move this file?</Modal.Title>
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
                    <Button variant="danger" onClick={() => { confirmFolder(); handleCancel() }}>
                        Move
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    );
};

export default MoveConfirmationPopUp;