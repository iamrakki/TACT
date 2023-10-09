import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Button, Spinner } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';

const DashboardChangePasswordOtp = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(60);
    const [loadingUser, setLoadingUser] = useState(false);
    const { user, allUser, userRefetch, setUserRefetch, cerTemp } = useContext(UserAuthContext);

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
        setLoadingUser(true);
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);
        await axios.post(`https://api.zecurechain.com/api/v1/user/password/verify-otp`, { otp: otp }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200 && res.data?.status == true) {
                    // console.log(res.data)
                    navigate(`/dashboard/dashboard-change-password/${res.data?.token}`);
                    toast.success("OTP has been verified");
                }
                else {
                    // console.log(res.data);
                    toast.error("Failed to verify otp!");
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error("Failed to verify otp!");
            })
            .finally(() => {
                setLoadingUser(false);
            })
        setLoadingUser(false);
    }

    const resend = async () => {
        const tokens = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);
        await axios.post(`https://api.zecurechain.com/api/v1/user/sending-verification-otp/${user?.email}`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(tokens)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    // console.log(res.data)
                    // navigate("/dashboard/dashboard-otp");
                    toast.success("We have sent a otp to your mail, please verify it!");
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error("Failed to send otp!");
            })
            .finally(() => {
            })

    }

    const resendOTPIssue = async () => {
        if (seconds <= 0) {
            setSeconds(() => 60);
            await resend();
        }
    }


    return (
        <section style={{ minHeight: "70vh" }}>
            <div className='d-flex justify-content-start align-items-center container text-start mt-3' style={{ gap: '5px' }}>
                <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                <h4 className='dTitle' style={{ fontSize: '20px' }}>OTP</h4>
            </div>
            <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <div className='container my-5 my-lg-3'>
                    <div className='d-flex justify-content-between align-items-center flex-column-reverse flex-lg-row' style={{ gap: '25px' }}>
                        <div className="" data-aos="zoom-out-right" data-aos-delay="50" data-aos-duration="1000">

                            <img src='/assets/images/loginpage-bg.png' alt='' className='img-fluid' width={500} />

                        </div>


                        <div className='mx-auto text-center div-otp shadow-lg' data-aos="zoom-out-left" data-aos-delay="50" data-aos-duration="1000">
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
                                        inputStyle={{ borderRadius: "15px", border: "1px solid #7C89E4", width: window.innerWidth < 500 ? "40px" : "45px", height: window.innerWidth < 500 ? "40px" : "45px", outline: "none", fontWeight: "400", fontSize: "22px", fontFamily: "Lexend", textAlign: "center", background: "white", color: "black" }}
                                        renderSeparator={<span className='mx-2'></span>}
                                        renderInput={(props) => <input {...props} />}
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
            </div>
        </section>
    );
};

export default DashboardChangePasswordOtp;