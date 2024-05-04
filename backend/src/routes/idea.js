const express = require("express");
const router = express.Router();

router.post("/uploadImage", async (req, res) => {
    try {
        console.log(req.body);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});