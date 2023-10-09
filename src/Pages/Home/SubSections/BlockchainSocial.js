import { React, useState } from "react";
const BlockchainSocial = () => {
    const [selectedValue, setSelectedValue] = useState(0);
    function setterValue(i) {
        setSelectedValue(i);
    }
    return (
        <section style={{ marginTop: 68 }}>
            <h2 className="headings">Blockchain for Social Impact</h2>
            <div
                className={` ${selectedValue == 0
                    ? "social-sub-div-1"
                    : selectedValue == 1
                        ? "social-sub-div-2"
                        : "social-sub-div-3"
                    }`}
            >
                <div className="social-sub-contents">
                    <div style={{ marginTop: 50 }}>
                        {(() => {
                            let contents = [];
                            for (let i = 0; i < 3; i++) {
                                contents.push(
                                    <div
                                        className="social-title-style"
                                        style={{
                                            color: selectedValue == i ? "white" : "black",
                                            backgroundColor:
                                                selectedValue == i ? "radial-gradient(50% 50.00% at 50% 50.00%, #2D37A6 0%, #161958 100%)" : "transparent",
                                        }}
                                        onClick={() => setterValue(i)}
                                    >
                                        {i == 0 ? "Problem" : i == 1 ? "Solution" : "Impact"}
                                    </div>
                                );
                            }
                            return contents;
                        })()}
                    </div>
                    <div
                        className="social-tile-details-board"
                        style={{
                            backgroundColor:
                                selectedValue == 0
                                    ? "#dcf1ff"
                                    : selectedValue == 1
                                        ? "#BCFFCF"
                                        : "#F3FE9D",
                        }}
                    >
                        <div className="social-item-contents">
                            {selectedValue == 0 ? (
                                <div className="contents-text-style">
                                    Paper documents can be easily misplaced, damaged, or
                                    destroyed, resulting in permanent loss of valuable
                                    information. Traditional certificate and document storage
                                    methods are prone to the risk of loss. This poses significant
                                    inconveniences, delays, and potential legal complications.
                                    Finding more secure storage solutions is crucial to mitigate
                                    these risks.
                                </div>
                            ) : selectedValue == 1 ? (
                                <div className="contents-text-style">
                                    Blockchain technology offers highly secure, transparent, and
                                    convenient storage solutions for certificates and documents.
                                    It empowers individuals with full control over their
                                    information, prevents forgery, eliminates the need for
                                    third-party intermediaries, ensures data integrity and
                                    accessibility, fosters trust in document and identity
                                    management, and promotes an environmentally friendly approach
                                    with zero paper usage.
                                </div>
                            ) : (
                                <div className="contents-text-style">
                                    Blockchain technology solutions effectively prevent fraud on
                                    documents and certificates. The immutable nature of blockchain
                                    records and the decentralized nature make it extremely
                                    difficult for malicious actors to tamper with or forge
                                    documents. This helps protect individuals from identity theft
                                    and safeguards the integrity of records. Blockchain
                                    contributes to a more secure and transparent society to
                                    individuals for validity of their personal and official
                                    records.
                                </div>
                            )}

                            {selectedValue == 0 ? (
                                <img src="/assets/images/Isolation_Mode.png"></img>
                            ) : selectedValue == 1 ? (
                                <img src="/assets/images/Illustration.png"></img>
                            ) : (
                                <img src="/assets/images/social-impact.png"></img>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlockchainSocial;
