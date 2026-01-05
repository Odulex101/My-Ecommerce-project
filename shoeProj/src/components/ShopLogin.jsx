import "../../index.css";

const ShopLogin = ({ close }) => {
    return (
        <div className="login-overlay">
            <div className="shop-card">

                {/* TOP BAR */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold text-primary m-0">shop</h5>
                    <small className="text-uppercase">TEMORAH DESIGNS</small>
                </div>

                {/* CONTENT */}
                <h4 className="text-center fw-semibold mb-1">Sign in to Shop</h4>
                <p className="text-center text-muted mb-4">
                    Or create an account
                </p>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter your email"
                />

                <button className="btn btn-primary w-100 mb-3">
                    Continue
                </button>

                <p className="small text-muted text-center">
                    By continuing, you agree to Shop’s{" "}
                    <u>terms</u>, <u>privacy policy</u>, and sharing your
                    name and email with TEMORAH.
                </p>
            </div>

            {/* CANCEL */}
            <button className="btn btn-link mt-3" onClick={close}>
                Cancel
            </button>
        </div>
    );
};

export default ShopLogin;
