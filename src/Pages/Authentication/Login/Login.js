import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserAuthContext } from "../../../Context/UserContext/UserContext";
import CryptoJS from "crypto-js";
import ForgotPassword from "./ForgotPassword";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputGroup from 'react-bootstrap/InputGroup';

const Login = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const {
    secret,
    requestLoading,
    setRequestLoading,
    signUpUserIndi,
    signUpUserIssuer,
    verifyingOTP,
    loginUser,
    user,
    setUserRefetch,
    loadingUser,
    forgotPassword,
  } = useContext(UserAuthContext);

  const [email1, setEmail1] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password1, setPassword1] = useState("");
  const [isWarn, setIsWarn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      const email = CryptoJS.AES.decrypt(
        localStorage.getItem("email"),
        secret
      ).toString(CryptoJS.enc.Utf8);
      const password = CryptoJS.AES.decrypt(
        localStorage.getItem("password"),
        secret
      ).toString(CryptoJS.enc.Utf8);

      if (email && password) {
        setEmail1(() => JSON.parse(email));
        setPassword1(() => JSON.parse(password));
      }
    }
  }, [secret]);
  const loginIssue = async (e) => {
    e.preventDefault();
    setIsWarn(true);
    let email = e.target.email.value;
    let password = e.target.password.value;
    if (isChecked) {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(email),
        secret
      ).toString();
      const encryptedData1 = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        secret
      ).toString();

      localStorage.setItem("email", encryptedData);
      localStorage.setItem("password", encryptedData1);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    // console.log(email, password);

    if (
      email.length > 0 &&
      email.includes("@" && ".") &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      await loginUser(email, password);
    } else {
      toast.error("Please enter a valid email address");
      return;
    }
  };
  // console.log(user);
  return (
    <section
      className="d-flex justify-content-center align-items-center container p-0 overflow-hidden  handleFor4k"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="d-flex justify-content-between align-items-center flex-column flex-lg-row w-100"
        style={{ marginTop: "70px", marginBottom: "70px", gap: "100px" }}
      >
        <div
          className="w-100"
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
          <div className="cardLogin mx-auto shadow-lg">
            <h4 className="titleOfAuth pb-5">Sign-In</h4>
            <form onSubmit={loginIssue}>
              <div className="forCssLogin w-75 mx-auto ">
                <label>E-mail Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  style={{ border: (email1.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                />
                <label>Password</label>
                {/* <input
                  type="password"
                  name="password"
                  required
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  style={{ border: (password1.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                /> */}

                <InputGroup className="mb-0" style={{ width: '95%' }}>
                  <Form.Control
                    type={`${isVisible ? 'text' : 'password'}`}
                    name="password"
                    required
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    style={{ border: (password1.length > 0 || isWarn) ? "" : "1px solid #dd3c3c" }}
                    aria-label="password"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Text id="basic-addon1" onClick={() => setIsVisible(!isVisible)}>{isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />} </InputGroup.Text>
                </InputGroup>
              </div>

              <Form className="w-75 mx-auto">
                <div className="mb-4 mt-2 remove-class">
                  <Form.Check // prettier-ignore
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label={`Remember my Details`}
                    style={{ fontSize: "18px" }}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </Form>

              <div className="mx-auto text-center">
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
                    onClick={() => setIsWarn(false)}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </form>
            <p
              className="text-center mb-0 pt-3 text-info-login text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => handleShow()}
            >
              Forgot Password?
            </p>
            <p className="text-info-login text-center pt-3">
              Don't Have Account Create New Account ?{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/sign-up")}
              >
                Sign-Up
              </span>
            </p>
          </div>
        </div>
      </div>
      {show && <ForgotPassword show={show} handleClose={handleClose} />}
    </section>
  );
};

export default Login;
