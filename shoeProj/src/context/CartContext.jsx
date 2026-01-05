// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const { token } = useAuth();
//     const [cart, setCart] = useState([]); // always an array
//     const [isCartOpen, setIsCartOpen] = useState(false);

//     const conversionRate = 950; // Naira

//     // Fetch cart from backend
//     useEffect(() => {
//         if (!token) return;

//         axios
//             .get("http://localhost:5000/api/cart", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then(res => setCart(res.data.items || []))
//             .catch(err => console.error("FETCH CART ERROR:", err));
//     }, [token]);

//     // Add item to cart
//     const addToCart = async (product) => {
//         if (!token) return;

//         try {
//             const res = await axios.post(
//                 "http://localhost:5000/api/cart/add",
//                 {
//                     product: {
//                         productId: Number(product.id),
//                         name: product.name,
//                         price: Number(product.price), // MUST be number
//                         image: product.images?.[0],
//                         quantity: 1,
//                     },
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setCart(res.data.items || []);
//             setIsCartOpen(true); // open cart when item is added
//         } catch (err) {
//             console.error("ADD TO CART FAILED:", err.response?.data || err.message);
//         }
//     };

//     // Remove item from cart
//     const removeFromCart = async (productId) => {
//         if (!token) return;

//         try {
//             const res = await axios.delete(
//                 `http://localhost:5000/api/cart/${productId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCart(res.data.items || []);
//         } catch (err) {
//             console.error("REMOVE FROM CART FAILED:", err.response?.data || err.message);
//         }
//     };

//     // Update quantity
//     const updateQuantity = async (productId, quantity) => {
//         if (!token || quantity < 1) return;

//         try {
//             const res = await axios.put(
//                 "http://localhost:5000/api/cart/update",
//                 { productId, quantity },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCart(res.data.items || []);
//         } catch (err) {
//             console.error("UPDATE QUANTITY FAILED:", err.response?.data || err.message);
//         }
//     };

//     // Calculate total price in Naira
//     const totalPrice = cart.reduce(
//         (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1) * conversionRate,
//         0
//     );

//     return (
//         <CartContext.Provider
//             value={{
//                 cart,
//                 addToCart,
//                 removeFromCart,
//                 updateQuantity,
//                 isCartOpen,
//                 setIsCartOpen,
//                 totalPrice, // ✅ added
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);



import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const conversionRate = 950;

    useEffect(() => {
        if (!token) return;

        axios
            .get("http://localhost:5000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setCart(res.data.items || []))
            .catch((err) => console.error("FETCH CART ERROR:", err));
    }, [token]);

    // Add item to cart
    const addToCart = async (product) => {
        if (!token) return;

        try {
            const res = await axios.post(
                "http://localhost:5000/api/cart/add",
                {
                    product: {
                        productId: Number(product.id),
                        name: product.name,
                        price: Number(product.price),
                        image: product.images?.[0],
                        quantity: 1,
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

    
    const removeFromCart = async (productId) => {
        if (!token) return;

        try {
            const res = await axios.delete(
                `http://localhost:5000/api/cart/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(res.data.items || []);
        } catch (err) {
            console.error(
                "REMOVE FROM CART FAILED:",
                err.response?.data || err.message
            );
        }
    };

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
            console.error(
                "UPDATE QUANTITY FAILED:",
                err.response?.data || err.message
            );
        }
    };

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









