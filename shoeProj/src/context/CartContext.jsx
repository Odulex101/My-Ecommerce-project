import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const conversionRate = 950;

    // FETCH CART
    useEffect(() => {
        if (!token) return;

        axios
            .get("http://localhost:5000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => setCart(res.data.items || []))
            .catch(err => console.error("FETCH CART ERROR:", err));
    }, [token]);

    // ADD TO CART (🔥 FIXED)
    const addToCart = async (product) => {
        if (!token) return;

        // ✅ GUARANTEE PRICE
        const rawPrice =
            product.price?.amount ??
            product.price ??
            product.cost;

        if (rawPrice == null) {
            console.error("PRICE NOT FOUND IN PRODUCT:", product);
            return;
        }

        const cleanPrice =
            typeof rawPrice === "string"
                ? Number(rawPrice.replace(/[^\d]/g, ""))
                : Number(rawPrice);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/cart/add",
                {
                    product: {
                        productId: Number(product.id),
                        name: product.name,
                        price: cleanPrice,
                        image: product.images?.[0],
                    },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCart(res.data.items || []);
            setIsCartOpen(true);
        } catch (err) {
            console.error("ADD TO CART FAILED:", err.response?.data || err.message);
        }
    };

    // REMOVE ITEM
    const removeFromCart = async (productId) => {
        if (!token) return;

        try {
            const res = await axios.delete(
                `http://localhost:5000/api/cart/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data.items || []);
        } catch (err) {
            console.error("REMOVE FROM CART FAILED:", err.response?.data || err.message);
        }
    };

    // UPDATE QUANTITY
    const updateQuantity = async (productId, quantity) => {
        if (!token || quantity < 1) return;

        try {
            const res = await axios.put(
                "http://localhost:5000/api/cart/update",
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data.items || []);
        } catch (err) {
            console.error("UPDATE QUANTITY FAILED:", err.response?.data || err.message);
        }
    };

    // TOTAL PRICE
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity * conversionRate,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                isCartOpen,
                setIsCartOpen,
                totalPrice,
                conversionRate,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);










