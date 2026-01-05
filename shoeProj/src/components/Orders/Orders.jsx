// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// export default function Orders() {
//     const { user } = useContext(AuthContext);
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         if (user) {
//             axios
//                 .get(`http://localhost:5000/api/orders?email=${user.email}`)
//                 .then(res => setOrders(res.data));
//         }
//     }, [user]);

//     if (!user) return null;

//     return (
//         <div className="container mt-4">
//             <h3>Orders</h3>

//             {orders.length === 0 ? (
//                 <div className="alert alert-light text-center">
//                     <p className="fw-semibold">No orders yet</p>
//                     <small>Go to store to place an order.</small>
//                 </div>
//             ) : (
//                 orders.map(order => (
//                     <div key={order._id} className="card mb-2 p-3">
//                         <h6>{order.product.name}</h6>
//                         <p>₦{order.product.price}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

