import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";

const Profile = () => {
    const [form, setForm] = useState({
        fullName: "",
        dateOfBirth: "",
    });

    useEffect(() => {
        fetch("http://localhost:5002/api/users/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setForm({
                    fullName: data.fullName || "",
                    dateOfBirth: data.dateOfBirth
                        ? data.dateOfBirth.split("T")[0]
                        : "",
                });
            });
    }, []);

    const saveProfile = async () => {
        await fetch("http://localhost:5002/api/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(form),
        });

        alert("Profile updated successfully");
    };

    return (
        <>
            <DashboardHeader />

            <div className="container my-5" style={{ maxWidth: "500px" }}>
                <h3 className="mb-4">{form.fullName ? "Profile" : "Complete Your Profile"}</h3>

                <label className="form-label">Full Name</label>
                <input
                    className="form-control mb-3"
                    value={form.fullName}
                    onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                    }
                />

                <label className="form-label">Date of Birth</label>
                <input
                    type="date"
                    className="form-control mb-4"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                        setForm({ ...form, dateOfBirth: e.target.value })
                    }
                />

                <button className="btn btn-dark w-100" onClick={saveProfile}>
                    Save Profile
                </button>
            </div>
        </>
    );
};

export default Profile;


