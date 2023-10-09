import { React, useState } from "react";
import "./Pricing.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserAuthContext } from "../../Context/UserContext/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Pricing = () => {
  const { user } = useContext(UserAuthContext);
  const [headingBgColor, setBgColor] = useState("#161958");
  const [headingContentColor, setHeadingContentColor] = useState("white");
  const [headingBgColor2, setBgColor2] = useState("#161958");
  const [headingContentColor2, setHeadingContentColor2] = useState("white");
  const [headingBgColor3, setBgColor3] = useState("#161958");
  const [headingContentColor3, setHeadingContentColor3] = useState("white");
  const [selectedType, setSubscriptionType] = useState(1);
  const [selectedItemType, setItemType] = useState(user?.types == "individual" ? 2 : 1);
  const [getStartedColor, setButtonBgColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currencySymbol = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  function goToCheckout(params) {
    navigate(`/checkout/${params.name}`, { state: params });
  }
  function setOnHoverColor(value) {
    if (value === 1) {
      setBgColor("white");
      setHeadingContentColor("black");
    } else if (value === 2) {
      setBgColor2("white");
      setHeadingContentColor2("black");
    } else {
      setBgColor3("white");
      setHeadingContentColor3("black");
    }
  }
  function BackToNormalColor(value) {
    if (value === 1) {
      setBgColor("#161958");
      setHeadingContentColor("white");
    } else if (value === 2) {
      setBgColor2("#161958");
      setHeadingContentColor2("white");
    } else {
      setBgColor3("#161958");
      setHeadingContentColor3("white");
    }
  }
  return (
    <section className="mt-5 container">
      <div className=" mt-2 text-center font-weight-500 title-style">
        Zecurechain offers simplified Pricing for certificate & Document
      </div>
      <div className="mt-2 text-center sub-title-style">
        Seamless onboarding & Transparent pricing solutions
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className=" mt-4 item-box">
          <div className="tof-subscription">
            <div
              className="style-sub"
              style={{
                backgroundColor:
                  selectedItemType == 1 ? "#FCDA27" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                if (user?.types == "individual") {
                  return toast.error("Please register as issuer");
                }
                else if (user?.types == "issuer") {

                  setItemType(() => 1)
                }
                else if (!user) {
                  setItemType(() => 1)
                }
              }}
            >
              Certificates
            </div>
            <div
              className="style-sub"
              style={{
                backgroundColor:
                  selectedItemType == 2 ? "#FCDA27" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setItemType(2)}
            >
              Documents
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className=" mt-4 subscriptions-box">
          <div className="tof-subscription">
            <div
              className="style-sub"
              style={{
                color: selectedType == 1 ? "white" : "black",
                backgroundColor: selectedType == 1 ? "#161958" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setSubscriptionType(1)}
            >
              Monthly
            </div>
            <div
              className="style-sub"
              style={{
                color: selectedType == 2 ? "white" : "black",
                backgroundColor: selectedType == 2 ? "#161958" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setSubscriptionType(2)}
            >
              {" "}
              Yearly
            </div>
          </div>
        </div>
      </div>
      <form>
        <script
          src="https://cdn.razorpay.com/static/widget/subscription-button.js"
          data-subscription_button_id="pl_MWb0SDUymTGE2z"
          data-button_theme="brand-color"
          async
        >
          {" "}
        </script>{" "}
      </form>
      <div className="purchase-types">
        {/* .........................Foundation............................. */}
        <div className="purchase-detail">
          <div
            className="purchase-heading text-center"
            style={{
              backgroundColor: headingBgColor,
              color: headingContentColor,
            }}
          >
            Foundation
          </div>
          <div
            onMouseEnter={() => setOnHoverColor(1)}
            onMouseLeave={() => BackToNormalColor(1)}
          >
            <div className="subscriptions-spec">
              <div
                className="price-style"
                style={{ color: headingBgColor == "white" ? "white" : "black" }}
              >
                {currencySymbol
                  .format(selectedType == 1 ? 999 : 9999)
                  .split(".00")}
              </div>
              <div className="pt-4 text-styles">
                {selectedType == 1 && selectedItemType == 1
                  ? "5 Certificates"
                  : selectedType == 1 && selectedItemType == 2
                    ? "5 Documents"
                    : selectedType == 2 && selectedItemType == 1
                      ? "15 Certificates"
                      : "15 Documents"}
              </div>
              <div className="pt-4">Free Storage</div>
              <div className="pt-4" style={{ paddingLeft: 15 }}>
                No Custom Template
              </div>

              <div
                className="get-started-design"
                style={{
                  backgroundColor:
                    headingBgColor == "white" ? "#eccd1a" : "transparent",
                  border:
                    headingBgColor != "white"
                      ? "1px solid #161958"
                      : "transparent",
                }}
                onClick={() =>
                  goToCheckout({
                    type: selectedType == 1 ? "Monthly" : "Yearly",
                    name: "foundation",
                    price: [999, 9999],
                  })
                }
              >
                Get Started
              </div>
            </div>
          </div>
        </div>
        {/* ..............................Intermediate.................. */}
        <div className="purchase-detail">
          <div
            className="purchase-heading text-center"
            style={{
              backgroundColor: headingBgColor2,
              color: headingContentColor2,
            }}
          >
            Intermediate
          </div>
          <div
            onMouseEnter={() => setOnHoverColor(2)}
            onMouseLeave={() => BackToNormalColor(2)}
          >
            <div className="text-center subscriptions-spec">
              <div
                className="price-style"
                style={{
                  color: headingBgColor2 == "white" ? "white" : "black",
                }}
              >
                {currencySymbol
                  .format(selectedType == 1 ? 2999 : 29999)
                  .split(".00")}
              </div>
              <div className="pt-4 text-styles">
                {selectedType == 1 && selectedItemType == 1
                  ? "15 Certificates"
                  : selectedType == 1 && selectedItemType == 2
                    ? "15 Documents"
                    : selectedType == 2 && selectedItemType == 1
                      ? "30 Certificates"
                      : "30 Documents"}
              </div>
              <div className="pt-4">Free Storage</div>
              <div className="pt-4" style={{ paddingLeft: 15 }}>
                2 Custom Template
              </div>
              <div
                className="get-started-design"
                style={{
                  backgroundColor:
                    headingBgColor2 == "white" ? "#eccd1a" : "transparent",
                  border:
                    headingBgColor2 != "white"
                      ? "1px solid #161958"
                      : "transparent",
                }}
                onClick={() =>
                  goToCheckout({
                    type: selectedType == 1 ? "Monthly" : "Yearly",
                    name: "intermediate",
                    price: [2999, 29999],
                  })
                }
              >
                Get Started
              </div>
            </div>
          </div>
        </div>
        {/* ................................EnterPrise....................... */}
        <div className="purchase-detail">
          <div
            className="purchase-heading text-center"
            style={{
              backgroundColor: headingBgColor3,
              color: headingContentColor3,
            }}
          >
            EnterPrise
          </div>
          <div
            onMouseEnter={() => setOnHoverColor(3)}
            onMouseLeave={() => BackToNormalColor(3)}
          >
            <div className="text-center subscriptions-spec">
              <div
                className="price-style"
                style={{
                  color: headingBgColor3 == "white" ? "white" : "black",
                }}
              >
                {currencySymbol
                  .format(selectedType == 1 ? 4999 : 99999)
                  .split(".00")}
              </div>
              <div className="pt-4 text-styles">
                {selectedType == 1 && selectedItemType == 1
                  ? "1000 Certificates"
                  : selectedType == 1 && selectedItemType == 2
                    ? "1000 Documents"
                    : selectedType == 2 && selectedItemType == 1
                      ? "1500 Certificates"
                      : "1500 Documents"}
              </div>
              <div className="pt-4">Free Storage</div>
              <div className="pt-4" style={{ paddingLeft: 15 }}>
                Custom Template
              </div>
              <div
                className="get-started-design"
                style={{
                  backgroundColor:
                    headingBgColor3 == "white" ? "#eccd1a" : "transparent",
                  border:
                    headingBgColor3 != "white"
                      ? "1px solid #161958"
                      : "transparent",
                }}
                onClick={() =>
                  goToCheckout({
                    type: selectedType == 1 ? "Monthly" : "Yearly",
                    name: "enterprise",
                    price: [4999, 99999],
                  })
                }
              >
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Pricing;
