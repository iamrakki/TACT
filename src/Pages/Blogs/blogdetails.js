import { Helmet } from "react-helmet";
import "./blog.css";
import { useState } from "react";


const BlogDetails = () => {
  return (
    <section className="container">
      <Helmet>
        <title>What Are Digital Credentials</title>
        <meta name="description" content="Discover the power of Zecurechain's digital credentials and their transformative role in enhancing educational institutions." />
      </Helmet>
      <div className="blog-main-content mt-4">
        <span className="blog-title"> What Are Digital Credentials and How it can help Educational institutions?
        </span>
        {/* <span className="posted-on"> September 25 2023 </span> */}
        <span className="time" style={{ marginLeft: "40px" }}>
          4 Min Read
        </span>
      </div>
      <div style={{ textAlign: "center", marginTop: "36px" }}>
        <img
          src="/assets/images/blogpost-1.png"
          height={"100px"}
          className="img-fluid"
          alt="digital credential"
        ></img>
      </div>
      <div style={{ marginBottom: "100px" }}>
        <div className="blog-main-content">
          Digital credentials are electronic records in form of Digital
          certificates & documents that represent an individual's achievements,
          skills, or qualifications. They serve as a verifiable and secure way
          to showcase a person's educational accomplishments. These credentials
          can include academic degrees, certifications, badges, and other
          qualifications earned by a student.
        </div>
        <h3 className="sub-heading-title">👉 Instant Verification:</h3>
        <div className="blog-detail-img">
          <img alt="" src="/assets/images/blog1.png"></img>
        </div>
        <div className="blog-main-content">
          Managing and verifying paper credentials can be time-consuming and
          resource-intensive. Digital credentials software automate this
          process, reducing administrative workload and allowing staff to focus
          on more strategic tasks.
        </div>
        <h3 className="sub-heading-title">👉 Cost-Efficiency:</h3>
        <div className="blog-detail-img">
          <img alt="" src="/assets/images/blog2.png"></img>
        </div>

        <div className="blog-main-content">
          Issuing and managing digital credentials can be more cost-effective in
          the long run compared to traditional paper-based systems. It reduces
          printing and administrative costs associated with physical
          certificates.
        </div>
        <h3 className="sub-heading-title">👉 Security and Authenticity:</h3>
        <div className="blog-detail-img">
          <img alt="" src="/assets/images/blog3.png"></img>
        </div>
        <div className="blog-main-content">
          Digital credentials are stored on a blockchain or similar secure
          platform, making them tamper-proof and highly resistant to fraud or
          misrepresentation. This ensures that the credentials presented by a
          student are genuine and unaltered.
        </div>
        <h3 className="sub-heading-title"> 👉 Global Accessibility:</h3>
        <div className="blog-detail-img">
          <img alt="" src="/assets/images/blog4.png"></img>
        </div>
        <div className="blog-main-content">
          Digital credentials can be accessed and verified from anywhere in the
          world, eliminating geographical barriers. This is particularly
          beneficial for international students or professionals seeking
          opportunities abroad.
        </div>
        <h3 className="sub-heading-title">
          {" "}
          👉 Enabling Stackable Credentials:
        </h3>
        <div className="blog-detail-img">
          <img alt="" src="/assets/images/blog5.png"  ></img>
        </div>
        <div className="blog-main-content">
          Digital credentials can be designed to stack or build upon one
          another, allowing learners to accumulate a series of smaller
          credentials that ultimately lead to a larger qualification or degree.
          This supports flexible and modular learning pathways.
        </div>
      </div>
    </section>
  );
};
export default BlogDetails;
