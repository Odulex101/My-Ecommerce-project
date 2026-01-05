const RatingStars = ({ rating }) => {
    return (
        <div>
            {[...Array(5)].map((_, i) => (
                <span key={i}>
                    {i < rating ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
};

export default RatingStars;
