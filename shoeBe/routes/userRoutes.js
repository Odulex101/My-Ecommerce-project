// import express from "express";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// const auth = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId || decoded.id;
//     next();
// };

// router.get("/me", auth, async (req, res) => {
//     const user = await User.findById(req.userId);
//     res.json(user);
// });

// router.put("/me", auth, async (req, res) => {
//     const user = await User.findByIdAndUpdate(
//         req.userId,
//         req.body,
//         { new: true }
//     );
//     res.json(user);
// });

// export default router;


import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: "Unauthorized" });
    }
};

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.userId).select("-loginCode");
    res.json(user);
});

router.put("/me", auth, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.json(user);
});

export default router;




