import { useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SearchResults from "./SearchResults";
import { useSearch } from "../context/SearchContext";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { searchTerm, setSearchTerm, showResults, setShowResults } = useSearch();
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("token");

    if (isLoggedIn) {
        return (
            <div className="bg-dark text-white py-2 sticky-top">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <img src="/logo.png" alt="Temorah Designs" style={{ height: "30px" }} />
                        <span className="fs-5 fw-semibold">TEMORAH <span className="text-info">DESIGNS</span></span>
                    </div>
                    <ProfileDropdown />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="sticky-top header-wrapper">
                <div className="border-bottom bg-white">
                    <div className="container-fluid py-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <div className="d-flex align-items-center gap-2 position-relative">
                            <FaSearch />
                            <input
                                type="text"
                                className="border-0"
                                placeholder="Search products..."
                                style={{ outline: "none", minWidth: "180px" }}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowResults(true);
                                }}
                            />
                            {showResults && searchTerm && (
                                <SearchResults
                                    searchTerm={searchTerm}
                                    close={() => setShowResults(false)}
                                />
                            )}
                        </div>

                        <small className="text-uppercase fw-semibold d-none d-md-block">
                            Free Shipping Worldwide
                        </small>

                        <div
                            className="d-flex align-items-center gap-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowLogin(true)}
                        >
                            <FaUser />
                            <span>Log In</span>
                        </div>
                    </div>
                </div>

                <div className="bg-dark text-white">
                    <div className="container-fluid py-3 d-flex align-items-center flex-wrap">
                        <ul className="list-unstyled d-flex gap-4 mb-0">
                            <li>Shop</li>
                            <li>Customer Care</li>
                            <li>Stores</li>
                        </ul>

                        <div className="mx-auto d-flex align-items-center gap-2 brand-logo">
                            <img src="/logo.png" alt="Temorah Designs" className="brand-logo-img" />
                            <span className="fs-4 fw-semibold text-light">
                                TEMORAH <span className="text-info">DESIGNS</span>
                            </span>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                            <FaHeart />
                            <div className="position-relative">
                                <FaShoppingBag />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark">
                                    0
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showLogin && <LoginModal close={() => setShowLogin(false)} navigate={navigate} />}
        </>
    );
};

export default Header;





