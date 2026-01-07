import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";
import CustomerReviews from "./CustomerReviews";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === Number(id));

    const [size, setSize] = useState(38);
    const [qty, setQty] = useState(1);
    const [openSection, setOpenSection] = useState("info");

    if (!product) {
        return <div className="container mt-5">Product not found</div>;
    }

    const priceNumber = Number(product.price.replace(/[^\d]/g, ""));
    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(product.name);

    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: priceNumber,
            quantity: qty,
            selectedSize: size
        });
    };

    return (
        <div className="container my-5">

            {/* 🔙 BACK */}
            <button
                className="btn btn-link mb-3"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            {/* IMAGE + DETAILS */}
            <div className="row g-5">
                {/* IMAGE */}
                <div className="col-md-6">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="img-fluid"
                    />
                </div>

                {/* DETAILS */}
                <div className="col-md-6">
                    <h4>{product.name}</h4>

                    {/* PRICE */}
                    <h5 className="text-success mb-3">
                        ₦{priceNumber.toLocaleString()}
                    </h5>

                    {/* SIZE */}
                    <div className="mb-3">
                        <p className="fw-semibold">Size</p>
                        <div className="d-flex gap-2 flex-wrap">
                            {[38, 39, 40, 41, 42, 43].map(s => (
                                <button
                                    key={s}
                                    className={`btn btn-sm ${size === s ? "btn-dark" : "btn-outline-dark"
                                        }`}
                                    onClick={() => setSize(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="mb-3">
                        <p className="fw-semibold">Quantity</p>
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => setQty(q => Math.max(1, q - 1))}
                            >
                                −
                            </button>
                            <span>{qty}</span>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => setQty(q => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* ADD TO CART */}
                    <button
                        className="btn btn-dark w-100 mb-4"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    {/* PRODUCT INFO */}
                    <div
                        className="detail-section"
                        role="button"
                        onClick={() =>
                            setOpenSection(openSection === "info" ? "" : "info")
                        }
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">PRODUCT INFO</h6>
                            <span>{openSection === "info" ? "−" : "+"}</span>
                        </div>
                    </div>

                    {openSection === "info" && (
                        <p className="detail-text mt-2">
                            {product.productInfo}
                        </p>
                    )}

                    <hr />

                    {/* RETURN POLICY */}
                    <div
                        className="detail-section"
                        role="button"
                        onClick={() =>
                            setOpenSection(openSection === "policy" ? "" : "policy")
                        }
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">RETURN AND REFUND POLICY</h6>
                            <span>{openSection === "policy" ? "−" : "+"}</span>
                        </div>
                    </div>

                    {openSection === "policy" && (
                        <p className="detail-text mt-2">
                            {product.returnPolicy}
                        </p>
                    )}

                    <hr />

                    {/* SHARE ICONS */}
                    <div className="d-flex gap-4 mt-3 fs-5">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a
                            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-whatsapp"></i>
                        </a>

                        <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-twitter-x"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* ⭐ CUSTOMER REVIEWS — EXACTLY LIKE IMAGE */}
            <CustomerReviews productId={product.id} />

        </div>
    );
};

export default ProductDetails;


