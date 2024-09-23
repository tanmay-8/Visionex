const nodemailer = require("nodemailer");

require("dotenv").config();

const sendOtpMail = async (otp, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Email Verification",
            html: `<h1>OTP for verification is ${otp}</h1>`,
        });

        return {
            info: info,
            success: true,
        };
    } catch (err) {
        throw new Error(err);
    }
};

const sendResetMail = async (email, resetLink) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Reset Password",
            html: `<h1>Click <a href="${resetLink}">here</a> to reset your password</h1>`,
        });

        return {
            info: info,
            success: true,
        };
    } catch (err) {
        throw new Error(err);
    }
};
module.exports = { sendOtpMail, sendResetMail };
