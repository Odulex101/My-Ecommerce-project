// import React from "react";
// import "./Footer.css";
// import { FaFacebookF, FaTwitter, FaPinterestP, FaTiktok, FaInstagram } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//     const navigate = useNavigate();

//     return (
//         <footer className="bg-footer text-light pt-5">
//             <div className="container-fluid px-4 px-md-5">
//                 <div className="row gy-5">

//                     {/* BRAND + STORE */}
//                     <div className="col-12 col-md-4 col-lg-3">
//                         <h5 className="fw-bold mb-4">TEMORAH DESIGN</h5>

//                         <h6 className="text-uppercase fw-semibold mb-3">Our Store</h6>
//                         <ul className="list-unstyled footer-links">
//                             <li
//                                 role="button"
//                                 className="cursor-pointer"
//                                 onClick={() => navigate("/shop")}
//                             >
//                                 Shop
//                             </li>
//                             <li>Customer Care</li>
//                             <li>Stores</li>
//                         </ul>

//                         <h6 className="text-uppercase fw-semibold mt-4 mb-2">
//                             Need Assistance?
//                         </h6>
//                         <p className="mb-1">123-456-7890</p>
//                         <p className="mb-0">info@mysite.com</p>
//                     </div>

//                     {/* TERMS */}
//                     <div className="col-12 col-md-4 col-lg-3">
//                         <h6 className="text-uppercase fw-semibold mb-3">Terms & Conditions</h6>
//                         <ul className="list-unstyled footer-links footer-underline">
//                             <li>Terms & Conditions</li>
//                             <li>Privacy Policy</li>
//                             <li>Shipping Policy</li>
//                             <li>Refund Policy</li>
//                             <li>Accessibility Statement</li>
//                         </ul>
//                     </div>

//                     {/* SOCIAL */}
//                     <div className="col-12 col-md-4 col-lg-3">
//                         <h6 className="text-uppercase fw-semibold mb-3">Stay Connected</h6>
//                         <div className="d-flex gap-3 footer-social">
//                             <FaFacebookF />
//                             <FaTwitter />
//                             <FaPinterestP />
//                             <FaTiktok />
//                             <FaInstagram />
//                         </div>
//                     </div>

//                     {/* NEWSLETTER */}
//                     <div className="col-12 col-lg-3">
//                         <h6 className="text-uppercase fw-semibold mb-3">Be Our Friend</h6>

//                         <input
//                             type="email"
//                             className="form-control footer-input mb-3"
//                             placeholder="Enter Your Email Here *"
//                         />

//                         <div className="form-check mb-3">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="newsletter"
//                             />
//                             <label
//                                 className="form-check-label small"
//                                 htmlFor="newsletter"
//                             >
//                                 Yes, subscribe me to your newsletter.
//                             </label>
//                         </div>

//                         <button className="btn footer-btn w-100">Subscribe Now</button>
//                     </div>

//                 </div>

//                 {/* BOTTOM */}
//                 <div className="text-center border-top mt-5 py-3 small">
//                     © 2035 by TEMORAH DESIGN. Powered and secured by ODULEX
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaPinterestP, FaTiktok, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-footer text-light pt-5">
            <div className="container-fluid px-4 px-md-5">
                <div className="row gy-5">

                    {/* BRAND + STORE */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <h5 className="fw-bold mb-4">TEMORAH DESIGN</h5>

                        <h6 className="text-uppercase fw-semibold mb-3">Our Store</h6>
                        <ul className="list-unstyled footer-links">
                            <li
                                role="button"
                                className="cursor-pointer"
                                onClick={() => navigate("/shop")}
                            >
                                Shop
                            </li>
                            <li
                                role="button"
                                className="cursor-pointer"
                                onClick={() => {
                                    const token = localStorage.getItem("token");
                                    if (token) {
                                        navigate("/customer-care");
                                    } else {
                                        navigate("/"); // redirect to login / home
                                    }
                                }}
                            >
                                Customer Care
                            </li>
                            <li
                                role="button"
                                className="cursor-pointer"
                                onClick={() => navigate("/stores")}
                            >
                                Stores
                            </li>
                        </ul>

                        <h6 className="text-uppercase fw-semibold mt-4 mb-2">
                            Need Assistance?
                        </h6>
                        <p className="mb-1">+2348068140632</p>
                        <p className="mb-0">odusolaayomikun@gmail.com</p>
                    </div>

                    {/* TERMS */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <h6 className="text-uppercase fw-semibold mb-3">Terms & Conditions</h6>
                        <ul className="list-unstyled footer-links footer-underline">
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Shipping Policy</li>
                            <li>Refund Policy</li>
                            <li>Accessibility Statement</li>
                        </ul>
                    </div>

                    {/* SOCIAL */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <h6 className="text-uppercase fw-semibold mb-3">Stay Connected</h6>
                        <div className="d-flex gap-3 footer-social">
                            <FaFacebookF />
                            <FaTwitter />
                            <FaPinterestP />
                            <FaTiktok />
                            <FaInstagram />
                        </div>
                    </div>

                    {/* NEWSLETTER */}
                    <div className="col-12 col-lg-3">
                        <h6 className="text-uppercase fw-semibold mb-3">Be Our Friend</h6>

                        <input
                            type="email"
                            className="form-control footer-input mb-3"
                            placeholder="Enter Your Email Here *"
                        />

                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="newsletter"
                            />
                            <label
                                className="form-check-label small"
                                htmlFor="newsletter"
                            >
                                Yes, subscribe me to your newsletter.
                            </label>
                        </div>

                        <button className="btn footer-btn w-100">Subscribe Now</button>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="text-center border-top mt-5 py-3 small">
                    © 2035 by TEMORAH DESIGN. Powered and secured by ODULEX
                </div>
            </div>
        </footer>
    );
};

export default Footer;


