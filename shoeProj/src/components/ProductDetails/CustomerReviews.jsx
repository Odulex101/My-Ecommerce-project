// import reviews from "../../data/reviews";


// const CustomerReviews = ({ productId }) => {
//     const data = reviews[productId];

//     if (!data) return null;

//     return (
//         <div className="container my-5">
//             <h4 className="text-center mb-4">Customer Reviews</h4>

//             <div className="row align-items-center text-center text-md-start">
//                 {/* AVERAGE */}
//                 <div className="col-md-4 mb-4 mb-md-0">
//                     <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-2">
//                         {"★".repeat(5)}
//                         <h4 className="mb-0">{data.average} out of 5</h4>
//                     </div>
//                     <p className="text-muted mt-2">
//                         Based on {data.total} reviews
//                     </p>
//                 </div>

//                 {/* BREAKDOWN */}
//                 <div className="col-md-4">
//                     {[5, 4, 3, 2, 1].map(star => (
//                         <div key={star} className="d-flex align-items-center mb-2">
//                             <span className="me-2">{star}★</span>

//                             <div className="progress flex-grow-1 mx-2" style={{ height: "8px" }}>
//                                 <div
//                                     className="progress-bar bg-dark"
//                                     style={{
//                                         width: `${(data.breakdown[star] / data.total) * 100}%`
//                                     }}
//                                 />
//                             </div>

//                             <span className="text-muted" style={{ width: "30px" }}>
//                                 {data.breakdown[star]}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* BUTTON */}
//                 <div className="col-md-4 text-center text-md-end mt-4 mt-md-0">
//                     <button className="btn btn-dark px-4 py-2">
//                         Write a review
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CustomerReviews;


import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CustomerReviews.css";

const CustomerReviews = ({ productId }) => {
    const { token } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);

    const [form, setForm] = useState({
        title: "",
        content: "",
        userName: ""
    });

    /* FETCH REVIEWS */
    useEffect(() => {
        fetch(`http://localhost:5000/api/reviews/${productId}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [productId]);

    /* IMAGE PREVIEW */
    const handleImage = e => {
        const files = Array.from(e.target.files);
        setImages(files);
        setPreview(files.map(file => URL.createObjectURL(file)));
    };

    /* SUBMIT REVIEW */
    const submitReview = async () => {
        const imageUrls = preview;

        const res = await fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId,
                rating,
                title: form.title,
                content: form.content,
                userName: form.userName,
                images: imageUrls
            })
        });

        if (res.ok) {
            setShowForm(false);
            setRating(0);
            setForm({ title: "", content: "", userName: "" });
            setImages([]);
            setPreview([]);
            const updated = await res.json();
            setReviews(prev => [updated, ...prev]);
        }
    };

    return (
        <div className="customer-reviews mt-5">

            <h4 className="text-center mb-4">Customer Reviews</h4>

            {/* REVIEW LIST */}
            {reviews.map(r => (
                <div key={r._id} className="border-bottom pb-3 mb-3">
                    <strong>{r.userName}</strong>
                    <div className="text-warning">
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                    <h6>{r.title}</h6>
                    <p>{r.content}</p>

                    <div className="d-flex gap-2">
                        {r.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                width="70"
                                className="rounded"
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* WRITE REVIEW */}
            {token ? (
                <button
                    className="btn btn-dark w-100 my-4"
                    onClick={() => setShowForm(!showForm)}
                >
                    Write a review
                </button>
            ) : (
                <p className="text-center text-muted">
                    Login to write a review
                </p>
            )}

            {/* FORM */}
            {showForm && (
                <div className="review-form">

                    {/* STAR RATING */}
                    <div className="mb-3 text-center">
                        {[...Array(5)].map((_, i) => {
                            const star = i + 1;
                            return (
                                <span
                                    key={i}
                                    className={`star ${star <= (hover || rating) ? "active" : ""}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </span>
                            );
                        })}
                    </div>

                    <input
                        className="form-control mb-3"
                        placeholder="Review title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />

                    <textarea
                        className="form-control mb-3"
                        rows="4"
                        placeholder="Write your review..."
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Display name"
                        value={form.userName}
                        onChange={e => setForm({ ...form, userName: e.target.value })}
                    />

                    <input type="file" multiple onChange={handleImage} />

                    <div className="d-flex gap-2 mt-2">
                        {preview.map((img, i) => (
                            <img key={i} src={img} width="70" />
                        ))}
                    </div>

                    <div className="d-flex gap-3 mt-4">
                        <button
                            className="btn btn-outline-dark"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>

                        <button className="btn btn-dark" onClick={submitReview}>
                            Submit Review
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerReviews;

