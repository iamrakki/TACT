import React from "react";

const AiThemeIntro = () => {
  return (
    <section>
      <div className="container bg-themeGen">
        <div>
          <h2 className="headings pt-5 pb-3">AI Powered Theme Generation</h2>
        </div>
        <div className="d-flex align-items-start justify-content-center">
          <img src="/assets/images/glowing-star.png" alt="" />
          <p className="mt-4 pt-4 text-themeGn">
            Zecurechain incorporates an innovative AI-based theme generator that
            revolutionizes the way users personalize there themes. With a vast
            library of design elements, color palettes, and layout options.
            Zecurechain empowers users to create visually stunning and
            personalized themes that reflect their unique style and enhance
            their overall digital experience.
          </p>
          <img
            src="/assets/images/glowing-star.png"
            style={{ marginTop: "10%" }}
            alt="" />
        </div>
      </div>
    </section>
  );
};

export default AiThemeIntro;
