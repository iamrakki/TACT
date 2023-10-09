import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CryptoJS from 'crypto-js';

export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUser, setAllUser] = useState(null);
    const [requestLoading, setRequestLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [userRefetch, setUserRefetch] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingUserProtected, setLoadingUserProtected] = useState(true);
    const [secret, setSecret] = useState("");
    const [emailPro, setEmailPro] = useState("");
    const [certificate, setCertificate] = useState([]);
    const [docs, setDocs] = useState([]);
    const [restrict, setRestrict] = useState(true);
    const [combinedData, setCombinedData] = useState([]);
    const [lock, setLock] = useState(false);

    const [folderStructure, setFolderStructure] = useState({ isInFolder: false, folder: null, isSub: false, folderId: null });
    const navigate = useNavigate();
    useEffect(() => {
        setSecret(() => process.env.REACT_APP_MY_SECRET_KYE);
    }, []);
    useEffect(() => {
        if (requestLoading) {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p></p><div class="loaders"></div> <p class="wait"><b>Please wait, don't exit screen...<b></p> `;
            swal({
                content: wrapper,
                button: false,
                className: "modal_class_success",
            });
        }
    }, [requestLoading]);


    const signUpUserIssuer = async (email, org_individual_Name, org_type, phone, password, confirmPassword, web_social_URL, file) => {
        if (password !== confirmPassword) {
            toast.dismiss();
            toast.error("Passwords didn't matched!");
            return;
        }
        if (!email || !org_individual_Name || !org_type || !phone || !password || !web_social_URL || !file) {
            toast.dismiss();
            toast.error("Please fillUp all details!");
            return;
        }
        else {
            setLoadingUser(true);

            const dataForm = new FormData();
            dataForm.append("email", email);
            dataForm.append("org_individual_Name", org_individual_Name);
            dataForm.append("org_type", org_type);
            dataForm.append("phone", phone);
            dataForm.append("password", password);
            dataForm.append("web_social_URL", web_social_URL);
            dataForm.append("proveFile", file);
            dataForm.append("types", "issuer");

            await axios.post("https://api.zecurechain.com/api/v1/user/", dataForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(async res => {
                    if (res.status == 200) {
                        await axios.post("https://api.zecurechain.com/api/v1/user/sending-otp?type=signup", { email })
                            .then(res => {
                                if (res.status == 200) {
                                    setEmailPro(email);
                                    navigate(`/otp/${res.data.token}`);
                                    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(res.data.token), secret).toString();
                                    setRestrict(false);
                                    localStorage.setItem('userToken', encryptedData);
                                }
                                else {
                                    toast.error("Something is wrong!");
                                }
                            })
                            .catch((e) => {
                                console.log(e);
                                toast.error(e?.response?.data?.message);
                            });
                    }
                    else {
                        toast.error("Something is wrong!");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e?.response?.data?.message);
                });
            setLoadingUser(false);
        }
    }
    const signUpUserIndi = async (email, phone, password, confirmPassword) => {
        if (password !== confirmPassword) {
            toast.error("Passwords didn't matched!");
            return;
        }
        if (!email || !phone || !password) {
            toast.error("Please fillUp all details!");
            return;
        }
        else {
            setLoadingUser(true);
            await axios.post("https://api.zecurechain.com/api/v1/user/", { email, phone, password, types: "individual" }, {
                headers: {
                    "Content-Type": "Application/json",
                }
            })
                .then(async res => {
                    if (res.status == 200) {
                        await axios.post(`https://api.zecurechain.com/api/v1/user/sending-otp?type=signup`, { email })
                            .then(res => {
                                if (res.status == 200) {
                                    setEmailPro(email);
                                    navigate(`/otp/${(res.data.token).slice(0, 5)}`);
                                    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(res.data.token), secret).toString();
                                    setRestrict(false);
                                    localStorage.setItem('userToken', encryptedData);
                                }
                                else {
                                    toast.error("Something is wrong!");
                                }
                            })
                            .catch((e) => {
                                console.log(e);
                                toast.error(e?.response?.data?.message);
                            });
                    }
                    else {
                        toast.error("Something is wrong!");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e?.response?.data?.message);

                });
            setLoadingUser(false);
        }
    }

    const resendOTP = async (email, x) => {
        setLoadingUser(true);
        await axios.post(`https://api.zecurechain.com/api/v1/user/sending-otp?type=${x}`, { email })
            .then(res => {
                if (res.status == 200) {
                    setEmailPro(email);
                    navigate(`/otp/${(res.data.token).slice(0, 5)}`);
                    toast.success("OTP sent! Please check your email.");
                    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(res.data.token), secret).toString();
                    setRestrict(false);
                    localStorage.setItem('userToken', encryptedData);
                }
                else {
                    toast.error("Something is wrong!");
                }
            })
            .catch((e) => {
                console.log(e);
            });
        setLoadingUser(false);
    }

    const verifyingOTP = async (otp) => {

        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
        setLoadingUser(true);

        // console.log(token);
        await axios.post("https://api.zecurechain.com/api/v1/user/verify-otp", { otp: otp }, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(async res => {
                if (res.status == 200 && res.data?.user?.isVerified == true) {
                    toast.success("OTP verified!");
                    setUser(() => res.data.user);
                    await dataFetchDocument(res.data?.user?.email);

                    setRestrict(true);
                    let checkType = (res.data.user?.types === "issuer" && 'issuer') || (res.data.user?.types === "individual" && 'receiver');
                    console.log(checkType);

                    await axios.get(`https://api.zecurechain.com/api/v1/certificate/by-email-${checkType}/${res.data.user?.email}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${JSON.parse(token)}`,
                        }
                    })
                        .then(res => {
                            if (res.status == 200) {
                                // console.log("user", user);
                                sessionStorage.setItem('selectedTab', '0');
                                navigate("/dashboard");

                                setCertificate(() => res.data?.data);
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                        .finally(() => {

                        });
                    await recentShowing(res.data?.user?.email, res.data?.user);
                }
                else {
                    toast.error(`${res.data.message}`);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(`${e.response?.data?.message}`);
            })
            .finally(() => { });
        setLoadingUser(false);
    }

    const loginUser = async (email, password) => {
        setLoadingUser(true);
        await axios.post("https://api.zecurechain.com/api/v1/user/login-user", { email, password }, {
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(res => {
                if (res.status == 200) {

                    resendOTP(email, 'signin');
                    // navigate(`/otp/${res.data.token}`);
                    // toast.success("Logged in!");
                    // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(res.data.token), secret).toString();
                    // localStorage.setItem('userToken', encryptedData);
                    // setUser(res.data.user);
                    // navigate("/dashboard");

                }
                else {
                    toast.error(`${res.data?.message}`);
                    setLoadingUser(false);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(`${e?.response?.data}`);
                setLoadingUser(false);
            });

    }

    const LogOut = () => {
        setUser(null);
        localStorage.removeItem("userToken");
        toast.success("Logged out!");
        navigate("/");
        setUserRefetch(!userRefetch);
    }

    const sendResetPasswordMail = async (email) => {
        setLoadingUser(true);
        await axios.post("https://api.zecurechain.com/api/v1/user/send-reset-password-link/", { email }, {
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(res => {
                if (res.status == 200) {

                    toast.success(`${res.data.message}`);

                }
                else {
                    toast.error(`${res.data.message}`);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(`${e.response.data}`);
            });

        setLoadingUser(false);
    }

    const forgotPassword = async (newPassword, token) => {
        setLoadingUser(true);
        await axios.post(`https://api.zecurechain.com/api/v1/user/forget-password`, { newPassword }, {
            headers: {
                "Content-Type": "Application/json",
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status == 200) {
                    toast.success("Password has been updated successfully!");
                    navigate("/login");
                }
                else {
                    toast.error(`${res.data.message}`);
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error(`${e.response.data.message}`);
            });
        setLoadingUser(false);
    }

    const checkPassword = async (email, password) => {
        try {
            const response = await axios.post(
                "https://api.zecurechain.com/api/v1/user/check-password",
                { email, password },
                {
                    headers: {
                        "Content-Type": "Application/json"
                    }
                }
            );

            if (response.status === 200) {
                return true;
            } else {
                toast.error(`${response.data?.message}`);
                return false;
            }
        } catch (error) {
            console.log(error);
            toast.error(`${error?.response?.data}`);
            return false;
        }
    };



    const dataFetchCertificate = async (email, userProp) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
        let checkType = (userProp?.types === "issuer" && 'issuer') || (userProp?.types === "individual" && 'receiver');
        console.log(checkType);
        await axios.get(`https://api.zecurechain.com/api/v1/certificate/by-email-${checkType}/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                // console.log(res.data, 'cer');
                if (res.status == 200) {
                    const findLock = res.data?.data.find(item => item?.isLock === true);
                    if (findLock) {
                        setLock(() => true);
                    }
                    setCertificate(() => res.data?.data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {

            });
    }
    const dataFetchDocument = async (email) => {
        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
        await axios.get(`https://api.zecurechain.com/api/v1/document/get-email/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
            .then(res => {
                // console.log(res.data, 'cer');
                if (res.status == 200) {
                    const findLock = res.data?.data.find(item => item?.isLock === true);
                    if (findLock) {
                        setLock(() => true);
                    }
                    setDocs(() => res.data?.data);
                }
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {

            });
    }


    const recentShowing = async (emailProps, userPros) => {
        if (!certificate || !docs) {
            await dataFetchCertificate(emailProps, userPros);
            await dataFetchDocument(emailProps);
        }
        const mergedData = [...certificate, ...docs];
        // console.log(mergedData)
        // Sort the combined data by createdAt or updatedAt in descending order
        const shortIssue = mergedData.sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt));
        // console.log(shortIssue);
        // Set the combined and sorted data in state
        setCombinedData(() => shortIssue.slice(0, 10));
    }

    useEffect(() => {
        const catchTheUser = async () => {
            // console.log("Start");
            setLoadingUserProtected(true);
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
            await axios.get("https://api.zecurechain.com/api/v1/user/current-user", {
                headers: {
                    authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then(async res => {
                    if (res.status == 200 && res.data?.user?.isVerified == true) {
                        // console.log("from here")
                        setUser(() => res.data.user);
                        await dataFetchCertificate(res.data?.user?.email, res.data.user);
                        await dataFetchDocument(res.data?.user?.email);
                        await recentShowing(res.data?.user?.email, res.data.user);

                    }
                })
                .catch(e => console.log(e))
                .finally(() => {
                    setLoadingUserProtected(false);
                    // console.log("End");
                })
        }
        const catchUsers = async () => {
            setLoadingUserProtected(true);
            const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
            await axios.get("https://api.zecurechain.com/api/v1/user/all", {
                headers: {
                    authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        setAllUser(() => res.data.data);

                    }
                })
                .catch(e => console.log(e))
                .finally(() => {
                    setLoadingUserProtected(false);
                })
        }

        if (localStorage.getItem("userToken") && restrict) {

            catchTheUser();
            catchUsers();
        }
    }, [localStorage.getItem("userToken"), secret, userRefetch, restrict]);

    // useEffect(() => {
    //     const catchTheUser = async () => {
    //         const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
    //         await axios.get("https://api.zecurechain.com/api/v1/user/current-user", {
    //             headers: {
    //                 authorization: `Bearer ${JSON.parse(token)}`
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status == 200) {
    //                     setUser(() => res.data.user);
    //                 }
    //             })
    //             .catch(e => console.log(e));
    //     }
    //     if (!user) {
    //         catchTheUser();
    //         dataFetchCertificate();
    //     }

    // }, [user, dataFetchCertificate, secret]);
    // console.log("structure", folderStructure);

    const cerTemp = [
        { id: "1", name: "cer1", temp: "/assets/images/ct1.png", cover: "/assets/images/ctd1.png" },
        { id: "2", name: "cer2", temp: "/assets/images/ct2.png", cover: "/assets/images/ctd2.png" },
        { id: "3", name: "cer3", temp: "/assets/images/ct3.png", cover: "/assets/images/ctd3.png" },
        { id: "4", name: "cer4", temp: "/assets/images/ct4.png", cover: "/assets/images/ctd4.png" },
        { id: "5", name: "cer5", temp: "/assets/images/ct5.png", cover: "/assets/images/ctd5.png" },
        { id: "6", name: "cer6", temp: "/assets/images/ct6.png", cover: "/assets/images/ctd6.png" },
        { id: "7", name: "cer7", temp: "/assets/images/ct7.png", cover: "/assets/images/ctd7.png", divSpecial: "/assets/images/ct7_div.png" },
        { id: "8", name: "cer8", temp: "/assets/images/ct8.png", cover: "/assets/images/ctd8.png" },
        { id: "9", name: "cer9", temp: "/assets/images/ct9.png", cover: "/assets/images/ctd9.png" },
        { id: "10", name: "cer10", temp: "/assets/images/ct10.png", cover: "/assets/images/ctd10.png" },
    ]
    const cerComingSoon = [
        { id: "1", name: "cer1", temp: "/assets/images/certiComingSoon1.png" },
        { id: "2", name: "cer2", temp: "/assets/images/certiComingSoon2.png" },
        { id: "3", name: "cer3", temp: "/assets/images/certiComingSoon3.png" },
    ]

    return (
        <UserAuthContext.Provider
            value={{
                secret,
                requestLoading,
                setRequestLoading,
                signUpUserIndi,
                signUpUserIssuer,
                verifyingOTP,
                loginUser,
                user,

                setUserRefetch,
                userRefetch,
                setLoadingUser,
                loadingUser,
                emailPro,
                resendOTP,
                LogOut,
                forgotPassword,
                sendResetPasswordMail,
                allUser,
                checkPassword,
                certificate,
                setCertificate,
                setDocs,
                docs,
                dataFetchDocument,
                dataFetchCertificate,
                folderStructure,
                setFolderStructure,
                cerTemp,
                cerComingSoon,
                setLoadingUserProtected,
                loadingUserProtected,
                restrict,
                recentShowing,
                combinedData,
                lock
            }}
        >
            {children}
        </UserAuthContext.Provider>
    );
};

export default UserAuthProvider;
