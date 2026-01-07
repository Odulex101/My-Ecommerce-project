import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart, totalPrice } = useCart();
    const { token, user } = useAuth();
    const navigate = useNavigate();

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
        });

    const startDate = new Date();
    const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const pickupStations = [
        "Ikeja Pickup Hub",
        "Lekki Phase 1 Station",
        "Yaba Collection Point",
        "Abuja Central Hub",
    ];

    const [delivery, setDelivery] = useState({
        fullName: "",
        address: "",
        phone: "",
        pickupStation: "",
    });

    const confirmOrder = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/orders",
                {
                    delivery,
                    paymentMethod: "Pay on Delivery (Bank Transfer)",
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            navigate("/orders");
        } catch (error) {
            console.error("CONFIRM ORDER ERROR:", error.response?.data);
        }
    };

    return (
        <div className="container my-4">
            <h5>Checkout</h5>

            <div className="card mb-3">
                <div className="card-body">
                    <h6>Delivery</h6>
                    <p>
                        Delivery between{" "}
                        <strong>{formatDate(startDate)}</strong> and{" "}
                        <strong>{formatDate(endDate)}</strong>
                    </p>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <h6>Pickup Station</h6>
                    <select
                        className="form-select"
                        value={delivery.pickupStation}
                        onChange={(e) =>
                            setDelivery({ ...delivery, pickupStation: e.target.value })
                        }
                    >
                        <option value="">Select Pickup Station</option>
                        {pickupStations.map((station) => (
                            <option key={station} value={station}>
                                {station}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <h6>Delivery Info</h6>

                    <input
                        className="form-control mb-2"
                        placeholder="Full Name"
                        onChange={(e) =>
                            setDelivery({ ...delivery, fullName: e.target.value })
                        }
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Address"
                        onChange={(e) =>
                            setDelivery({ ...delivery, address: e.target.value })
                        }
                    />

                    <input
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={(e) =>
                            setDelivery({ ...delivery, phone: e.target.value })
                        }
                    />
                </div>
            </div>

            <button
                className="btn btn-warning w-100"
                disabled={!delivery.pickupStation}
                onClick={confirmOrder}
            >
                CONFIRM ORDER
            </button>
        </div>
    );
};

export default Checkout;



