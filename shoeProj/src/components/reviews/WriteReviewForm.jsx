import { useState } from "react";
import "./reviews.css";

const WriteReviewForm = ({ productId, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        youtube: "",
        name: "",
        email: "",
        media: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Review for product:", productId, formData);

        // Later → send to backend
        onClose();
    };

    return (
        <div className="review-form mt-4">
            <form onSubmit={handleSubmit} className="container">

                {/* Review title */}
                <input
                    type="text"
                    name="title"
                    className="form-control mb-3"
                    placeholder="Give your review a title"
                    onChange={handleChange}
                />

                {/* Review content */}
                <label className="form-label text-muted">
                    Review content
                </label>
                <textarea
                    name="content"
                    className="form-control mb-4"
                    rows="5"
                    placeholder="Start writing here..."
                    onChange={handleChange}
                />

                {/* Upload */}
                <label className="form-label text-muted">
                    Picture/Video (optional)
                </label>
                <div className="upload-box mb-4">
                    <input
                        type="file"
                        name="media"
                        onChange={handleChange}
                    />
                </div>

                {/* YouTube */}
                <input
                    type="text"
                    name="youtube"
                    className="form-control mb-4"
                    placeholder="YouTube URL"
                    onChange={handleChange}
                />

                {/* Display name */}
                <label className="form-label text-muted">
                    Display name (displayed publicly like John Smith)
                </label>
                <input
                    type="text"
                    name="name"
                    className="form-control mb-4"
                    placeholder="Display name"
                    onChange={handleChange}
                />

                {/* Email */}
                <label className="form-label text-muted">
                    Email address
                </label>
                <input
                    type="email"
                    name="email"
                    className="form-control mb-4"
                    placeholder="Your email address"
                    onChange={handleChange}
                />

                {/* Footer text */}
                <p className="small text-muted">
                    We’ll only contact you about the review you left, and only if
                    necessary. By submitting your review, you agree to our terms,
                    privacy and content policies.
                </p>

                {/* Buttons */}
                <div className="d-flex gap-3 mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-dark w-50"
                        onClick={onClose}
                    >
                        Cancel review
                    </button>

                    <button
                        type="submit"
                        className="btn btn-dark w-50"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WriteReviewForm;
