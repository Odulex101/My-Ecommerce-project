// import { Link, useLocation } from "react-router-dom";
// import ProfileDropdown from "./ProfileDropdown";

// const DashboardHeader = () => {
//     const location = useLocation();

//     return (
//         <nav className="border-bottom bg-white">
//             <div className="container-fluid py-3 d-flex justify-content-between align-items-center">
//                 {/* LEFT */}
//                 <div className="d-flex align-items-center gap-4">
//                     <img src="/logo.png" alt="GORAL" style={{ height: 28 }} />

//                     <Link
//                         to="/"
//                         className={`text-decoration-none ${location.pathname === "/" ? "fw-bold" : "text-dark"
//                             }`}
//                     >
//                         Shop
//                     </Link>

//                     <Link
//                         to="/orders"
//                         className={`text-decoration-none ${location.pathname === "/orders"
//                                 ? "fw-bold text-primary"
//                                 : "text-dark"
//                             }`}
//                     >
//                         Orders
//                     </Link>
//                 </div>

//                 {/* RIGHT */}
//                 <ProfileDropdown />
//             </div>
//         </nav>
//     );
// };

// export default DashboardHeader;

import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const DashboardHeader = () => {
    const location = useLocation();

    return (
        <nav className="border-bottom bg-white">
            <div className="container-fluid py-3 d-flex justify-content-between align-items-center">
                {/* LEFT */}
                <div className="d-flex align-items-center gap-4">
                    <img src="/logo.png" alt="GORAL" style={{ height: 28 }} />

                    <Link
                        to="/shop"
                        className={`text-decoration-none ${location.pathname === "/shop"
                                ? "fw-bold text-primary"
                                : "text-dark"
                            }`}
                    >
                        Shop
                    </Link>

                    <Link
                        to="/orders"
                        className={`text-decoration-none ${location.pathname === "/orders"
                                ? "fw-bold text-primary"
                                : "text-dark"
                            }`}
                    >
                        Orders
                    </Link>
                </div>

                {/* RIGHT */}
                <ProfileDropdown />
            </div>
        </nav>
    );
};

export default DashboardHeader;



