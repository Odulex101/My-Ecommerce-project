import nodemailer from "nodemailer";

export const sendEmail = async (to, code) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Shop Login" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your verification code",
        html: `<h2>${code}</h2><p>This code expires in 10 minutes.</p>`
    });
};
