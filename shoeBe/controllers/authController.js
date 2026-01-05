// import crypto from "crypto";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import User from "../models/User.js";

// dotenv.config();

// export const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// transporter.verify((err) => {
//     if (err) console.error("Email server error:", err);
//     else console.log("Email server ready");
// });

// export const sendLoginCode = async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (!email) return res.status(400).json({ message: "Email required" });

//         const code = crypto.randomInt(100000, 999999).toString();

//         let user = await User.findOne({ email });
//         if (!user) user = await User.create({ email });

//         user.verificationCode = code;
//         user.codeExpires = Date.now() + 10 * 60 * 1000;
//         await user.save();

//         // Log code to server console for development/debugging
//         if (process.env.NODE_ENV !== 'production') {
//             console.log(`Verification code for ${email}: ${code}`);
//         }

//         await transporter.sendMail({
//             from: `"Temorah Login" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Your verification code",
//             html: `<h2>Your verification code</h2><p style="font-size: 28px">${code}</p><p>Expires in 10 mins</p>`,
//         });

//         res.status(200).json({ message: "Verification code sent" });
//     } catch (error) {
//         console.error('sendLoginCode error:', error);
//         res.status(500).json({ message: "Failed to send code", error: error?.message });
//     }
// };

// export const verifyCode = async (req, res) => {
//     try {
//         const { email, code } = req.body;
//         if (!email || !code) return res.status(400).json({ message: "Email & code required" });

//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (user.verificationCode !== code || Date.now() > user.codeExpires) {
//             return res.status(400).json({ message: "Invalid or expired code" });
//         }

//         user.verificationCode = null;
//         user.codeExpires = null;
//         await user.save();

//         const token = jwt.sign(
//             { userId: user._id, email: user.email },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.status(200).json({ token, user: { id: user._id, email: user.email } });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Verification failed" });
//     }
// };

import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

/* ===============================
   EMAIL TRANSPORTER
=============================== */
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // MUST BE APP PASSWORD
    },
});

transporter.verify((err) => {
    if (err) {
        console.error("❌ Email server error:", err.message);
    } else {
        console.log("✅ Email server ready");
    }
});

/* ===============================
   CHECK EMAIL (EXISTING USER LOGIN)
=============================== */
export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            // 🆕 NEW USER
            return res.status(200).json({ exists: false });
        }

        // ✅ EXISTING USER → AUTO LOGIN
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            exists: true,
            token,
        });
    } catch (err) {
        console.error("checkEmail error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ===============================
   SEND LOGIN CODE (NEW USERS)
=============================== */
export const sendLoginCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const code = crypto.randomInt(100000, 999999).toString();

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
        }

        user.verificationCode = code;
        user.codeExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        // DEV LOG
        if (process.env.NODE_ENV !== "production") {
            console.log(`🔐 OTP for ${email}: ${code}`);
        }

        await transporter.sendMail({
            from: `"Temorah Login" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your verification code",
            html: `
                <h2>Your verification code</h2>
                <p style="font-size:24px;font-weight:bold">${code}</p>
                <p>Expires in 10 minutes</p>
            `,
        });

        res.status(200).json({ message: "Verification code sent" });
    } catch (error) {
        console.error("sendLoginCode error:", error);
        res.status(500).json({
            message: "Failed to send code",
            error: error.message,
        });
    }
};

/* ===============================
   VERIFY CODE
=============================== */
export const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({ message: "Email & code required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (
            user.verificationCode !== code ||
            Date.now() > user.codeExpires
        ) {
            return res.status(400).json({ message: "Invalid or expired code" });
        }

        user.verificationCode = null;
        user.codeExpires = null;
        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("verifyCode error:", error);
        res.status(500).json({ message: "Verification failed" });
    }
};











