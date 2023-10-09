import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './SignUp.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../../Context/UserContext/UserContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';


const SignUp = () => {
    const [value, setValue] = useState(0);
    const { secret, requestLoading, setRequestLoading, signUpUserIndi, signUpUserIssuer, verifyingOTP, loginUser, user, setUserRefetch, loadingUser } = useContext(UserAuthContext);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isVisibleP, setIsVisibleP] = useState(false);
    const [isVisibleCp, setIsVisibleCp] = useState(false);
    const [isWarn, setIsWarn] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const handleChange = (event, newValue) => {
        setIsWarn(true);
        setValue(newValue);
    };
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const [url, setUrl] = useState("");
    const [choose, setChoose] = useState("");
    const [oraName, setOraName] = useState("");
    const [files, setFiles] = useState({ origin: null, show: null });
    const fileInputRef1 = useRef(null);
    const [openTool, setOpenTool] = useState(false);

    const handleCloseTool = () => {
        setOpenTool(false);
    };

    const handleOpenTool = () => {
        setOpenTool(true);
    };

    const handleLabelClick1 = () => {
        fileInputRef1?.current.click(); // Trigger the hidden file input when the label is clicked
    };

    const signUp = async (e) => {
        e.preventDefault();
        setIsWarn(true);
        console.log("clicked");
        if (email.length > 0 && email.includes("@" && ".") && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            if (!isChecked) {
                toast.error("Please accept terms and condition");
                return;
            }
            if (password !== Cpassword) {
                toast.error("Password and confirm password are not matched!");
                return;
            }
            if (value == 1) {
                await signUpUserIndi(email, phone, password, Cpassword,);
            }
            else if (value == 0) {
                await signUpUserIssuer(email, oraName, choose, phone, password, Cpassword, url, files.origin)
            }
        }
        else {
            toast.error("Please enter a valid email address");
            return;
        }

    }

    return (
        <section className='d-flex justify-content-center align-items-center overflow-hidden container handleFor4k' style={{ minHeight: "80vh", }}>
            <div className="w-100 sign-up-bg shadow-lg" data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000" style={{ marginTop: '39px', marginBottom: '35px' }}>
                <div
                    className=" d-flex justify-content-between align-items-center flex-column flex-xl-row "
                    style={{ gap: "15px" }}
                >
                    <div className='w-100 text-center'>
                        <img
                            src="./assets/images/loginpage-bg.png"
                            alt=""
                            className="img-fluid"
                            width={500}
                        />
                    </div>

                    <div className='w-100 '>
                        <h4 className="titleOfAuth mb-3 pb-2" style={{ marginTop: '-10px' }}>Sign-Up</h4>
                        <div className=" mx-auto mt-4 pt-1">
                            <Box
                                sx={{
                                    // height: "66px",
                                    width: 'fit-content',
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    bgcolor: "#FFF9D4",
                                    borderRadius: "50px",
                                    color: "#C8C8C8",
                                    padding: "0px",
                                    mt: "-20px",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'

                                }}
                                className="mb-4  box-tab-signup"
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    centered
                                    sx={{
                                        "& .MuiTabs-indicator": {
                                            // background: 'linear-gradient(90.92deg, #10EDB6 0.28%, #4C62F7 94.44%);',
                                            // borderRadius: "50px",
                                            display: "none",
                                        },
                                        "& .MuiTab-root": {
                                            color: "#000",
                                            textTransform: "capitalize",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            fontFamily: "Lexend",
                                            fontStyle: "normal",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                            marginLeft: "0px",
                                            marginRight: "0px",
                                            width: '50%',
                                            // border: '1px solid red'
                                        },
                                        "& .MuiTab-root.Mui-selected": {
                                            background: "#FCDA27",
                                            borderRadius: "50px",
                                            color: "black",
                                            width: '50%',
                                            // border: '1px solid green'
                                        },
                                    }}
                                >
                                    <Tab label="Issuer" />
                                    <Tab label="Individual" />
                                </Tabs>
                            </Box>

                            {value === 0 && (
                                <form onSubmit={signUp}>
                                    <div className='row'>
                                        <div className="forCssLogin col-12 col-md-6">
                                            <label>Organization Name <span className="text-danger fs-5">*</span></label>
                                            <input
                                                type="text"
                                                value={oraName}
                                                onChange={(e) => setOraName(e.target.value)}
                                                name="oraName"
                                                required
                                                style={{ border: (oraName.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            />
                                            {/* {console.log(oraName.length > 0, isWarn)} */}
                                            <label>E-mail ID <span className="text-danger fs-5">*</span></label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                name="email"
                                                required
                                                style={{ border: (email.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            />
                                            <label>Password <span className="text-danger fs-5">*</span></label>
                                            {/* <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                name="password"
                                                required
                                                style={{ border: (password.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            /> */}

                                            <InputGroup className="mb-0" style={{ width: '95%' }}>
                                                <Form.Control
                                                    type={`${isVisibleP ? 'text' : 'password'}`}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    name="password"
                                                    required
                                                    style={{ border: (password.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                                    aria-label="password"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Text id="basic-addon2" onClick={() => setIsVisibleP(!isVisibleP)}>{isVisibleP ? <VisibilityIcon /> : <VisibilityOffIcon />} </InputGroup.Text>
                                            </InputGroup>

                                            <label>Website / Social URL Link <span className="text-danger fs-5">*</span></label>
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                name="url"
                                                required
                                                style={{ border: (url.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            />




                                        </div>
                                        <div className="forCssLogin col-12 col-md-6">
                                            <label>Organization Type <span className="text-danger fs-5">*</span></label> <br />
                                            <select
                                                name="choose"
                                                id="cars"
                                                value={choose}
                                                onChange={(e) => setChoose(e.target.value)}
                                                style={{ border: (choose.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            >
                                                <option value="">Select</option>
                                                <option value="Coaching Institute">Coaching Institute
                                                </option>
                                                <option value="School/College">School/College
                                                </option>
                                                <option value="Online Coaching">Online Coaching</option>
                                            </select>
                                            <label>Phone Number <span className="text-danger fs-5">*</span></label>

                                            <PhoneInput
                                                enableSearch={true}
                                                disableSearchIcon={true}
                                                country="in"
                                                className=''
                                                value={phone}
                                                onChange={setPhone}
                                                containerClass=""
                                                searchStyle={{
                                                    height: '25px'
                                                }}
                                                buttonStyle={{
                                                    border: '1px solid #7C89E4', background: '#F3F4FB', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px', outline: '0px',
                                                }}
                                                inputStyle={{
                                                    background: 'white', outline: '#D6DBFB', height: '40px', fontSize: '1rem', width: '95%', borderRadius: '48px', border: (phone.length > 0 || isWarn) ? '1px solid #7C89E4' : '1px solid #dd3c3c', marginBottom: '10px',
                                                }}
                                                required
                                                isValid={(value, country) => {
                                                    if (value.match(/12345/)) {
                                                        return 'Invalid value: ' + value + ', ' + country.name;
                                                    } else if (value.match(/1234/)) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    autoFocus: false
                                                }}
                                            />
                                            <label>Confirm Password <span className="text-danger fs-5">*</span></label>
                                            {/* <input
                                                type="password"
                                                value={Cpassword}
                                                onChange={(e) => setCPassword(e.target.value)}
                                                name="Cpassword"
                                                required
                                                style={{ border: (Cpassword.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            /> */}

                                            <InputGroup className="mb-0" style={{ width: '95%' }}>
                                                <Form.Control
                                                    type={`${isVisibleCp ? 'text' : 'password'}`}
                                                    value={Cpassword}
                                                    onChange={(e) => setCPassword(e.target.value)}
                                                    name="Cpassword"
                                                    required
                                                    style={{ border: (Cpassword.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                                    aria-label="password"
                                                    aria-describedby="basic-addon3"
                                                />
                                                <InputGroup.Text id="basic-addon3" onClick={() => setIsVisibleCp(!isVisibleCp)}>{isVisibleCp ? <VisibilityIcon /> : <VisibilityOffIcon />} </InputGroup.Text>
                                            </InputGroup>

                                            <label>Organization Proof <span className="text-danger fs-5">*</span> <Tooltip title="Upload document which is related to government registered only, else account will be blocked" arrow disableFocusListener open={openTool} onClose={handleCloseTool} onOpen={handleOpenTool} TransitionComponent={Zoom}>
                                                <img src="/assets/images/informationV2.svg" alt="pic" className='img-fluid p-0' width={20} />
                                                {/* <IconButton className='p-0'>
                                                </IconButton> */}

                                            </Tooltip></label>
                                            <div className="input-groupCus" style={{ border: (files.origin || isWarn) ? "" : "1px solid #dd3c3c", height: '39px', background: "white", width: '95%' }}>
                                                <input
                                                    type="text"
                                                    style={{ cursor: 'pointer', marginBottom: '0px', borderRadius: '42px 0 0 42px', border: 'none', outline: 'none', height: '37px' }}
                                                    class="form-control"
                                                    id="inputGroupFile0x4"
                                                    name="files"
                                                    required
                                                    value={files?.origin?.name}
                                                    onClick={() => handleLabelClick1()}

                                                />
                                                <input
                                                    type="file"
                                                    class="form-control"
                                                    id="docs"
                                                    name="docs"
                                                    ref={fileInputRef1}
                                                    onChange={(e) => {
                                                        setFiles({
                                                            origin: e.target.files[0],
                                                            show: URL.createObjectURL(e.target.files[0]),
                                                        });
                                                    }}

                                                    style={{ display: "none", marginBottom: '0px' }}
                                                />
                                                <label
                                                    className="input-group-textCusReg"
                                                    onClick={() => handleLabelClick1()}
                                                    style={{ background: "white" }}
                                                >
                                                    Upload
                                                </label>
                                            </div>
                                            {/* <p style={{
                                                color: "#545454",
                                                textAlign: "start",
                                                fontFamily: 'Saira, sans-serif',
                                                fontSize: "14px",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                lineHeight: "normal",
                                                marginTop: '-10px'
                                            }} className='mb-0 ps-2'>Upload document which is related to government registered only, else account will be blocked</p> */}

                                        </div>
                                    </div>

                                    <Form>
                                        <div className="my-3 remove-class">
                                            <Form.Check // prettier-ignore
                                                type={"checkbox"}
                                                id={`default-checkbox`}
                                                label={`I accept Terms & Condition of Zecurechain`}
                                                style={{ fontSize: "18px" }}
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                                required
                                            />
                                        </div>
                                    </Form>

                                    <div className="mx-auto text-center">
                                        {loadingUser ? (
                                            <Button
                                                variant="warning" className=' py-2 rounded-pill' style={{ width: '130px' }}
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
                                            <Button variant="warning" className=' py-2 rounded-pill' style={{ width: '130px' }} type="submit" onClick={() => setIsWarn(false)}>Sign Up</Button>

                                        )}
                                    </div>
                                </form>
                            )}

                            {value === 1 && (
                                <form onSubmit={signUp}>

                                    <div className='row'>
                                        <div className="forCssLogin col-12 col-lg-8 mx-auto" >

                                            <label>E-mail ID <span className="text-danger fs-5">*</span></label> <br />
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                style={{ border: (email.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            />
                                            <label>Phone Number <span className="text-danger fs-5">*</span></label><br />


                                            <PhoneInput
                                                enableSearch={true}
                                                disableSearchIcon={true}
                                                country="in"
                                                className=''
                                                value={phone}
                                                onChange={setPhone}
                                                containerClass=""
                                                searchStyle={{
                                                    height: '25px'
                                                }}
                                                buttonStyle={{
                                                    border: '1px solid #7C89E4', background: '#F3F4FB', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px', outline: '0px',
                                                }}
                                                inputStyle={{
                                                    background: 'white', outline: '#D6DBFB', height: '40px', fontSize: '1rem', width: '95%', borderRadius: '48px', border: (phone.length > 0 || isWarn) ? '1px solid #7C89E4' : '1px solid #dd3c3c', marginBottom: '0px',
                                                }}
                                                required
                                                isValid={(value, country) => {
                                                    if (value.match(/12345/)) {
                                                        return 'Invalid value: ' + value + ', ' + country.name;
                                                    } else if (value.match(/1234/)) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    autoFocus: false
                                                }}
                                            />

                                            <label className='pt-2'>Password <span className="text-danger fs-5">*</span></label>
                                            {/* <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                style={{ border: (password.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            /> */}


                                            <InputGroup className="mb-0" style={{ width: '95%' }}>
                                                <Form.Control
                                                    type={`${isVisibleP ? 'text' : 'password'}`}
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    style={{ border: (password.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                                    aria-label="password"
                                                    aria-describedby="basic-addon5"
                                                />
                                                <InputGroup.Text id="basic-addon5" onClick={() => setIsVisibleP(!isVisibleP)}>{isVisibleP ? <VisibilityIcon /> : <VisibilityOffIcon />} </InputGroup.Text>
                                            </InputGroup>
                                            <label className='pt-0'>Confirm Password <span className="text-danger fs-5">*</span></label>
                                            {/* <input
                                                type="password"
                                                name="Cpassword"
                                                value={Cpassword}
                                                onChange={(e) => setCPassword(e.target.value)}
                                                required
                                                style={{ border: (Cpassword.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                            /> */}

                                            <InputGroup className="mb-0" style={{ width: '95%' }}>
                                                <Form.Control
                                                    type={`${isVisibleCp ? 'text' : 'password'}`}
                                                    name="Cpassword"
                                                    value={Cpassword}
                                                    onChange={(e) => setCPassword(e.target.value)}
                                                    required
                                                    style={{ border: (Cpassword.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                                                    aria-label="password"
                                                    aria-describedby="basic-addon4"
                                                />
                                                <InputGroup.Text id="basic-addon4" onClick={() => setIsVisibleCp(!isVisibleCp)}>{isVisibleCp ? <VisibilityIcon /> : <VisibilityOffIcon />} </InputGroup.Text>
                                            </InputGroup>

                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-10 col-lg-8 mx-auto '>
                                            <Form >
                                                <div className="my-2 remove-class ">
                                                    <Form.Check // prettier-ignore
                                                        type={"checkbox"}

                                                        id={`default-checkbox`}
                                                        label={`I accept Terms & Condition of Zecurechain`}
                                                        style={{ fontSize: "18px", width: '110%' }}
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                        required
                                                    />
                                                </div>
                                            </Form>
                                        </div>
                                    </div>

                                    <div className="mx-auto text-center">
                                        {loadingUser ? (
                                            <Button
                                                variant="warning" className=' py-2 rounded-pill' style={{ width: '130px' }}
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
                                                variant="warning" className=' py-2 rounded-pill' style={{ width: '130px' }}
                                                type="submit"
                                                onClick={() => setIsWarn(false)}
                                            >
                                                Sign Up
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;