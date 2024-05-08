const express = require("express");
const router = express.Router();
const { otpService } = require("../services/otp");

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

module.exports = router;
