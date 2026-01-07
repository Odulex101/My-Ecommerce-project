import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => setOrders(res.data));
    }, [token]);

    return (
        <div className="container my-5">
            <h2>Admin Orders</h2>

            {orders.map(order => (
                <div key={order._id} className="card mb-3">
                    <div className="card-body">
                        <p>User: {order.userId.email}</p>
                        <p>Status: {order.status}</p>
                        <p>Total: ₦{order.totalAmount.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;
