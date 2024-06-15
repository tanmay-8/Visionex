const express = require("express");
const router = express.Router();
const multer = require("multer");
const { generateRandomString } = require("../utils/file");
const { videoService } = require("../services/video");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadVideo",upload.single('video'),async (req, res) => {
    try {
        const file = req.file;
        const fileName = generateRandomString();
        const fileBuffer = file.buffer;
        const mimetype = file.mimetype;
        const uploadres = await videoService.uploadVideo(
            fileBuffer,
            fileName,
            mimetype
        );
        if (!uploadres.success) {
            res.status(500).json({ success: false, error: uploadres.error });
            return;
        } else {
            res.json({ success: true, fileName: fileName });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});

router.post("/makeUndeletable", async (req, res) => {
    try {
        const { name } = req.body;
        const result = await videoService.makeUndeletable(name);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});


router.post("/makeDeletable", async (req, res) => {
    try {
        const { name } = req.body;
        const result = await videoService.makeDeletable(name);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});

router.post("/getSignedUrl", async (req, res) => {
    try {
        const { name } = req.body;
        const result = await videoService.getSignedUrl(name);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
