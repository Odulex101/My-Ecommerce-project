import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h4>Your cart is empty</h4>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h4 className="mb-4">Your Cart</h4>

            {cart.map((item) => (
                <div
                    key={item.productId}
                    className="d-flex align-items-center justify-content-between border-bottom py-3"
                >
                    <div className="d-flex align-items-center gap-3">
                        <img
                            src={item.image}
                            alt={item.name}
                            width="70"
                        />
                        <div>
                            <p className="mb-1 fw-semibold">{item.name}</p>
                            <small>Qty: {item.quantity}</small>
                        </div>
                    </div>

                    <strong>{item.price}</strong>
                </div>
            ))}
        </div>
    );
};

export default Cart;
