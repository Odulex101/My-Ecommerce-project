import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
