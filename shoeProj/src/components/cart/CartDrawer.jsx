import { useCart } from "../../context/CartContext";
import "./Cart.css";

const CartDrawer = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        totalPrice,
        conversionRate,
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="cart-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">MY CART</h5>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setIsCartOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                { }
                {cart.length === 0 && (
                    <p className="text-center mt-4">Your cart is empty</p>
                )}

                { }
                {cart.map((item) => (
                    <div key={item.productId} className="cart-item d-flex mb-3">
                        <img src={item.image} alt={item.name} className="cart-image" />

                        <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1">{item.name}</h6>

                            <p className="mb-1 text-muted">
                                ₦{(item.price * conversionRate).toLocaleString()}
                            </p>

                            <div className="d-flex align-items-center mb-2">
                                <button
                                    className="btn btn-sm btn-outline-secondary me-2"
                                    onClick={() =>
                                        updateQuantity(item.productId, item.quantity - 1)
                                    }
                                    disabled={item.quantity === 1}
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="btn btn-sm btn-outline-secondary ms-2"
                                    onClick={() =>
                                        updateQuantity(item.productId, item.quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFromCart(item.productId)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="cart-footer mt-4">
                        <div className="d-flex justify-content-between fw-semibold mb-3">
                            <span>Total</span>
                            <span>₦{totalPrice.toLocaleString()}</span>
                        </div>

                        <button
                            className="btn btn-dark w-100"
                            onClick={() => window.location.href = "/checkout"}
                        >
                            CHECKOUT
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;








