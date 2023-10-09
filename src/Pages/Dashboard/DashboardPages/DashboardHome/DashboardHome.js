import React, { useContext, useEffect } from 'react';
import './DashboardHome.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { UserAuthContext } from '../../../../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const DashboardHome = () => {
    const { combinedData, user, recentShowing, secret, certificate, docs } = useContext(UserAuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        recentShowing(user?.email, user);
        // getLeftDays(user, certificate, docs);
        // console.log(combinedData)
    }, [user]);

    const getLeftDays = (us, certificate, docs) => {
        const purchasedDate = new Date(us?.type_of_subscription?.purchasedDate);
        const currentDate = new Date();

        const subscriptionType = us?.type_of_subscription?.name;
        const subscriptionDuration = parseInt(subscriptionType.slice(-1));
        // console.log("s", subscriptionDuration)
        // Calculate days left based on subscription type
        let daysLeft = 0;

        if (subscriptionType === "basic") {
            if (us?.type_of_subscription?.cer === 0 && us?.type_of_subscription?.docs === 0) {
                // console.log("enter 0");
                // Calculate days left for basic subscription with no certificates or docs
                const oneYearAfterPurchased = new Date(purchasedDate);
                oneYearAfterPurchased.setFullYear(oneYearAfterPurchased.getFullYear() + 1);
                const timeDifference = oneYearAfterPurchased.getTime() - currentDate.getTime();
                daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
                console.log(oneYearAfterPurchased, timeDifference, daysLeft)
            } else {
                // console.log("enter 1");
                // Calculate days left based on the smallest createdAt date
                let smallestCreatedAt = Infinity;

                certificate.forEach((item) => {
                    const createdAtDate = new Date(item.createdAt);
                    if (createdAtDate < smallestCreatedAt) {
                        smallestCreatedAt = createdAtDate;
                    }
                });

                docs.forEach((item) => {
                    const createdAtDate = new Date(item.createdAt);
                    if (createdAtDate < smallestCreatedAt) {
                        smallestCreatedAt = createdAtDate;
                    }
                });

                smallestCreatedAt?.setDate(smallestCreatedAt?.getDate() + 14);

                const timeDifference = smallestCreatedAt?.getTime() - currentDate.getTime();
                daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
            }
        } else {
            // console.log("enter 2");
            // Calculate days left for premium subscription (monthly or yearly)
            const expirationDate = new Date(purchasedDate);

            if (subscriptionType.endsWith('M')) {
                // console.log("enterM")
                expirationDate.setMonth(expirationDate.getMonth() + 1);
            } else if (subscriptionType.endsWith('Y')) {
                // console.log("enterY")
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            }

            const timeDifference = expirationDate.getTime() - currentDate.getTime();
            // console.log(purchasedDate, expirationDate, timeDifference)
            daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
        }

        console.log(daysLeft);
        return `[${daysLeft + ' days'}]`;
    };


    const formatDateToCustomFormat = (inputDate) => {
        const optionsTime = {
            hour12: false, // Use 24-hour format
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const optionsDate = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };

        const date = new Date(inputDate);

        // Get the formatted time string
        const timeString = date.toLocaleTimeString(navigator.language, optionsTime);

        // Get the formatted date string
        const dateArray = date.toLocaleDateString(navigator.language, optionsDate).split('/');
        const formattedDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;

        return `${timeString}, ${formattedDate}`;
    }

    const dataFolder = async () => {

        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
        const data = await axios.get(`https://api.zecurechain.com/api/v1/folder/${user?.email}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        });
        if (data.status == 200) {
            return data.data?.data;
        }
        else {
            console.log(data);
            return false;
        }
    }

    const subSearch = async (folders) => {
        console.log(folders);

        if (folders == null || folders == "null") {
            navigate("/dashboard/dashboard-folder");
            sessionStorage.setItem('selectedTab', '3');
            return 'r';
        }

        let data = await dataFolder();
        // console.log(data);
        if (data) {
            const findFolder = await data.find(folder => folder?.name === folders);
            // console.log("folder", findFolder)
            if (findFolder) {
                // console.log(findFolder);
                navigate(`/dashboard/dashboard-folder-details/${findFolder?._id}`);
                sessionStorage.setItem('selectedTab', '3');

            }
            else {
                const findSubFolder = await data.find((item) =>
                    item.subFolders.some((subFolder) => subFolder.subName === folders)
                );
                if (findSubFolder) {
                    const subFolder = findSubFolder.subFolders.find(
                        (subFolder) => subFolder.subName === folders);
                    const subNameId = subFolder._id;
                    navigate(`/dashboard/dashboard-subfolder-details/${subNameId}/${findSubFolder?.name}/${subFolder?.subName}`);
                    sessionStorage.setItem('selectedTab', '3');
                }
                else {
                    // toast.dismiss();
                    // toast.error("No folders Found");
                }
            }
        }
        else {
            // toast.dismiss();
            // toast.error("No folders Found");
        }
    }

    function shortenFileName(fileName, maxLength) {
        if (fileName.length <= maxLength) {
            return fileName;
        } else {
            const extIndex = fileName.lastIndexOf('.');
            const ext = fileName.slice(extIndex);
            const truncatedFileName = fileName.slice(0, maxLength - ext.length - 4); // -4 to account for the dots and "..."
            return truncatedFileName + '...' + ext;
        }
    }
    const maxCer = {
        basic: (user?.types == "individual") ? 0 : 2,
        foundationY: (user?.types == "individual") ? 0 : 100,
        foundationM: (user?.types == "individual") ? 0 : 100,
        intermediateY: (user?.types == "individual") ? 0 : 200,
        intermediateM: (user?.types == "individual") ? 0 : 200,
        enterpriseY: (user?.types == "individual") ? 0 : 500,
        enterpriseM: (user?.types == "individual") ? 0 : 500,
    };
    const maxDoc = {
        basic: 2,
        foundationY: 100,
        foundationM: 100,
        intermediateY: 200,
        intermediateM: 200,
        enterpriseY: 500,
        enterpriseM: 500,
    };

    function capitalizeFirstLetter(inputString) {
        // Check if the input string is not empty
        if (inputString.length === 0) {
            return inputString;
        }

        // Capitalize the first character and concatenate it with the rest of the string
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    return (
        <section className='w-100' style={{ minHeight: '60vh' }}>
            <div className='container'>
                <div className='text-start'>
                    {/* <button onClick={() => recentShowing(user?.email, user)}>click</button> */}
                    <h4 className='dTitle'>My Dashboard</h4>
                    <p style={{
                        color: "#545454",
                        textAlign: "start",
                        fontFamily: 'Saira, sans-serif',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal"
                    }} className='mb-0'>Future Proofing Credentials, Certify with Confidence on Blockchain</p>
                </div>

                <div className='row pt-3 gx-3 gy-5'>
                    <div className={`col-12 col-sm-12 col-md-6 col-xl-4  ${user?.types === "individual" ? 'd-none' : ''}`}><Card className='fstCard'>
                        <CardContent>

                            <Typography component="div" className='d-flex justify-content-start align-items-center' sx={{ gap: '5px' }}>

                                <img src={"/assets/images/certificateLogoV2.png"}
                                    className="img-fluid" alt="" />
                                <Typography variant="h5" component="div" className='cardHeadingDHome'
                                >
                                    Certificates <span style={{ fontSize: '16px' }} className='ps-1'>{getLeftDays(user, certificate, docs)}</span>
                                </Typography>
                            </Typography>
                            <Typography variant="body2" className='bodyDHome w-100'>
                                {user?.type_of_subscription?.cer}/{maxCer[user?.type_of_subscription?.name]}
                            </Typography>
                        </CardContent>
                        <CardActions  >
                            <Typography variant="footer" className='footerDHome w-100'>
                                Certificates Completed
                            </Typography>
                        </CardActions>
                    </Card></div>
                    <div className='col-12 col-sm-12 col-md-6 col-xl-4 '><Card className='sndCard'>
                        <CardContent>

                            <Typography component="div" className='d-flex justify-content-start align-items-center' sx={{ gap: '5px' }}>

                                <img src={"/assets/images/certificateLogoV2.png"}
                                    className="img-fluid" alt="" />
                                <Typography variant="h5" component="div" className='cardHeadingDHome'
                                >
                                    Documents <span style={{ fontSize: '16px' }} className='ps-1'>{getLeftDays(user, certificate, docs)}</span>
                                </Typography>
                            </Typography>
                            <Typography variant="body2" className='bodyDHome w-100'>
                                {user?.type_of_subscription?.docs}/{maxDoc[user?.type_of_subscription?.name]}
                            </Typography>
                        </CardContent>
                        <CardActions  >
                            <Typography variant="footer" className='footerDHome w-100'>
                                Documents Completed
                            </Typography>
                        </CardActions>
                    </Card></div>
                    <div className='col-12 col-sm-12 col-md-6 col-xl-4 '><Card className='trdCard'>
                        <CardContent>

                            <Typography component="div" className='d-flex justify-content-start align-items-center' sx={{ gap: '5px' }}>

                                <img src={"/assets/images/certificateLogoV2.png"}
                                    className="img-fluid" alt="" />
                                <Typography variant="h5" component="div" className='cardHeadingDHome'
                                >
                                    Subscription
                                </Typography>
                            </Typography>
                            <Typography variant="body2" className='bodyDHome w-100'>
                                {user?.type_of_subscription?.name === "basic" ? capitalizeFirstLetter(user?.type_of_subscription?.name) : capitalizeFirstLetter((user?.type_of_subscription?.name).slice(0, (user?.type_of_subscription?.name).length - 1))}
                            </Typography>
                        </CardContent>
                        <CardActions  >
                            <Typography variant="footer" className='footerDHome w-100'>
                                Plan Name
                            </Typography>
                        </CardActions>
                    </Card></div>
                </div>

                <div className='mt-4'>
                    <h4 className='dTitle mb-4'>My Recent</h4>
                    {
                        combinedData.length > 0 ? combinedData?.map(data => <div className='row gx-3 gy-5 textDHome' style={{ cursor: 'pointer' }} onClick={async () => {
                            if (data?.certificate || data?.courseName) {
                                if (user?.types === "issuer") {

                                    await subSearch(data?.folder);

                                }
                                else if (user?.types === "individual") {
                                    await subSearch(data?.folderRec);
                                }
                            }
                            else {
                                await subSearch(data?.folder);

                            }

                        }}>
                            <div className='col-4'>
                                <div className='d-flex justify-content-start align-items-center' style={{ gap: '10px' }}>
                                    <img src={`${data?.name ? '/assets/images/certificateV4.svg' : '/assets/images/documentV2.svg'}`} alt="" className='img-fluid' />
                                    <p className='mb-0 handleDocsText'>{data?.name ? (data?.name).slice(0, 14) + `${data?.name.length > 14 ? "..." : ""}` : shortenFileName(data?.fileName, 15)}</p>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-start align-items-center'>
                                <p className='mb-0 handleDocsText'>{data?.fileSize ? data?.fileSize : "0.00 MB"}</p>
                            </div>
                            <div className='col-4 d-flex justify-content-start align-items-center'>
                                <p className='mb-0 handleDocsText'>{formatDateToCustomFormat(data?.createdAt)}</p>
                            </div>
                        </div>) :



                            <div className='mx-auto text-center mb-3 mt-4'>
                                <img src="/assets/images/emptyC.png" alt="" className='img-fluid w-25' />
                                <p className='pt-4' style={{
                                    color: '#5B5B5B',
                                    fontFamily: 'Lexend',
                                    fontSize: '24px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                }}>No recent activities</p>
                            </div>
                    }



                </div>

            </div>
        </section>
    );
};

export default DashboardHome;