import React, { useContext } from 'react';
import { UserAuthContext } from '../../../Context/UserContext/UserContext';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { secret, requestLoading, setRequestLoading, signUpUserIndi, signUpUserIssuer, verifyingOTP, loginUser, user, setUserRefetch, loadingUser, forgotPassword, sendResetPasswordMail } = useContext(UserAuthContext);
    const { token } = useParams();

    const reseting = async (e) => {
        e.preventDefault();
        let password = e.target.password.value;
        await forgotPassword(password, token);
    }

    return (
        <section className='bg-particular d-flex justify-content-center align-items-center' style={{ height: '82vh' }}>
            <div className='container'>
                <h4 className='titleOfCentral'>Reset Password</h4>
                <div className='cardLogin mx-auto mt-4'>
                    <form onSubmit={reseting}>
                        <div className='forCssLogin'>
                            <label>New Password</label>
                            <input type="password" name='password' required />
                        </div>

                        <div className='mx-auto text-center'>
                            {loadingUser ? <Button variant="warning" className='px-5 py-3 rounded-pill' style={{ fontSize: '20px' }} disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span>Loading...</span>
                            </Button> : <Button variant="warning" className='px-5 py-3 rounded-pill' style={{ fontSize: '20px' }} type='submit'>Reset</Button>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;