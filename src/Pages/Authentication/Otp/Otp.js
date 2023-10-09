import React, { useContext, useEffect, useState } from 'react';
import './Otp.css';
import OtpInput from 'react-otp-input';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserAuthContext } from '../../../Context/UserContext/UserContext';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const { id } = useParams();
    const { secret, requestLoading, setRequestLoading, signUpUserIndi, signUpUserIssuer, verifyingOTP, loginUser, user, setUserRefetch, loadingUser, emailPro, resendOTP } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        let intervalId;

        if (seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            // setSeconds // Call the function to trigger the OTP resend action
        }

        return () => clearInterval(intervalId); // Clean up the interval on unmount

    }, [seconds]);

    const verifying = async () => {
        await verifyingOTP(otp);
    }
    const resendOTPIssue = async () => {
        if (seconds <= 0) {
            setSeconds(() => 60);
            await resendOTP(emailPro, 'signin');
        }
    }
    const handleKeyPress = async (e) => {
        // console.log('E', e);
        if (e.key === 'Enter') {
            // Call your function here
            await verifyingOTP(otp);
        }
    };
    return (
        <section className=' d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <div className='container my-5 my-lg-3'>
                <div className='d-flex justify-content-between align-items-center flex-column-reverse flex-lg-row' style={{ gap: '25px' }}>
                    <div className="" data-aos="zoom-out-right" data-aos-delay="50" data-aos-duration="1000">

                        <img src='/assets/images/loginpage-bg.png' alt='' className='img-fluid' width={600} />

                    </div>


                    <div className='  mx-auto text-center div-otp shadow-lg' data-aos="zoom-out-left" data-aos-delay="50" data-aos-duration="1000">
                        <div>
                            <h4 style={{
                                color: '#333333',
                                textAlign: 'center',
                                fontFamily: 'Lexend',
                                fontSize: '20px',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: 'normal',
                            }}>Enter OTP Sent To Email-Id</h4>
                            <div className='mx-auto text-center my-4'>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}

                                    numInputs={6}
                                    inputType="number"
                                    shouldAutoFocus={true}
                                    containerStyle={{ width: "100%", marginLeft: "auto", marginRight: "auto", textAlign: "center", overflow: 'hidden' }}
                                    inputStyle={{ borderRadius: "15px", border: "1px solid #7C89E4", width: window.innerWidth < 500 ? "40px" : "50px", height: window.innerWidth < 500 ? "40px" : "50px", outline: "none", fontWeight: "400", fontSize: "22px", fontFamily: "Lexend", textAlign: "center", background: "white", color: "black" }}
                                    renderSeparator={<span className='mx-2'></span>}
                                    renderInput={(props) => <input {...props} onKeyDown={handleKeyPress} />}
                                />
                                <p className='text-end text-danger pt-3 fw-bolder' style={{ fontFamily: "Open Sans", cursor: 'pointer' }} onClick={() => resendOTPIssue()}>Resend OTP{seconds > 0 ? ` (${seconds})` : ""}</p>
                            </div>

                            <div className='mx-auto text-center'>
                                {
                                    loadingUser ? <Button variant="warning" className='px-5 py-3 rounded-pill' style={{ fontSize: '20px' }} disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span>Loading...</span>
                                    </Button> :
                                        <Button variant="warning" className='px-5 py-3 rounded-pill' style={{ fontSize: '20px' }} onClick={() => verifying()}>Confirm</Button>
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Otp;