// import { useState } from "react";
// import "../../index.css";

// const API_URL = "http://localhost:5000/api/auth";

// const LoginModal = ({ close }) => {
//     const [showShop, setShowShop] = useState(false);
//     const [step, setStep] = useState("email"); // email | code
//     const [email, setEmail] = useState("");
//     const [code, setCode] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     /* =============================== SEND CODE (for new users) ================================ */
//     const handleSendCodeOriginal = async () => {
//         try {
//             setLoading(true);
//             setError("");
//             const res = await fetch(`${API_URL}/send-code`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });
//             if (!res.ok) throw new Error("Unable to send verification code");
//             setStep("code");
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== DIRECT LOGIN / SEND CODE ================================ */
//     const handleContinue = async () => {
//         if (!email) return;
//         try {
//             setLoading(true);
//             setError("");

//             // 1. Check if email already exists in MongoDB
//             const res = await fetch(`${API_URL}/check-email`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });
//             const data = await res.json();

//             if (!res.ok) throw new Error(data.message || "Something went wrong");

//             if (data.exists) {
//                 // Email exists → log in directly
//                 localStorage.setItem("token", data.token);
//                 close();
//             } else {
//                 // Email doesn't exist → send verification code for registration
//                 await handleSendCodeOriginal();
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== VERIFY CODE ================================ */
//     const handleVerifyCode = async () => {
//         try {
//             setLoading(true);
//             setError("");
//             const res = await fetch(`${API_URL}/verify-code`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, code }),
//             });
//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Invalid code");

//             // Save JWT token and close modal
//             localStorage.setItem("token", data.token);
//             close();
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* =============================== SHOP LOGIN UI ================================ */
//     if (showShop) {
//         return (
//             <div className="login-overlay">
//                 <div className="shop-card">
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h5 className="fw-bold text-primary m-0">shop</h5>
//                         <small className="text-uppercase">GORAL</small>
//                     </div>

//                     {step === "email" && (
//                         <>
//                             <h4 className="text-center fw-semibold mb-1"> Sign in to Shop </h4>
//                             <p className="text-center text-muted mb-4"> Or create an account </p>
//                             <input
//                                 type="email"
//                                 className="form-control mb-3"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {error && <small className="text-danger d-block mb-2">{error}</small>}
//                             <button
//                                 className="btn btn-primary w-100"
//                                 disabled={!email || loading}
//                                 onClick={handleContinue}
//                             >
//                                 {loading ? "Processing..." : "Continue"}
//                             </button>
//                             <p className="small text-muted text-center">
//                                 By continuing, you agree to Shop’s <u>terms</u>, <u>privacy policy</u>, and sharing your
//                                 name and email with GORAL.
//                             </p>
//                         </>
//                     )}

//                     {step === "code" && (
//                         <>
//                             <h4 className="text-center fw-semibold mb-3"> Enter verification code </h4>
//                             <input
//                                 type="text"
//                                 className="form-control text-center mb-3"
//                                 placeholder="6-digit code"
//                                 maxLength="6"
//                                 value={code}
//                                 onChange={(e) => setCode(e.target.value)}
//                             />
//                             {error && <small className="text-danger d-block mb-2">{error}</small>}
//                             <button
//                                 className="btn btn-primary w-100"
//                                 disabled={code.length !== 6 || loading}
//                                 onClick={handleVerifyCode}
//                             >
//                                 {loading ? "Verifying..." : "Verify"}
//                             </button>
//                         </>
//                     )}
//                 </div>
//                 <button
//                     className="btn btn-link text-white mt-3"
//                     onClick={() => {
//                         setShowShop(false);
//                         setStep("email");
//                         setEmail("");
//                         setCode("");
//                         setError("");
//                     }}
//                 >
//                     Cancel
//                 </button>
//             </div>
//         );
//     }

//     /* =============================== DEFAULT LOGIN MODAL ================================ */
//     return (
//         <div
//             className="login-overlay"
//             onClick={(e) => {
//                 if (e.target === e.currentTarget) close();
//             }}
//         >
//             <div className="login-card">
//                 <div className="d-flex justify-content-between align-items-start mb-4">
//                     <div className="login-logo">Temorah</div>
//                     <div className="login-quote">
//                         “The only sneaker in the world that gets better with age”
//                     </div>
//                 </div>

//                 <h5 className="fw-bold mb-1">Sign in</h5>
//                 <p className="text-muted mb-4"> Sign in or create an account </p>

//                 {/* Shop Button */}
//                 <button
//                     className="btn bg-primary text-white w-100 mb-4"
//                     onClick={() => setShowShop(true)}
//                 >
//                     Sign in with shop
//                 </button>

//                 <div className="login-divider mb-4">
//                     <span>or</span>
//                 </div>

//                 {/* Email Input */}
//                 <input
//                     type="email"
//                     className="form-control login-input mb-4"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 {error && <small className="text-danger d-block mb-2">{error}</small>}

//                 <button
//                     className="btn w-100 login-continue"
//                     disabled={!email || loading}
//                     onClick={handleContinue}
//                 >
//                     {loading ? "Processing..." : "Continue"}
//                 </button>
//             </div>

//             {/* Footer */}
//             <div className="login-footer">
//                 <span>Privacy policy</span>
//                 <span>Terms of service</span>
//             </div>
//         </div>
//     );
// };

// export default LoginModal;


import { useState } from "react";
import "../../index.css";

const API_URL = "http://localhost:5000/api/auth";

const LoginModal = ({ close, navigate }) => {
    const [showShop, setShowShop] = useState(false);
    const [step, setStep] = useState("email"); // email | code
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [defaultStep, setDefaultStep] = useState("email");

    /* =============================== CHECK EMAIL / LOGIN ================================ */
    const handleContinue = async () => {
        if (!email) return;

        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/check-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");

            if (data.exists) {
                localStorage.setItem("token", data.token);
                close();
            } else {
                await handleSendCodeOriginal(setDefaultStep);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* =============================== SEND CODE (NEW USERS) ================================ */
    const handleSendCodeOriginal = async (setStepFunc = setStep) => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/send-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Unable to send verification code");

            setStep("code");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* =============================== CHECK EMAIL / LOGIN ================================ */
    const handleShopContinue = async () => {
        if (!email) return;

        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/check-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");

            if (data.exists) {
                // ✅ EXISTING USER → LOGIN
                localStorage.setItem("token", data.token);

                close();
            } else {
                // 🆕 NEW USER → SEND OTP
                await handleSendCodeOriginal(setStep);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* =============================== VERIFY CODE ================================ */
    const handleVerifyCode = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/verify-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Invalid code");

            // ✅ SAVE TOKEN
            localStorage.setItem("token", data.token);

            navigate("/profile");
            close();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* =============================== SHOP LOGIN UI ================================ */
    if (showShop) {
        return (
            <div className="login-overlay">
                <div className="shop-card">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold text-primary m-0">shop</h5>
                        <small className="text-uppercase">GORAL</small>
                    </div>

                    {step === "email" && (
                        <>
                            <h4 className="text-center fw-semibold mb-1">
                                Sign in to Shop
                            </h4>
                            <p className="text-center text-muted mb-4">
                                Or create an account
                            </p>

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {error && (
                                <small className="text-danger d-block mb-2">
                                    {error}
                                </small>
                            )}

                            <button
                                className="btn btn-primary w-100"
                                disabled={!email || loading}
                                onClick={handleShopContinue}
                            >
                                {loading ? "Processing..." : "Continue"}
                            </button>

                            <p className="small text-muted text-center">
                                By continuing, you agree to Shop’s <u>terms</u>,{" "}
                                <u>privacy policy</u>, and sharing your name and
                                email with GORAL.
                            </p>
                        </>
                    )}

                    {step === "code" && (
                        <>
                            <h4 className="text-center fw-semibold mb-3">
                                Enter verification code
                            </h4>

                            <input
                                type="text"
                                className="form-control text-center mb-3"
                                placeholder="6-digit code"
                                maxLength="6"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />

                            {error && (
                                <small className="text-danger d-block mb-2">
                                    {error}
                                </small>
                            )}

                            <button
                                className="btn btn-primary w-100"
                                disabled={code.length !== 6 || loading}
                                onClick={handleVerifyCode}
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                        </>
                    )}
                </div>

                <button
                    className="btn btn-link text-white mt-3"
                    onClick={() => {
                        setShowShop(false);
                        setStep("email");
                        setEmail("");
                        setCode("");
                        setError("");
                        setDefaultStep("email");
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    }

    /* =============================== DEFAULT LOGIN MODAL ================================ */
    return (
        <div
            className="login-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) close();
            }}
        >
            <div className="login-card">
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="login-logo">Temorah</div>
                    <div className="login-quote">
                        “The only sneaker in the world that gets better with age”
                    </div>
                </div>

                <h5 className="fw-bold mb-1">Sign in</h5>
                <p className="text-muted mb-4">
                    Sign in or create an account
                </p>

                <button
                    className="btn bg-primary text-white w-100 mb-4"
                    onClick={() => setShowShop(true)}
                >
                    Sign in with shop
                </button>

                <div className="login-divider mb-4">
                    <span>or</span>
                </div>

                {defaultStep === "email" ? (
                    <>
                        <input
                            type="email"
                            className="form-control login-input mb-4"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {error && (
                            <small className="text-danger d-block mb-2">
                                {error}
                            </small>
                        )}

                        <button
                            className="btn w-100 login-continue"
                            disabled={!email || loading}
                            onClick={handleContinue}
                        >
                            {loading ? "Processing..." : "Continue"}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            className="form-control login-input mb-4"
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        {error && (
                            <small className="text-danger d-block mb-2">
                                {error}
                            </small>
                        )}

                        <button
                            className="btn w-100 login-continue"
                            disabled={!code || loading}
                            onClick={handleVerifyCode}
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </>
                )}
            </div>

            <div className="login-footer">
                <span>Privacy policy</span>
                <span>Terms of service</span>
            </div>
        </div>
    );
};

export default LoginModal;





