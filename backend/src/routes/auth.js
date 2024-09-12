const express = require("express");
const router = express.Router();
const { otpService } = require("../services/otp");
const { resetPasswordService } = require("../services/resetpassword");

router.post("/sendOtp", async (req, res) => {
    try {
        const { email } = req.body;
        const resOtp = await otpService.sendOtp(email);
        if (resOtp.success) {
            return res.status(200).send({
                message: "OTP sent successfully",
                success: true,
            });
        } else {
            return res.send({
                error: resOtp.message,
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            success: false,
        });
    }
});

router.post("/verifyOtp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const resOtp = await otpService.verifyOtp(otp, email);
        if (resOtp.success) {
            return res.status(200).send({
                message: resOtp.message,
                success: true,
            });
        } else {
            return res.send({
                message: resOtp.message,
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            success: false,
        });
    }
});

router.post("/resendOtp", async (req, res) => {
    try {
        const { email } = req.body;
        const resOtp = await otpService.resendOtp(email);
        if (resOtp.success) {
            return res.status(200).send({
                message: "OTP sent successfully",
                success: true,
            });
        } else {
            return res.send({
                error: resOtp.message,
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            success: false,
        });
    }
});

router.post("/sendResetMail", async (req, res) => {
    try {
        const { email } = req.body;
        const resMail = await resetPasswordService.sendResetLink(email);
        return res.status(200).send({
            message: "Email sent successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            success: false,
        });
    }
});

router.post("/verifyResetToken", async (req, res) => {
    try {
        const { token } = req.body;
        const resToken = await resetPasswordService.verifyResetToken(token);
        if (resToken.success) {
            return res.status(200).send({
                message: resToken.message,
                success: true,
            });
        } else {
            return res.send({
                message: resToken.message,
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            success: false,
        });
    }
});

router.post("/resetPassword", async (req, res) => {
    try {
        const { token, password } = req.body;
        const resReset = await resetPasswordService.resetPassword(token, password);
        if (resReset.success) {
            return res.status(200).send({
                message: resReset.message,
                success: true,
            });
        } else {
            return res.send({
                message: resReset.message,
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            success: false,
        });
    }
});
module.exports = router;
