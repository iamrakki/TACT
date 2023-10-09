import React, { useContext, useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './DashboardChangePassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';

const DashboardChangePassword = () => {
    const [loadingUser, setLoadingUser] = useState(false);
    const { user, allUser, userRefetch, setUserRefetch, cerTemp } = useContext(UserAuthContext);
    const { token } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    const handleChangePass = async (e) => {
        e.preventDefault();

        let oldPassword = e.target.CurrPassword.value;
        let newPassword = e.target.newPassword.value;
        let conPass = e.target.ConPassword.value;

        if (newPassword !== conPass) {
            return toast.error("Password didn't match!");
        }
        else {
            setLoadingUser(true);

            await axios.put(`https://api.zecurechain.com/api/v1/user/change-password`, {
                oldPassword,
                newPassword,
                email: user?.email
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        // console.log(res.data)
                        navigate(`/dashboard/dashboard-profile`);
                        toast.success("Password has been changed!");
                    }
                    else if (res.status == 401) {
                        toast.error("Your OTP was not valid!");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Failed to change password!");
                })
                .finally(() => {
                    setLoadingUser(false);
                });
            setLoadingUser(false);
        }
    }

    return (
        <section style={{ minHeight: "70vh" }}>
            <div className='d-flex justify-content-start align-items-center container text-start mt-3' style={{ gap: '5px' }}>
                <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                <h4 className='dTitle' style={{ fontSize: '20px' }}>Change Password</h4>
            </div>

            <div
                className="d-flex justify-content-center align-items-center container p-0 overflow-hidden  handleFor4k"

            >

                <div
                    className="d-flex justify-content-between align-items-center flex-column flex-lg-row w-100"
                    style={{ marginTop: "70px", marginBottom: "70px", gap: "50px" }}
                >
                    <div
                        className="w-75"
                        data-aos="fade-down-right"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                    >
                        <img
                            src="/assets/images/loginpage-bg.png"
                            alt=""
                            className="img-fluid "
                            width={500}
                        />
                    </div>
                    <div
                        className="w-100 mx-auto"
                        data-aos="fade-up-left"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                    >
                        <div className="cardLogin mx-auto shadow-lg cardLoginPassword">
                            <h4 className="titleOfAuth pb-5">Change Password</h4>
                            <form onSubmit={handleChangePass}>
                                <div className="forCssLogin w-75 mx-auto">
                                    <label>Enter Your Current Password</label>
                                    <input
                                        type="password"
                                        name="CurrPassword"
                                        required
                                    />
                                    <label>Enter Your New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        required
                                    />
                                    <label>Confirm Your New Password</label>
                                    <input
                                        type="password"
                                        name="ConPassword"
                                        required
                                    />
                                </div>


                                <div className="mx-auto text-center mt-3">
                                    {loadingUser ? (
                                        <Button
                                            variant="warning"
                                            className="px-5 py-3 rounded-pill"
                                            style={{ fontSize: "20px" }}
                                            disabled
                                        >
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span>Loading...</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="warning"
                                            className="px-5 py-3 rounded-pill"
                                            style={{ fontSize: "20px" }}
                                            type="submit"
                                        >
                                            Confirm
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardChangePassword;