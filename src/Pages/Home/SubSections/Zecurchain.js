import { React, useState } from "react";

const Zecurchain = () => {
    const [isShow, setVisible] = useState(0);
    function doVisible(index) {
        setVisible(index);
    }

    return (
        <section className="py-3 container">
            <h2 style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Lexend',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: '800',
                lineHeight: 'normal',
            }}>Why Zecurechain ?</h2>
            <p
                className="pt-3  subHeading">Craft 100+ blockchain certificates in only 30 seconds with Zecurechain's swift solution.</p>
            <div className="reason-tile-list">
                <div className="w-100">
                    <div className="reason-lists">
                        <div
                            className={`reason-checked ${isShow == 0 ? "reason-checked-clicked" : ""
                                }`}
                            onClick={() => doVisible(0)}
                        >
                            <div>
                                <div style={{ color: isShow == 0 ? "#161958" : "#7f7f7f" }}>{window.innerWidth > 700 ? "1. Security" : "Security"}</div>{" "}
                                {isShow == 0 ? <div></div> : <div></div>}{" "}
                            </div>
                        </div>
                        <div
                            className={`reason-checked ${isShow == 1 ? "reason-checked-clicked" : ""
                                }`}
                            onClick={() => doVisible(1)}
                        >
                            <div>
                                <div style={{ color: isShow == 1 ? "#161958" : "#7f7f7f" }}>
                                    {window.innerWidth > 700 ? "2. Transparency" : "Transparency"}
                                </div>{" "}
                                {isShow == 1 ? <div></div> : <div></div>}{" "}
                            </div>
                        </div>

                    </div>
                    <div className="reason-lists">
                        <div
                            className={`reason-checked ${isShow == 2 ? "reason-checked-clicked" : ""
                                }`}
                            onClick={() => doVisible(2)}
                        >
                            <div>
                                <div style={{ color: isShow == 2 ? "#161958" : "#7f7f7f" }}>
                                    {window.innerWidth > 700 ? "3. Immutablity" : "Reliable Managment"}
                                </div>{" "}
                                {isShow == 2 ? <div></div> : <div></div>}{" "}
                            </div>
                        </div>
                        <div
                            className={`reason-checked ${isShow == 3 ? "reason-checked-clicked" : ""
                                }`}
                            onClick={() => doVisible(3)}
                        >
                            <div style={{ color: isShow == 3 ? "#161958" : "#7f7f7f" }}>
                                <span>
                                    {window.innerWidth > 700
                                        ? "4. Reliable Management"
                                        : "Immutablity"}
                                </span>
                                <span style={{ color: "transparent" }}>{"  ds"}</span>
                                {isShow == 3 ? <div></div> : <div></div>}{" "}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reason-tile-details w-100">
                    <div className="reason-tile-details-board">
                        <div className="mind-map">
                            <div className="top-left-connection"></div>
                            <div
                                className="top-feature"
                                style={{
                                    backgroundColor:
                                        isShow == 0 || isShow == -1
                                            ? "#E7D4FE"
                                            : isShow == 1
                                                ? "#000"
                                                : isShow == 2
                                                    ? "#F3FE9D"
                                                    : "#DEDEDE",
                                    fontFamily: 'Saira, sans-serif',
                                    color: isShow == 1 ? "white" : "black",
                                }}
                            >
                                {isShow == 0
                                    ? "Security"
                                    : isShow == 1
                                        ? "Transparency"
                                        : isShow == 2
                                            ? "Immutability"
                                            : isShow == 3
                                                ? "Reliable"
                                                : "Security"}
                            </div>
                            <div className="top-right-connection"></div>
                        </div>

                        <div className="second-row">
                            <div
                                className="left-feature"
                                style={{
                                    backgroundColor:
                                        isShow == 0 || isShow == -1
                                            ? "#000"
                                            : isShow == 1
                                                ? "#F3FE9D"
                                                : isShow == 2
                                                    ? "#DEDEDE"
                                                    : "#E7D4FE",
                                    fontFamily: 'Saira, sans-serif',
                                    color: isShow == 0 || isShow == -1 ? "white" : "black",
                                }}
                            >
                                {isShow == 0 || isShow == -1
                                    ? "Transparency"
                                    : isShow == 1
                                        ? "Immutability"
                                        : isShow == 2
                                            ? "Reliable"
                                            : isShow == 3
                                                ? "Security"
                                                : "Security"}
                            </div>
                            <div style={{ width: 105 }}></div>
                            <div
                                className="right-feature"
                                style={{
                                    backgroundColor:
                                        isShow == 0 || isShow == -1
                                            ? "#DEDEDE"
                                            : isShow == 1
                                                ? "#E7D4FE"
                                                : isShow == 2
                                                    ? "#000"
                                                    : "#F3FE9D",
                                    fontFamily: 'Saira, sans-serif',
                                    color: isShow == 2 ? "white" : "black",
                                }}
                            >
                                {isShow == 0
                                    ? "Reliable"
                                    : isShow == 1
                                        ? "Security"
                                        : isShow == 2
                                            ? "Transparency"
                                            : isShow == 3
                                                ? "Immutability"
                                                : "Security"}
                            </div>
                        </div>
                        <div className="third-row">
                            <div className="right-bottom-connection"></div>

                            <div
                                className="bottom-feature"
                                style={{
                                    backgroundColor:
                                        isShow == 0 || isShow == -1
                                            ? "#F3FE9D"
                                            : isShow == 1
                                                ? "#DEDEDE"
                                                : isShow == 2
                                                    ? "#E7D4FE"
                                                    : "#000",
                                    fontFamily: 'Saira, sans-serif',
                                    color: isShow == 3 ? "white" : "black",
                                }}
                            >
                                {isShow == 0
                                    ? "Immutability"
                                    : isShow == 1
                                        ? "Reliable"
                                        : isShow == 2
                                            ? "Security"
                                            : isShow == 3
                                                ? "Transparency"
                                                : "Security"}
                            </div>
                            <div className="bottom-left-connection"></div>
                        </div>
                        <div className="reason-details">
                            {isShow == 0 || isShow == -1 ? (
                                <div>
                                    <p className=""
                                        style={{ fontFamily: 'Saira, sans-serif' }}>

                                        Zecurechain leverages <span className="important-details">blockchain technology</span> to ensure secure and <span className="important-details">tamper-proof certificate issuance</span> and document storage , protecting <span className="important-details">against breaches and fraud.</span>
                                    </p>

                                </div>
                            ) : isShow == 1 ? (
                                <div>

                                    <p className=""
                                        style={{ fontFamily: 'Saira, sans-serif' }}>The platform provides a <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >transparent and auditable records</span> of actions, establishing trust by allowing users to <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >easily verifies the authenticity</span> and integrity of  <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >ceritificates and documents.
                                        </span>
                                    </p>
                                </div>
                            ) : isShow == 2 ? (
                                <div>

                                    <p className=""
                                        style={{ fontFamily: 'Saira, sans-serif' }}>Zecurechain Gurantees that once a  <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >certificate or document
                                        </span> is recorded on the block chain,  <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >it cannot be altered or manipulated
                                        </span> ensuring data integrity and eliminating the <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >risk of tampering
                                        </span> or falsification.
                                    </p>

                                </div>
                            ) : (
                                <div>

                                    <p className=""
                                        style={{ fontFamily: 'Saira, sans-serif' }}>Zecurechain offers a
                                        <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        > user-friendly interface for storing
                                        </span> and <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >accessign digital cerifications and documents
                                        </span>, providing a reiable solution for efficient and <span
                                            className="important-details"
                                            style={{ fontFamily: 'Saira, sans-serif' }}
                                        >secure document management.
                                        </span>
                                    </p>


                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Zecurchain;
