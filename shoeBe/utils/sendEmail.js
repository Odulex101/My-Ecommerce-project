import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * 🔐 Verification email (existing logic)
 */
export const sendVerificationEmail = async (to, code) => {
    await transporter.sendMail({
        from: `"Shop Login" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your verification code",
        html: `
      <h2>${code}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
    });
};

/**
 * 📦 Order confirmation email (NEW)
 */
export const sendOrderConfirmationEmail = async ({
    to,
    pickupStation,
    totalAmount,
}) => {
    await transporter.sendMail({
        from: `"Shoe Store" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Order Confirmed 🎉",
        html: `
      <h2>Thank you for your order!</h2>
      <p>Your order has been successfully placed.</p>
      <p><strong>Pickup Station:</strong> ${pickupStation}</p>
      <p><strong>Total:</strong> ₦${totalAmount.toLocaleString()}</p>
      <p>We’ll notify you when your order is ready.</p>
    `,
    });
};
