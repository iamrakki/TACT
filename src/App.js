import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Shared/Header/Header";
import CryptoJS from "crypto-js";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Shared/Footer/Footer";
import Headerv2 from "./Components/Shared/Headerv2/Headerv2";
import Login from "./Pages/Authentication/Login/Login";
import Footerv2 from "./Components/Shared/Footerv2/Footerv2";
import SignUp from "./Pages/Authentication/SignUp/SignUp";
import Otp from "./Pages/Authentication/Otp/Otp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHeader from "./Components/Shared/DashboardHeader/DashboardHeader";
import DashboardCertificates from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardCertificates";
import DashboardFolder from "./Pages/Dashboard/DashboardPages/DashboardFolder/DashboardFolder";
import DashboardCertificateDetails from "./Pages/Dashboard/DashboardPages/DashboardCertificateDetails/DashboardCertificateDetails";
import DashboardDocuments from "./Pages/Dashboard/DashboardPages/DashboardDocuments/DashboardDocuments";
import DashboardAddDocuments from "./Pages/Dashboard/DashboardPages/DashboardDocuments/DashboardAddDocuments";
import DashboardDocsDetails from "./Pages/Dashboard/DashboardPages/DashboardDocsDetails/DashboardDocsDetails";
import DashboardCreateCertificate from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardCreateCertificate";
import DashboardExplorer from "./Pages/Dashboard/DashboardPages/DashboardExplorer/DashboardExplorer";
import OurProductsCertificate from "./Pages/Products/Certificate/OurProductsCertificate";
import Faq from "./Pages/Faq/Faq";
import OurProductsDocument from "./Pages/Products/Document/OurProductsDocument";
import Contact from "./Pages/Contact/Contact";
import UserRoute from "./Components/ProtectedRoute/UserRoute";
import ResetPassword from "./Pages/Authentication/ResetPassword/ResetPassword";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { DashboardCreateCertificateTemplate } from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardCreateCertificateTemplate";
import DashboardTest from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardTest";
import DashboardDesignTemplate from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardDesignTemplate";
import { useContext, useEffect } from "react";
import DashboardFolderDetails from "./Pages/Dashboard/DashboardPages/DashboardFolder/DashboardFolderDetails";
import DashboardSubFolderDetails from "./Pages/Dashboard/DashboardPages/DashboardFolder/DashboardSubFolderDetails";
import Pricing from "../src/Pages/Pricing/Pricing";
import AboutUs from "./Pages/AboutUs/AboutUs";
import DashboardHome from "./Pages/Dashboard/DashboardPages/DashboardHome/DashboardHome";
import DashboardProfile from "./Pages/Dashboard/DashboardPages/DashboardProfile/DashboardProfile";
import DashboardCertificateV2 from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardCertificateV2";

import Checkout from "./Pages/Pricing/checkout";
import PrivacyPolicy from "./Pages/PrivacyPolicy/privacypolicy";
import TermsAndCondition from "./Pages/TermsAndConditions/terms_conditions";
import ComingSoon from "./Components/Shared/ComingSoon/comingsoon";
import Blogs from "../src/Pages/Blogs/blogs";
import BlogDetails from "./Pages/Blogs/blogdetails";
import DashboardChangePassword from "./Pages/Dashboard/DashboardPages/DashboardChangePassword/DashboardChangePassword";
import DashboardChangePasswordOtp from "./Pages/Dashboard/DashboardPages/DashboardChangePassword/DashboardChangePasswordOtp";
import UploadSuccess from "./Components/Shared/UploadedSuccessfully/UploadSuccess";
import Gifloader from "./Components/Shared/GifLoader/Gifloader";
import DashboardShowUserCard from "./Pages/Dashboard/DashboardPages/DashboardCertificates/DashboardShowUserCard";
import { UserAuthContext } from "./Context/UserContext/UserContext";
import NotFound from "./Pages/NotFound/NotFound";

// ..
AOS.init();

function App() {
  const { user } = useContext(UserAuthContext);
  const pathname = useLocation().pathname;
  const authenticationPage =
    pathname.includes("/login") ||
    pathname.includes("/sign-up") ||
    pathname.includes("/otp");
  const dashboardPage = pathname.includes("/dashboard");
  // console.log("isDashboard", dashboardPage);
  // const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), "").toString(CryptoJS.enc.Utf8);
  // console.log("Token", token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!dashboardPage && <Header />}
      {/* {(authenticationPage && !dashboardPage) && <Headerv2 />} */}
      {dashboardPage && <DashboardHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/certificates" element={<OurProductsCertificate />} />
        <Route path="/documents" element={<OurProductsDocument />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/otp/:id" element={<Otp />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="*" element={<NotFound />} />

        {/* Dashboard nested route */}

        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route
            path="dashboard-home"
            element={<DashboardHome />}
          />
          {/* <Route
            path="dashboard-certificates"
            element={<DashboardCertificates />}
          /> */}
          {user?.types == "issuer" && <Route
            path="dashboard-certificates-origin"
            element={<DashboardCertificateV2 />}
          />}
          <Route
            path="dashboard-profile"
            element={<DashboardProfile />}
          />
          <Route
            path="dashboard-change-password/:token"
            element={<DashboardChangePassword />}
          />
          <Route
            path="dashboard-otp"
            element={<DashboardChangePasswordOtp />}
          />
          {user?.types == "issuer" && <Route
            path="dashboard-create-certificates/:isInFolder/:folder/:isSub/:folderId"
            element={<DashboardCreateCertificate />}
          />}
          {/* <Route
            path="dashboard-create-certificates-bulk/:isInFolder/:folder/:isSub/:folderId"
            element={<DashboardCreateCertificateBulk />}
          /> */}
          <Route
            path="dashboard-create-template/:isInFolder/:folder/:isSub/:folderId"
            element={<DashboardCreateCertificateTemplate />}
          />
          <Route
            path="dashboard-design-template/:isInFolder/:folder/:isSub/:folderId"
            element={<DashboardDesignTemplate />}
          />
          <Route
            path="dashboard-upload-confirmation"
            element={<UploadSuccess />}
          />
          <Route
            path="dashboard-upload-details/:id"
            element={<DashboardShowUserCard />}
          />
          {/* <Route path='test' element={<DashboardTest />} /> */}
          <Route
            path="dashboard-certificates-details/:id"
            element={<DashboardCertificateDetails />}
          />
          <Route path="dashboard-folder" element={<DashboardFolder />} />
          <Route
            path="dashboard-folder-details/:id"
            element={<DashboardFolderDetails />}
          />
          <Route
            path="dashboard-subfolder-details/:id/:name/:sub"
            element={<DashboardSubFolderDetails />}
          />
          {/* <Route path="dashboard-test" element={<DashboardDocuments />} /> */}
          <Route path="dashboard-document" element={<DashboardAddDocuments />} />
          <Route
            path="dashboard-document-details/:id"
            element={<DashboardDocsDetails />}
          />
          <Route
            path="dashboard-document/:id"
            element={<DashboardAddDocuments />}
          />
          <Route path="dashboard-explorer" element={<DashboardExplorer />} />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            maxWidth: "100%",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      {(!authenticationPage || dashboardPage) && <Footer />}
      {authenticationPage && <Footerv2 />}
    </>
  );
}

export default App;
