import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/DashboardHeader";

const Orders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/orders", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => setOrders(res.data))
            .catch(err => console.error("Failed to fetch orders:", err));
    }, [token]);

    return (
        <>
            <DashboardHeader />
            <div className="container my-5">
                <h2 className="mb-4">Orders</h2>

                {orders.length === 0 && <p>No orders yet</p>}

                {orders.map(order => (
                    <div key={order._id} className="card mb-3">
                        <div className="card-body">
                            {order.items.map(item => (
                                <div key={item.productId} className="d-flex gap-3 mb-2">
                                    <img src={item.image} width="60" alt={item.name} />
                                    <div>
                                        <p className="mb-0">{item.name}</p>
                                        <small>Qty: {item.quantity}</small>
                                    </div>
                                </div>
                            ))}
                            <strong>Total: ₦{order.totalAmount.toLocaleString()}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Orders;




