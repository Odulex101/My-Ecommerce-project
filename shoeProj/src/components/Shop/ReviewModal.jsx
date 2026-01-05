// import { useState } from "react";
// import { useReviews } from "../../context/ReviewContext";

// const ReviewModal = ({ productId }) => {
//     const { reviews, addReview } = useReviews();
//     const [text, setText] = useState("");

//     return (
//         <>
//             <button
//                 className="btn btn-outline-secondary btn-sm"
//                 data-bs-toggle="modal"
//                 data-bs-target={`#review-${productId}`}
//             >
//                 Reviews
//             </button>

//             <div className="modal fade" id={`review-${productId}`}>
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-body">
//                             {(reviews[productId] || []).map((r, i) => (
//                                 <p key={i}>{r}</p>
//                             ))}

//                             <textarea
//                                 className="form-control"
//                                 value={text}
//                                 onChange={e => setText(e.target.value)}
//                             />

//                             <button
//                                 className="btn btn-dark mt-2"
//                                 onClick={() => addReview(productId, text)}
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ReviewModal;


import { useEffect, useState } from "react";
import axios from "axios";

const ReviewModal = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/reviews/${productId}`)
            .then(res => setReviews(res.data));
    }, [productId]);

    const submitReview = async () => {
        const res = await axios.post(
            "http://localhost:5000/api/reviews",
            { productId, text }
        );

        setReviews(prev => [...prev, res.data]);
        setText("");
    };

    return (
        <>
            <button
                className="btn btn-sm btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target={`#review-${productId}`}
            >
                Reviews
            </button>

            <div className="modal fade" id={`review-${productId}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            {reviews.map(r => (
                                <p key={r._id}>{r.text}</p>
                            ))}

                            <textarea
                                className="form-control"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <button
                                className="btn btn-dark mt-2"
                                onClick={submitReview}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewModal;

