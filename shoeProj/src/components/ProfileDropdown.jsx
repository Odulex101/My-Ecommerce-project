import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail") || "user@email.com";

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="position-relative">
            <button
                className="btn btn-light rounded-circle"
                onClick={() => setOpen(!open)}
            >
                <FaUserCircle size={22} />
            </button>

            {open && (
                <div
                    className="position-absolute end-0 mt-2 bg-white shadow rounded"
                    style={{ width: 240, zIndex: 1000 }}
                >
                    <div className="p-3 border-bottom">
                        <small className="text-muted">{email}</small>
                    </div>

                    <button
                        className="dropdown-item py-2"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </button>

                    <button
                        className="dropdown-item py-2"
                        onClick={() => navigate("/settings")}
                    >
                        Settings
                    </button>

                    <button
                        className="dropdown-item py-2 text-danger"
                        onClick={logout}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

