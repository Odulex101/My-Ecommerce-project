import { FaStar } from "react-icons/fa";

const ProductRating = ({ rating, reviews }) => {
    return (
        <div className="d-flex align-items-center gap-2">
            {[...Array(5)].map((_, i) => (
                <FaStar
                    key={i}
                    size={14}
                    color={i < rating ? "#000" : "#ddd"}
                />
            ))}
            <small className="text-muted">{reviews} reviews</small>
        </div>
    );
};

export default ProductRating;

