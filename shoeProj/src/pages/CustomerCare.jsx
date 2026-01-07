import { useState } from "react";
import axios from "axios";
import ShopNavBar from "../components/Shop/ShopNavBar";

const CustomerCare = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/customer-care", form);
            setStatus("Message sent successfully!");
        } catch (err) {
            console.log(err);
            setStatus("Failed to send message");
        }
    };


    return (
        <>
            {/* 🔴 NAVBAR ALWAYS ON TOP */}
            <ShopNavBar />

            {/* 🟢 PAGE CONTENT BELOW */}
            <div className="container py-5">

                <h3 className="mb-4">Customer Care</h3>

                <p>
                    I'm a paragraph. Click here to add your own text and edit me.
                    It’s easy. Just click “Edit Text”.
                </p>

                <div className="row mt-5">
                    <div className="col-md-4">
                        <h5>Have questions?</h5>
                        <p>We’re here to help.</p>
                        <p>+2348068140632</p>
                        <p>odusolaayomikun@gmail.com</p>
                    </div>

                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col">
                                    <label>First Name *</label>
                                    <input name="firstName" className="form-control" required onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label>Last Name *</label>
                                    <input name="lastName" className="form-control" required onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Email *</label>
                                    <input type="email" name="email" className="form-control" required onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <label>Subject</label>
                                    <input name="subject" className="form-control" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="mt-3">
                                <label>Message</label>
                                <textarea name="message" className="form-control" rows="4" onChange={handleChange}></textarea>
                            </div>

                            <button className="btn btn-dark mt-3" type="submit">Submit</button>

                            {status && <p className="mt-2">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerCare;

