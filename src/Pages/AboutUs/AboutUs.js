import "./AboutUs.css";
const AboutUs = () => {
  return (
    <section className="">
      <div className="aboutUs-bg">
        <div className="text-center heading-style">Whats Our Solution ?</div>
        <div className="mt-4 ">
          <p className="sub-heading-style mx-auto">
            Secure, transparent, and convenient storage on the blockchain empowering individuals with full control over their information. Ensures data integrity and accessibility Fosters trust in document and identity management.
          </p>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-3">
          <div className="text-center">
            <div className=" style1">About us</div>
            <div className="mt-2 style2 mb-3">
            Connecting Diversity for a Decentralized Tomorrow.
            </div>
          </div>
          <div className="parentAboutSections mb-3">

            {/* ..................................About Us -1 ......................... */}

            <div className="mt-0">
              <div >
                <p>Unitic is a pioneering technology company specializing in
                  Blockchain and Web3 solutions. With a strong focus on product
                  development, we strive to address real-life problems through
                  innovative and secure applications. Our flagship product,
                  Zecurechain, is a cutting-edge Software-as-a-Service (SAAS) platform
                  that leverages blockchain technology to issue and store certificates
                  and documents securely, ensuring transparency and fraud prevention.</p>
              </div>
              <div>
                <img
                  src="/assets/images/aboutUsDetail1.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
            {/* ...................................About-Us -2................... */}
            <div className="flex-column-reverse flex-lg-row">
              <div>
                <img
                  src="/assets/images/aboutUsDetail2.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div>
                <p> At Unitic, we firmly believe in the power of blockchain to
                  revolutionize traditional systems and bring about positive changes
                  in various industries. With Zecurechain, we aim to transform the way
                  certificates and documents are managed, introducing a new level of
                  trust and efficiency. By harnessing the immutability and
                  decentralized nature of blockchain, we provide our users with a
                  tamper-proof and auditable record of their credentials.</p>
              </div>
            </div>
            {/* ........................................About-Us-3......................... */}
            <div>
              <div>
                <p>Furthermore, Unitic is actively engaged in the exploration of artificial intelligence, seamlessly integrating its capabilities into the Zecurechain platform. This strategic initiative underscores Unitic's commitment to staying at the cutting edge of technological advancement. By synergizing AI with blockchain, Zecurechain aims to elevate its offerings to a new echelon of sophistication.</p>
              </div>
              <div>
                <img
                  src="/assets/images/aboutUsDetail3.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className=" style1">Our Teams</div>
          <div className="teams-box">
            <div className="team-members" style={{ gap: "10px" }}>
              <div>
                <img
                  src="/assets/images/ceo.png"
                  alt="Avatar"
                  class="img-fluid mb-3 w-50"

                />

                <div className="mt-2 our-teams-style">SivaKumar</div>
                <div className="mt-2 team-member-position">Founder & CEO</div>
              </div>
              <div>
                <img
                  src="/assets/images/cto.png"
                  alt="Avatar"
                  class="img-fluid mb-3 w-50"

                ></img>
                <div className="mt-2 our-teams-style">Thilak Vasanth</div>
                <div className="mt-2 team-member-position">Co-Founder & CTO</div>
              </div>
              <div>
                <img
                  src="/assets/images/coo.png"
                  alt="Avatar"
                  class="img-fluid mb-3 w-50"

                ></img>
                <div className="mt-2 our-teams-style">Dr.Raja</div>
                <div className="mt-2 team-member-position">COO</div>
              </div>
              <div>
                <img
                  src="/assets/images/hd.png"
                  alt="Avatar"
                  class="img-fluid mb-3 w-50"

                ></img>
                <div className="mt-2 our-teams-style">Premchander</div>
                <div className="mt-2 team-member-position">Design Head</div>
              </div>
              {/* <div>
              <img
                src="/assets/images/unitic-developer.jpeg"
                alt="Avatar"
                class=" mb-3"
                
              ></img>
              <div className="mt-2 our-teams-style">Karthikeyan</div>
              <div className="mt-2 team-member-position">Developer</div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
