
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		product: {
			name: String,
			price: Number,
			image: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);

