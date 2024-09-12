const crypto = require("crypto");
const { prismaClient } = require("../lib/db");
const { userService } = require("./user");
const { sendResetMail } = require("../utils/sendMail");
require("dotenv").config();

class ResetPasswordService {
    async sendResetLink(email) {
        try {
            const userThere = await prismaClient.user.findFirst({
                where: {
                    email: email,
                },
            });

            if (!userThere) {
                return {
                    message: "Reset Link sent successfully",
                    success: true,
                };
            }

            const alReset = await prismaClient.passwordReset.findFirst({
                where: {
                    email: email,
                },
            });

            if(alReset && alReset.createdAt > new Date(Date.now() - 3600 * 1000)){
                return {
                    message: "Reset Link sent successfully",
                    success: true,
                };
            }

            const token = crypto.randomBytes(64).toString("hex");
            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

            const resetLink = `${process.env.FRONTEND_URL}/auth/resetpassword/${token}`;
            const info = await sendResetMail(email, resetLink);
            const resetRecord = await prismaClient.passwordReset.create({
                data: {
                    email: email,
                    token: hashedToken,
                },
            });

            return { message: "Reset Link sent successfully", success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
    async verifyResetToken(token) {
        try {
            const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

            const resetThere = await prismaClient.passwordReset.findFirst({
                where: {
                    token: hashedToken,
                },
            });

            if (!resetThere) {
                return {
                    message: "Link is invalid or expired",
                    success: false,
                };
            }

            if(resetThere.createdAt < new Date(Date.now() - 3600 * 1000)){
                return {
                    message: "Link is invalid or expired",
                    success: false,
                };
            }

            return { message: "Valid Token", success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async resetPassword(token, password) {
        try {
            const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

            const resetThere = await prismaClient.passwordReset.findFirst({
                where: {
                    token: hashedToken,
                },
            });

            if (!resetThere) {
                return {
                    message: "Link is invalid or expired",
                    success: false,
                };
            }

            if(resetThere.createdAt < new Date(Date.now() - 3600 * 1000)){
                return {
                    message: "Link is invalid or expired",
                    success: false,
                };
            }

            const info = userService.updatePassword(resetThere.email, password);

            if(info.error){
                return {
                    message: "Password reset failed",
                    success: false,
                };
            }

            return { message: "Password reset successfully", success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
}

module.exports = {resetPasswordService:new ResetPasswordService()}