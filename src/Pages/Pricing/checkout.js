import { React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pricing.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "react-bootstrap";
import { useState } from "react";
const Checkout = () => {
  const navigate = useNavigate();
  const props = useLocation();
  const [dropDownClicked, setDropDownVisibile] = useState(false);
  const [subscriptionType, setsubscriptionType] = useState("");
  const [checkoutPrice, setCheckoutPrice] = useState("");
  const currencySymbol = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    setCheckoutPrice(
      props.state.type == "Monthly"
        ? props.state.price[0]
        : props.state.price[1]
    );
    setsubscriptionType(props.state.type);
  }, [props.state.price, props.state.type]);

  const paymentHandler = async (e) => {
    const API_URL = " https://api.zecurechain.com/api/v1/payment/";

    const orderUrl = `${API_URL}order`;
    const response = await axios.post(orderUrl, {
      amount: checkoutPrice * 100,
      currency: "INR",
    });
    const { data } = response;
    // console.log("data", data);
    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: "Karthikeyan",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await axios.post(url, {
            amount: checkoutPrice * 100,
            currency: "INR",
          });
          // console.log(response, captureResponse)

        } catch (err) {
          console.log(err);
          console.log(response)
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  function changeSubcriptionPlan(event) {
    setsubscriptionType(event.target.value);
    setCheckoutPrice(
      event.target.value == "Monthly"
        ? props.state.price[0]
        : props.state.price[1]
    );
    setDropDownVisibile(false);
  }
  return (
    <section className="container" style={{ minHeight: '90vh' }}>

      <div className='text-start mt-4'>
        <div className='d-flex justify-content-start align-items-center' style={{ gap: '5px' }}>
          <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
          <h4 className='dTitle' >Checkout</h4>
        </div>
        {/* <h4 className='dTitle mt-4'>Checkout</h4> */}
        <p style={{
          color: "#545454",
          textAlign: "start",
          fontFamily: 'Saira, sans-serif',
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal"
        }} className='mb-0'>Seamless Onboarding & Transparent Pricing</p>
      </div>

      <div className="checkout-box-style shadow">
        <div className="chk-title-style">{`Subscribe to ${props.state.name}`}</div>
        <div>
          <div>
            <div className="pt-3 d-flex align-items-start  gap-2 justify-content-start flex-column ">
              {/* <div className="chk-price-style">
                {currencySymbol.format(checkoutPrice).split(".00")}
              </div>

              <div className="per-sub-style">
                {`per ${subscriptionType} + GST `}
                <img
                  className="img-fluid"
                  style={{ cursor: 'pointer' }}
                  width={20}
                  alt=""
                  src="/assets/images/dropdown.png"
                  onClick={() => setDropDownVisibile(!dropDownClicked)}
                />
              </div>

              <div className="chk-price-style">
                {currencySymbol.format(checkoutPrice).split(".00")}
              </div>
              <div className="per-sub-style">
                {`per ${subscriptionType} + GST `}
                <img
                  className="img-fluid"
                  style={{ cursor: 'pointer' }}
                  width={20}
                  alt=""
                  src="/assets/images/dropdown.png"
                  onClick={() => setDropDownVisibile(!dropDownClicked)}
                />
              </div> */}

              <div >
                <label className="d-flex align-items-center gap-2 justify-content-start">
                  <input
                    style={{ height: '20px', width: '20px', cursor: 'pointer' }}
                    type="radio"
                    value="Yearly"
                    checked={subscriptionType == "Yearly"}
                    onChange={changeSubcriptionPlan}
                  />
                  <span className="chk-price-style" style={{ paddingLeft: "0px" }}>
                    {currencySymbol.format(props.state.price[1]).split(".00")}
                  </span>
                  <span>{" per Yearly + GST"}</span>
                </label>
              </div>
              <div >
                <label className="d-flex align-items-center gap-2 justify-content-start">

                  <input
                    style={{ height: '20px', width: '20px', cursor: 'pointer' }}
                    type="radio"
                    value="Monthly"
                    checked={subscriptionType == "Monthly"}
                    onChange={changeSubcriptionPlan}
                  />
                  <span className="chk-price-style" style={{ paddingLeft: "0px" }}>
                    {currencySymbol.format(props.state.price[0]).split(".00")}
                  </span>
                  <span>{" per Monthly + GST"}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {dropDownClicked == true ? (
          <div>
            <div
              className="radio per-sub-style radio-bg d-flex justify-content-start align-items-center"
              style={{ paddingLeft: "20px" }}
            >
              <div>
                <label className="d-flex align-items-center gap-2">

                  <input
                    style={{ height: '20px', width: '20px' }}
                    type="radio"
                    value="Monthly"
                    checked={subscriptionType == "Monthly"}
                    onChange={changeSubcriptionPlan}
                  />
                  <span className="chk-price-style" style={{ paddingLeft: "16px" }}>
                    {currencySymbol.format(props.state.price[0]).split(".00")}
                  </span>
                  <span>{" per Monthly + GST"}</span>
                </label>
              </div>
            </div>
            <div
              className="radio per-sub-style radio-bg d-flex justify-content-start align-items-center"
              style={{ paddingLeft: "20px" }}
            >
              <div>
                <label className="d-flex align-items-center gap-2">
                  <input
                    style={{ height: '20px', width: '20px' }}
                    type="radio"
                    value="Yearly"
                    checked={subscriptionType == "Yearly"}
                    onChange={changeSubcriptionPlan}
                  />
                  <span className="chk-price-style" style={{ paddingLeft: "16px" }}>
                    {currencySymbol.format(props.state.price[1]).split(".00")}
                  </span>
                  <span>{" per Yearly + GST"}</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="pt-2 sub-title-style">
          For business looking for the maximum comitative edge and expanding
          their reach
        </div>
        <div className="pt-3 d-flex justify-content-between align-items-center">
          <div>
            <h4>
              {props.state.name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h4>
            <p>{`Billed ${subscriptionType}`}</p>
          </div>
          <h4>{currencySymbol.format(checkoutPrice).split(".00")}</h4>
        </div>
        <div className="pt-3 d-flex justify-content-between align-items-center">
          <h4 className="chk-title-style">GST</h4>
          <h4>{currencySymbol.format(checkoutPrice).split(".00")}</h4>
        </div>
        <div className="pt-3 d-flex justify-content-between align-items-center">
          <h4 className="chk-title-style">Total</h4>

          <h4>{currencySymbol.format(checkoutPrice).split(".00")}</h4>
        </div>
        <div className="text-center">
          <Button
            variant="warning"
            className="px-4 py-3 rounded-pill"
            style={{ fontSize: "18px" }}
            type="submit"
            onClick={() => paymentHandler()}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Checkout;
