import { React, useState } from "react";

const Featured = () => {
  const [hoverColor, setHoverColor] = useState("black");
  const [subHoverColor, setSubHoverColor] = useState("#545454");
  const [hoverColor2, setHoverColor2] = useState("black");
  const [subHoverColor2, setSubHoverColor2] = useState("#545454");
  const [hoverColor3, setHoverColor3] = useState("black");
  const [subHoverColor3, setSubHoverColor3] = useState("#545454");
  function setInColor(e) {
    setHoverColor("white");
    setSubHoverColor("white");
  }
  function setOutColor(e) {
    setHoverColor("black");
    setSubHoverColor("#545454");
  }
  function setInColor2(e) {
    setHoverColor2("white");
    setSubHoverColor2("white");
  }
  function setOutColor2(e) {
    setHoverColor2("black");
    setSubHoverColor2("#545454");
  }
  function setInColor3(e) {
    setHoverColor3("white");
    setSubHoverColor3("white");
  }
  function setOutColor3(e) {
    setHoverColor3("black");
    setSubHoverColor3("#545454");
  }

  return (
    <section className="py-3 overflow-hidden">
      {/*.................................Our Feature Explanations............... ........*/}
      <h2 className="headings">Efficiency Of Zecurechain</h2>
      <p className="pt-3  subHeading d-flex-center-center">
        <span>Redefining Efficiency In The World Of</span> <h1 className="mb-0" style={{ fontSize: '18px' }}>Digital Credentials</h1>{" "}
      </p>

      <div className="container">
        <div className="div-container mb-3">
          <div
            class="div-style"
            onMouseOver={setInColor}
            onMouseOut={setOutColor}
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="2000"
          >
            <h3
              className="feature-content-heading-style mb-0"
              style={{
                color: hoverColor,
              }}
            >
              Paper document
            </h3>
            <div
              className=" w-100 d-flex justify-content-center align-items-center"
              style={{ height: "85%" }}
            >
              <p
                className="feature-content-style"
                style={{
                  fontFamily: "Saira, sans-serif",
                  color: subHoverColor,
                }}
              >
                {
                  "Physical storage of documents on paper, typically requiring manual handling and organization for retrieval and sharing."
                }
              </p>
            </div>
          </div>

          <div
            class="div-style"
            onMouseOver={setInColor2}
            onMouseOut={setOutColor2}
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="2000"
          >
            <h3
              className="feature-content-heading-style mb-0"
              style={{
                color: hoverColor2,
              }}
            >
              Digital document
            </h3>
            <div
              className=" w-100 d-flex justify-content-center align-items-center"
              style={{ height: "85%" }}
            >
              <p
                className="feature-content-style"
                style={{
                  fontFamily: "Saira, sans-serif",
                  color: subHoverColor2,
                }}
              >
                Electronic Storage of Documents in Digital Formats, allowing for
                easy search , access and sharing, often requiring a centralized
                server
              </p>
            </div>
          </div>


          <div
            class="div-style"
            onMouseOver={setInColor3}
            onMouseOut={setOutColor3}
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="2000"
          >
            <h3
              className="feature-content-heading-style mb-0"
              style={{
                color: hoverColor3,
              }}
            >
              Decentralized document
            </h3>

            <div
              className=" w-100 d-flex justify-content-center align-items-center"
              style={{ height: "85%" }}
            >
              <p
                className="feature-content-style"
                style={{
                  fontFamily: "Saira, sans-serif",
                  color: subHoverColor3,
                }}
              >
                Decentralized system where documents are stored across multiple
                nodes, enabling Secured, Trusted, Immutable, and Verifiable
                Ecosystem
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*..........................................Sub Content..........................................*/}
      <div className={`${window.innerWidth > 992 ? 'container' : ''} scroll-bg`}>

        <div
          className="d-flex justify-content-between feature-heading-style"
          style={{ marginLeft: "35%", marginRight: "7%", marginTop: "5%", gap: '25px' }}
        >
          <p>Paper</p>
          <p>Traditional</p>
          <p>Blockchain</p>
        </div>
        <div>
          <div className="first-feature-row">
            <div className="set-polygon-1">
              <div className="set-zigzag">
                <p className="feature-title-style">01 Transparency</p>
              </div>
            </div>
            {(() => {
              let content = [];
              for (let i = 0; i < 3; i++) {
                content.push(
                  <div className="subtitle-features">
                    {i == 0 ? (
                      <p className="feature-subtitle-style">Low</p>
                    ) : i == 1 ? (
                      <p className="feature-subtitle-style">Moderate</p>
                    ) : (
                      <p className="feature-subtitle-style">High</p>
                    )}
                  </div>
                );
              }
              return content;
            })()}
          </div>
          <div className="remainig-feature-row">
            <div className="set-polygon-2">
              <div className="set-zigzag">
                <div className="feature-title-style">02 Secure</div>
              </div>
            </div>
            {(() => {
              let content = [];
              for (let i = 0; i < 3; i++) {
                content.push(
                  <div className="subtitle-features">
                    {i == 0 ? (
                      <div className="feature-subtitle-style">Limited</div>
                    ) : i == 1 ? (
                      <div className="feature-subtitle-style">Controlled</div>
                    ) : (
                      <div className="feature-subtitle-style">Enhanced</div>
                    )}
                  </div>
                );
              }
              return content;
            })()}
          </div>
          <div className="remainig-feature-row">
            <div className="set-polygon-3">
              <div className="set-zigzag">
                <div className="feature-title-style">03 Eco Friendly</div>
              </div>
            </div>
            {(() => {
              let content = [];
              for (let i = 0; i < 3; i++) {
                content.push(
                  <div className="subtitle-features">
                    {i == 0 ? (
                      <div className="feature-subtitle-style">Moderate</div>
                    ) : i == 1 ? (
                      <div className="feature-subtitle-style">Moderate</div>
                    ) : (
                      <div className="feature-subtitle-style">
                        Potentially
                      </div>
                    )}
                  </div>
                );
              }
              return content;
            })()}
          </div>
          <div className="remainig-feature-row">
            <div className="set-polygon-4">
              <div className="set-zigzag">
                <div className="feature-title-style">04 Tamper Proof</div>
              </div>
            </div>
            {(() => {
              let content = [];
              for (let i = 0; i < 3; i++) {
                content.push(
                  <div className="subtitle-features">
                    {i == 0 ? (
                      <div className="feature-subtitle-style">Modest</div>
                    ) : i == 1 ? (
                      <div className="feature-subtitle-style">Limited</div>
                    ) : (
                      <div className="feature-subtitle-style">Strong</div>
                    )}
                  </div>
                );
              }
              return content;
            })()}
          </div>
        </div>


      </div>
    </section>
  );
};

export default Featured;
