// import { FaHeart, FaShoppingBag } from "react-icons/fa";

// const ShopNavBar = () => {
//     return (
//         <div className="bg-dark text-white py-3">
//             <div className="container d-flex justify-content-between align-items-center">
//                 <div className="d-flex gap-4">
//                     <span>Best Sellers</span>
//                     <span>Customer Care</span>
//                     <span>Stores</span>
//                 </div>

//                 <h4 className="m-0">
//                     TEMORAH <span className="text-info">DESIGNS</span>
//                 </h4>

//                 <div className="d-flex gap-3">
//                     <FaHeart />
//                     <FaShoppingBag />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShopNavBar;

import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBestSeller } from "../../context/BestSellerContext";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../cart/CartDrawer";


const ShopNavBar = () => {
    const navigate = useNavigate();
    const { setShowBestSellers } = useBestSeller();
    const { cart, isCartOpen, setIsCartOpen } = useCart();

    const cartCount = (cart || []).reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <>
            <div className="bg-dark text-white py-3 sticky-top">
                <div className="container d-flex justify-content-between align-items-center">

                    {/* Left menu */}
                    <div className="d-flex gap-4">
                        <span
                            role="button"
                            onClick={() => setShowBestSellers(true)}
                            className="cursor-pointer"
                        >
                            Best Sellers
                        </span>
                        <span>Customer Care</span>
                        <span>Stores</span>
                    </div>

                    {/* Brand */}
                    <h4 className="m-0">
                        TEMORAH <span className="text-info">DESIGNS</span>
                    </h4>

                    {/* Icons */}
                    <div className="d-flex gap-3 align-items-center">
                        <FaHeart />

                        <div
                            role="button"
                            onClick={() => setIsCartOpen(true)}
                            className="position-relative"
                        >
                            <FaShoppingBag size={18} />

                            {cartCount > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: "0.6rem" }}
                                >
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Cart Drawer */}
            {isCartOpen && <CartDrawer />}
        </>
    );
};

export default ShopNavBar;





