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
                setError("Email not registered. Please sign in with Shop.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* =============================== SEND CODE (REGISTERED ONLY) ================================ */
    const handleSendCodeOriginal = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/send-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Unable to send code");

            setStep("code");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* =============================== SHOP REGISTRATION FLOW ================================ */
    const handleShopContinue = async () => {
        if (!email) return;

        try {
            setLoading(true);
            setError("");

            // 1️⃣ TRY TO REGISTER (INTENT)
            const registerRes = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const registerData = await registerRes.json();

            // 2️⃣ IF ALREADY REGISTERED → CHECK LOGIN
            if (!registerRes.ok) {
                if (registerData.message === "Email already registered") {
                    const res = await fetch(`${API_URL}/check-email`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                    });

                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message);

                    if (data.exists) {
                        localStorage.setItem("token", data.token);
                        close();
                        return;
                    }

                    // Registered but not verified → send OTP
                    await handleSendCodeOriginal();
                    return;
                }

                throw new Error(registerData.message);
            }

            // 3️⃣ NEW REGISTRATION → SEND OTP
            await handleSendCodeOriginal();

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
                        <h5 className="fw-bold text-primary m-0">shop with TEMORAH</h5>
                        <small className="text-uppercase">TEMORAH</small>
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
            </div>
        </div>
    );
};

export default LoginModal;






