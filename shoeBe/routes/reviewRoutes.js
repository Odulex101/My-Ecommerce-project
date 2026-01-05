import express from "express";
import Review from "../models/Review.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET PRODUCT REVIEWS */
router.get("/:productId", async (req, res) => {
    const reviews = await Review.find({
        productId: Number(req.params.productId),
    });
    res.json(reviews);
});

/* POST REVIEW */
router.post("/", authMiddleware, async (req, res) => {
    const { productId, text } = req.body;

    const review = await Review.create({
        productId,
        text,
        userId: req.userId,
    });

    res.status(201).json(review);
});

export default router;
