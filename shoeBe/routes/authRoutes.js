// import express from "express";
// import { sendLoginCode, verifyCode } from "../controllers/authController.js";

// const router = express.Router();

// // POST /api/auth/send-code → sends verification code to email
// router.post("/send-code", sendLoginCode);

// // POST /api/auth/verify-code → verifies code and returns JWT
// router.post("/verify-code", verifyCode);

// export default router;

import express from "express";
import {
    sendLoginCode,
    verifyCode,
    checkEmail
} from "../controllers/authController.js";

const router = express.Router();

// 🔍 CHECK IF EMAIL EXISTS (FRONTEND REQUIRES THIS)
router.post("/check-email", checkEmail);

// ✉️ SEND VERIFICATION CODE
router.post("/send-code", sendLoginCode);

// ✅ VERIFY CODE & RETURN JWT
router.post("/verify-code", verifyCode);

export default router;

