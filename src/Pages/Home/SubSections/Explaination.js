import { React, useState, useEffect } from "react";

const Explaination = () => {
    let offScreen;
    const [scrollStart, scrollStatus] = useState(false);
    const [curve1Visible, curve1Status] = useState(false);
    const [curve2Visible, curve2Status] = useState(false);

    useEffect(() => {
        if (scrollStart == true) {
            setTimeout(() => {
                curve1Status(!curve1Visible);
                curve2Status(!curve2Visible);
            }, 2000);
        }
    });

    function imgExtend() {
        offScreen = document.querySelector(".scroll-container");
        offScreen.style.height = "20rem";
        offScreen.style.marginLeft = "23%";
        offScreen.style.marginRight = "25%";
        offScreen.style.paddingTop = "50%";
        offScreen.style.backgroundSize = "95%";
        // offScreen.style.transform = `scale(4.5)`;
        offScreen.style.transition = "all 2s";
        offScreen.style.display = "block";
        setTimeout(function () {
            scrollStatus(true);
            curve1Status(true);
        }, 1000);
    }

    return (
        <section className="bg-explanation">
            <div style={{ marginTop: 60 }} className="py-5">
                <h2 className="headings" onMouseEnter={imgExtend}>
                    Our Featured Explanations
                </h2>
                <div
                    // className="curve-1"
                    className={`${scrollStart ? (curve1Visible ? "curve-1" : "curve-2") : ""
                        }`}
                >
                    <div class="scroll-container"></div>
                </div>
            </div>
        </section>
    );
};

export default Explaination;
