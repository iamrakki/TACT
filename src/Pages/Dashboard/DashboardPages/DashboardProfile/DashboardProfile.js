import React, { useContext, useEffect, useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './DashboardProfile.css';
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import ConfirmationPasswordPopUp from '../DashboardChangePassword/ConfirmationPasswordPopUp';

const DashboardProfile = () => {
    const navigate = useNavigate();
    const { user, allUser, userRefetch, setUserRefetch, cerTemp } = useContext(UserAuthContext);
    const upImg = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const uploadImage = async (e) => {
        // alert("Alhamdulillah");
        setLoading(true);
        let img = e.target.files[0];
        const dataForm = new FormData();
        dataForm.append("email", user?.email);
        dataForm.append("photo", img);

        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), process.env.REACT_APP_MY_SECRET_KYE).toString(CryptoJS.enc.Utf8);
        await axios.put("https://api.zecurechain.com/api/v1/user/upload-profile", dataForm, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                if (res.status == 200) {
                    setUserRefetch(!userRefetch);
                    // console.log(res.data)
                    toast.success("Image uploaded!");
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error("Failed to upload!");
            })
            .finally(() => {
                setLoading(false);
            })
        setLoading(false);
    }

    const upBtn = () => {

        upImg?.current.click();;

    }
    // console.log(user);
    return (
        <section className='w-100' style={{ minHeight: '60vh' }}>
            <div className='container mt-3'>
                <div className='text-start'>
                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '5px' }}>
                        <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        <h4 className='dTitle' style={{ fontSize: '20px' }}>My Profile</h4>
                    </div>
                    <h4 className='dTitle mt-4'>Profile</h4>
                    <p style={{
                        color: "#545454",
                        textAlign: "start",
                        fontFamily: 'Saira, sans-serif',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal"
                    }} className='mb-0'>Your Hub for Verified Information and Personalized Insights.</p>
                </div>
                <input type="file" hidden accept="image/*" onChange={uploadImage} ref={upImg} />
                <div className='text-center mx-auto mt-4'>
                    <img src={`${user?.photo ? user?.photo : '/assets/images/avatar.jpg'}`} alt="" className='img-fluid rounded-circle img-ring' width={200} />
                    <p style={{
                        color: '#2A339B',
                        fontFamily: 'Lexend',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: 'normal',
                        marginBottom: '15px'
                    }} className='pb-2'>Upload Profile Photo</p>
                    <p style={{
                        color: '#4D4D4D',
                        fontSize: '14px',
                        fontFamily: 'Lexend',
                        fontStyle: 'normal',
                        fontWeight: '300',
                        lineHeight: 'normal',
                    }} className='pb-3'>
                        *Image should be at highest 2mb. Allowed files .png
                    </p>
                    <button className='btn-up-photo' onClick={() => upBtn()} disabled={loading}>{loading ? 'Uploading...' : 'Upload photo'}</button>
                </div>

                <div className='mt-4'>
                    <p className='boldText'>Profile Information</p>

                    <div className={`row pt-3 ${user?.org_individual_Name ? '' : 'd-none'}`}>
                        <div className='col-6 col-sm-6 col-md-4 pTitle'>
                            <p className='mb-0'>Organisation</p>
                        </div>
                        <div className='col-6 col-sm-6 col-md-4 pDetails'>
                            <p className='mb-0'>{user?.org_individual_Name}</p>
                        </div>
                    </div>

                    <div className={`row pt-3 ${user?.email ? '' : 'd-none'}`}>
                        <div className='col-6 col-sm-6 col-md-4 pTitle'>
                            <p className='mb-0'>Email-id</p>
                        </div>
                        <div className='col-6 col-sm-6 col-md-4 pDetails'>
                            <p className='mb-0'>{user?.email}</p>
                        </div>
                    </div>

                    <div className={`row pt-3 ${user?.phone ? '' : 'd-none'}`}>
                        <div className='col-6 col-sm-6 col-md-4 pTitle'>
                            <p className='mb-0'>Phone number</p>
                        </div>
                        <div className='col-6 col-sm-6 col-md-4 pDetails'>
                            <p className='mb-0'>{user?.phone}</p>
                        </div>
                    </div>

                    <div className={`row pt-3 ${user?.web_social_URL ? '' : 'd-none'}`}>
                        <div className='col-6 col-sm-6 col-md-4 pTitle'>
                            <p className='mb-0'>Website Link</p>
                        </div>
                        <div className='col-6 col-sm-6 col-md-4 pDetails'>
                            <p className='mb-0'>{user?.web_social_URL}</p>
                        </div>
                    </div>

                    <div className={`row pt-3 ${user?.org_type ? '' : 'd-none'}`}>
                        <div className='col-6 col-sm-6 col-md-4 pTitle'>
                            <p className='mb-0'>Organization Type</p>
                        </div>
                        <div className='col-6 col-sm-6 col-md-4 pDetails'>
                            <p className='mb-0'>{user?.org_type}</p>
                        </div>
                    </div>

                </div>

                <div className='mt-3'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='boldText'>Change Password</p>
                        <ArrowCircleRightOutlinedIcon fontSize='large' sx={{ color: '#2A339B', cursor: 'pointer' }} onClick={() => handleClickOpen()} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='boldText'>Close Account</p>
                        <ArrowCircleRightOutlinedIcon fontSize='large' sx={{ color: '#2A339B', cursor: 'pointer' }} onClick={() => navigate("/contact-us")} />
                    </div>
                </div>
                {open && <ConfirmationPasswordPopUp open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} user={user} />}
            </div>
        </section>
    );
};

export default DashboardProfile;