import React from "react";
import "./Footer.css";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const navigate = useNavigate();
  function scrollTo(value) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(
      value == 1
        ? "/certificates"
        : value == 2
        ? "/documents"
        : value == 3
        ? "/"
        : value == 4
        ? "/comingsoon"
        : value == 5
        ? "/blogs"
        : value == 6
        ? "/pricing"
        : value == 7
        ? "/comingsoon"
        : value == 8
        ? "/faq"
        : value == 9
        ? "/about-us"
        : value == 10
        ? "/contact-us"
        : value == 11
        ? "/terms-and-conditions"
        : "/privacy-policy"
    );
  }
  return (
    <section className="bg-footer">
      <div className="container py-4 pt-5">
        <div className="d-flex justify-content-start align-items-start flex-column flex-lg-row">
          <div>
            {/* <h4 className='footer-title'>SECURETICS</h4> */}
            <img src="/assets/images/logo.svg" alt="" className="img-fluid" />
            <div className="my-4">
              {/* <img src="/assets/images/Instagram.png" alt="" className='img-fluid' />
                            <img src="/assets/images/Telegram.png" alt="" className='img-fluid ms-2' /> */}
              <EmailIcon fontSize="medium" />
              <LinkedInIcon fontSize="medium" className="ms-2" />
            </div>
            <div>
              <img
                src="./assets/images/unilogo.png"
                alt=""
                className="img-fluid" 
                width={150}
              />
            </div>
          </div>
          <div className="row g-5 mx-auto titleHandle pt-5 pt-lg-0 ">
            <div className="col-6 col-sm-6 col-md-6 col-lg-4 me-auto  text-center">
              <h4>Products</h4>
              <p onClick={() => scrollTo(1)}>Certificates</p>
              <p onClick={() => scrollTo(2)}>Documents</p>
              <p >Explorer</p>
              <p onClick={() => scrollTo(4)}>E-Sign</p>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-4 me-auto  text-center">
              <h4>Resource</h4>
              <p onClick={() => scrollTo(5)}>Blogs</p>
              <p onClick={() => scrollTo(6)}>Pricing</p>
              <p onClick={() => scrollTo(7)}>Tutorials</p>
              <p onClick={() => scrollTo(8)}>FAQ</p>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-4 me-auto  text-center">
              <h4>Company</h4>
              <p onClick={() => scrollTo(9)}>About-us</p>
              <p onClick={() => scrollTo(10)}>Contact-us</p>
              <p onClick={() => scrollTo(11)}>Terms of Use</p>
              <p onClick={() => scrollTo(12)}>Privacy Policy</p>
            </div>
          </div>
        </div>
        <p className="text-center pt-4 mb-0">Unitic &copy; {year}</p>
      </div>
    </section>
  );
};

export default Footer;
