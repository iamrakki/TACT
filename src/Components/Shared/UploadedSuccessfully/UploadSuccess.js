import { useNavigate } from "react-router-dom";
import "./UploadSuccess.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import { useContext } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserAuthContext } from "../../../Context/UserContext/UserContext";
import { useState } from "react";
import SubscriptionWarnPopup from "../SubscriptionWarnPopup";

const UploadSuccess = () => {
  const { secret, user } = useContext(UserAuthContext);
  const navigate = useNavigate();
  let info = localStorage.getItem('Info');
  let parsedInfo = info ? JSON.parse(info) : null;
  let folderName = parsedInfo?.folder;
  let number = parsedInfo?.number;
  let sub = parsedInfo?.sub;
  const [openSub, setOpenSub] = useState(false);
  // console.log(openSub)

  const handleClickOpenSub = () => {
    setOpenSub(() => true);
  };

  const handleCloseSub = () => {
    // console.log("clicked mod");
    setOpenSub(() => false);
  };
  // console.log(openSub)
  // localStorage.removeItem("Info");

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

  const subSearch = async () => {
    // console.log("searched", search);
    console.log(folderName)
    if (folderName === null || folderName === "null" || folderName == null) {
      navigate("/dashboard/dashboard-folder");
      sessionStorage.setItem('selectedTab', '3');
      return 'r';
    }

    let data = await dataFolder();
    // console.log(data);
    if (data) {
      const findFolder = await data.find(folder => folder?.name === folderName);
      if (findFolder) {
        // console.log(findFolder);
        navigate(`/dashboard/dashboard-folder-details/${findFolder?._id}`);
        sessionStorage.setItem('selectedTab', '3');

      }
      else {
        const findSubFolder = await data.find((item) =>
          item.subFolders.some((subFolder) => subFolder.subName === folderName)
        );
        if (findSubFolder) {
          const subFolder = findSubFolder.subFolders.find(
            (subFolder) => subFolder.subName === folderName);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?.type_of_subscription?.name === "basic") {
      handleClickOpenSub();
    }
  }, [user?.type_of_subscription?.name]);

  return (
    <section lassName="mb-5">
      <div className="container mt-3 mb-5">
        <div
          className="d-flex justify-content-start align-items-center"
          style={{ gap: "15px" }}
        >
          <ArrowBackIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(-1);
            }}
          />
          <h4 className="dTitle">{sub}</h4>
        </div>
        <div className="text-center">
          <img src="/assets/images/success.gif" alt="" className="img-fluid w-25" />
          <h2 className="issue-style">{number}/{number} {sub} issued</h2>
          <p className="pt-3 sub-title-text">
            A Blockchain + AI Based Product Made For Super-easy & Time-saving on
            Digitial Cetificate Creation and Storage.
          </p>
          <h2 className="pt-3">
            <span className=" issue-style">Your issued {sub} stored </span>
            <span className="name-style" onClick={() => subSearch()}>{(folderName === null || folderName == null || folderName === "null") ? "Drive" : folderName}</span>
            <span className="issue-style">{" "} Folder</span>
          </h2>
        </div>

        {openSub && <SubscriptionWarnPopup open={openSub} setOpen={setOpenSub} handleClickOpen={handleClickOpenSub} handleClose={handleCloseSub} />}
      </div>
    </section>
  );
};
export default UploadSuccess;
