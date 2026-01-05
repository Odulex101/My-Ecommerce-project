// import React, { useState } from "react";
// import { FaSearch, FaUser } from "react-icons/fa";
// import LoginModal from "./Login/LoginModal";

// export default function TopBar() {
//   const [showModal, setShowModal] = useState(false);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   return (
//     <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
//       {/* Search */}
//       <FaSearch size={18} className="text-dark" style={{ cursor: "pointer" }} />

//       {/* FREE SHIPPING TEXT */}
//       <span className="text-uppercase small fw-semibold">
//         FREE SHIPPING WORLDWIDE
//       </span>

//       {/* Login */}
//       <div className="d-flex align-items-center gap-2">
//         <FaUser size={18} />
//         <button
//           className="btn btn-outline-dark"
//           onClick={handleShow}
//         >
//           Login
//         </button>

//         <LoginModal show={showModal} onClose={handleClose} />
//       </div>
//     </div>
//   );
// }



