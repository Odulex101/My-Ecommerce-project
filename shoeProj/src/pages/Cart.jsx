// import { useCart } from "../context/CartContext";

// const Cart = () => {
//     const { cart, conversionRate } = useCart();

//     if (cart.length === 0) {
//         return (
//             <div className="container mt-5 text-center">
//                 <h4>Your cart is empty</h4>
//             </div>
//         );
//     }

//     return (
//         <div className="container mt-5">
//             <h4 className="mb-4">Your Cart</h4>

//             {cart.map(item => (
//                 <div
//                     key={item.productId}
//                     className="d-flex justify-content-between align-items-center border-bottom py-3"
//                 >
//                     <div className="d-flex align-items-center gap-3">
//                         <img src={item.image} alt={item.name} width="70" />
//                         <div>
//                             <p className="mb-1 fw-semibold">{item.name}</p>
//                             <small>Qty: {item.quantity}</small>
//                         </div>
//                     </div>

//                     <strong>
//                         ₦{(item.price * item.quantity * conversionRate).toLocaleString()}
//                     </strong>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Cart;


import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, conversionRate } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();

    // 🔒 BLOCK UNAUTHENTICATED ACCESS
    if (!token) {
        navigate("/login", { state: { from: "/cart" } });
        return null;
    }

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h4>Your cart is empty</h4>
            </div>
        );
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity * conversionRate,
        0
    );

    return (
        <div className="container mt-5">
            <h4 className="mb-4">Your Cart</h4>

            {cart.map(item => (
                <div
                    key={item.productId}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                >
                    <div className="d-flex align-items-center gap-3">
                        <img src={item.image} alt={item.name} width="70" />
                        <div>
                            <p className="mb-1 fw-semibold">{item.name}</p>
                            <small>Qty: {item.quantity}</small>
                        </div>
                    </div>

                    <strong>
                        ₦{(item.price * item.quantity * conversionRate).toLocaleString()}
                    </strong>
                </div>
            ))}

            {/* TOTAL + CHECKOUT */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h5>Total</h5>
                <h5>₦{total.toLocaleString()}</h5>
            </div>

            <button
                className="btn btn-dark w-100 mt-4"
                onClick={() => navigate("/checkout")}
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default Cart;


