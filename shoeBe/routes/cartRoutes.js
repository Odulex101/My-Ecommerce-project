// import express from "express";
// import Cart from "../models/Cart.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// /* ===============================
//    GET USER CART
// =============================== */
// router.get("/", authMiddleware, async (req, res) => {
//     let cart = await Cart.findOne({ userId: req.userId });

//     if (!cart) {
//         cart = await Cart.create({ userId: req.userId, items: [] });
//     }

//     res.json(cart);
// });

// /* ===============================
//    ADD ITEM TO CART
// =============================== */
// router.post("/add", authMiddleware, async (req, res) => {
//     const { product } = req.body;

//     let cart = await Cart.findOne({ userId: req.userId });

//     if (!cart) {
//         cart = new Cart({
//             userId: req.userId,
//             items: [{ ...product, quantity: 1 }],
//         });
//     } else {
//         const existing = cart.items.find(
//             (item) => item.productId === product.productId
//         );

//         if (existing) {
//             existing.quantity += 1;
//         } else {
//             cart.items.push({ ...product, quantity: 1 });
//         }
//     }

//     await cart.save();
//     res.json(cart);
// });

// /* ===============================
//    REMOVE ITEM
// =============================== */
// router.delete("/:productId", authMiddleware, async (req, res) => {
//     const cart = await Cart.findOne({ userId: req.userId });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter(
//         (item) => item.productId !== Number(req.params.productId)
//     );

//     await cart.save();
//     res.json(cart);
// });

// export default router;



import express from "express";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   GET USER CART
=============================== */
router.get("/", authMiddleware, async (req, res) => {
    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
        cart = await Cart.create({ userId: req.userId, items: [] });
    }

    res.json(cart);
});

/* ===============================
   ADD ITEM TO CART
=============================== */
router.post("/add", authMiddleware, async (req, res) => {
    const { product } = req.body;

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
        cart = new Cart({
            userId: req.userId,
            items: [{ ...product, quantity: 1 }],
        });
    } else {
        const existing = cart.items.find(
            (item) => item.productId === product.productId
        );

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.items.push({ ...product, quantity: 1 });
        }
    }

    await cart.save();
    res.json(cart);
});

/* ===============================
   REMOVE ITEM
=============================== */
router.delete("/:productId", authMiddleware, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
        (item) => item.productId !== Number(req.params.productId)
    );

    await cart.save();
    res.json(cart);
});

/* ===============================
   UPDATE ITEM QUANTITY
=============================== */
router.put("/update", authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.map(item =>
        item.productId === productId
            ? { ...item, quantity } // update quantity
            : item
    );

    await cart.save();
    res.json(cart);
});

export default router;

