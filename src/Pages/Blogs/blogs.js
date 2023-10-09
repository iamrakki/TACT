import { Helmet } from "react-helmet";
import "./blog.css";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
  const navigate = useNavigate();
  return (
    <section className="container" style={{ minHeight: '100vh' }}>
      <Helmet>
        <title>Zecurechain | What Are Digital Credentials</title>
        <meta name="description" content="Discover the power of Zecurechain's digital credentials and their transformative role in enhancing educational institutions." />
      </Helmet>
      <h1 className="text-left mt-4">
        Blogs
      </h1>
      <div style={{ marginBottom: "50px" }} className="mt-4">
        <div className="blog-section" onClick={() => navigate("/blogs/what-are-digital-credentials-for-institutions")}>


          <img
            alt=""
            src="/assets/images/blog-thumb.png"
            className="blog-bg"
          />


          <div>
            <h1 className="blog-title">
              What Are Digital Credentials and How it can help Educational institutions?
            </h1>
            <p className="blog-sub">
              "Digital credentials are electronic records in form of Digital certificates & documents that represent an individual's achievements, skills, or qualifications. They serve as a verifiable and secure way to showcase a person's educational accomplishments. These credentials can include academic degrees, certifications, badges, and other qualifications earned by a student."
            </p>
            {/* <p className="posted-by">{"By barbra  Geo Ceo"}</p> */}
            <div>
            <p
            className="text-left mt-2">
            September 25 2023
            <span className="time" style={{ marginLeft: "40px" }}>3 Min Read</span>
            </p>
              {/* <span className="posted-on"> September 25 2023 </span> */}
              {/* <span className="time" style={{ marginLeft: "40px" }}>3 Min Read</span> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Blogs;
