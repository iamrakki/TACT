import React, { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import './Faq.css';

const Faq = () => {
    const [active, setActive] = useState({});
    const questions = [
        {
            id: 1,
            question: "What is a blockchain-based secure proof digital certificates and documents storage system along with AI technology?",
            answer: "It's a system of blockchain for secure, tamper-proof storage of digital certificates and documents. Additionally, the AI-powered generator automates certificate template creation, simplifying design and customization.",
        },
        {
            id: 2,
            question: "How does blockchain enhance the security of digital certificates and documents?",
            answer:
                "Blockchain's immutability prevents unauthorized changes and ensures document security."
        },
        {
            id: 3,
            question: "Explain issuing and verifying digital certificates in this system.",
            answer:
                "Certificates are issued, stored on the blockchain, and verified by comparing hashes."
        },
        {
            id: 4,
            question: "What benefits does blockchain offer for storing certificates and documents?",
            answer:
                "It provides an unchangeable record, simplifies verification, and ensures long-term access."
        },
        {
            id: 5,
            question: "Are digital certificates stored indefinitely on the blockchain?",
            answer:
                "Yes, they become a permanent part of the blockchain's history."
        },
        {
            id: 6,
            question: "How is data privacy maintained within this system?",
            answer:
                "Confidential data is encrypted, and access permissions are controlled."
        },
        {
            id: 7,
            question: "Can blockchain-based documents be accepted legally?",
            answer:
                "Yes, the blockchain's tamper-proof nature often enhances legal acceptance."
        },
        {
            id: 8,
            question: "What happens if a user loses access to their blockchain-stored documents?",
            answer:
                "Decentralized recovery mechanisms can help users regain access."
        },
        {
            id: 9,
            question: "Can multiple parties collaborate on a single document securely?",
            answer:
                "No, You can share the details and copy of documents but collaboration is not allowed for security purpose as of now."
        },
        {
            id: 10,
            question: "What types of institutions or industries can benefit from this technology?",
            answer:
                "Educational institutions, professional certification bodies, healthcare organizations, legal firms, and any entity dealing with sensitive records can benefit from this technology."
        }
    ];

    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            ref.style.maxHeight = active[index] ? `${ref.scrollHeight}px` : "0px";
        });
    }, [active]);

    const toggleAccordion = (index) => {
        setActive((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    return (
        <section>
            <div className="mb-5">
                <div className="faq">
                    <h1 className="titleOfCentral py-4">FAQ</h1>
                    {questions.map((qa, index) => (
                        <div key={qa.id}>
                            <button
                                className={`question-section question-${qa.id} ${active[index] ? "active" : ""
                                    }`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <div>
                                    <div className="question-align">
                                        <h4 className="question-style">{qa.question}</h4>
                                        <FiPlus
                                            className={active[index] ? "question-icon rotate" : "question-icon"}
                                            size={28}
                                        />
                                    </div>
                                    <div
                                        ref={(el) => (contentRefs.current[index] = el)}
                                        className={active[index] ? "answer answer-divider" : "answer"}
                                    >
                                        <p>{qa.answer}</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;