import { useCart } from "../../context/CartContext";
import RatingStars from "./RatingStars";
import ReviewModal from "./ReviewModal";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="col">
            <div className="card border-0">
                <div className="position-relative">
                    <span className="badge bg-light text-dark position-absolute m-2">
                        {product.badge}
                    </span>
                    <img src={product.images[0]} className="img-fluid" />
                </div>

                <div className="card-body px-0">
                    <p className="fw-semibold">{product.name}</p>
                    <p>{product.price}</p>
                    <RatingStars rating={product.rating} />
                    <small>{product.reviews} reviews</small>

                    <div className="mt-2 d-flex gap-2">
                        <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>

                        <ReviewModal productId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

