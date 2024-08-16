const express = require("express");
const router = express.Router();
const multer = require("multer");
const { generateRandomString } = require("../utils/file");
const { imageService } = require("../services/image");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/uploadImage", upload.single("photo"), async (req, res) => {
    try {
        const file = req.file;
        const fileName = generateRandomString();
        const fileBuffer = file.buffer;
        const mimetype = file.mimetype;
        const folder = req.body.folder;
        const uploadres = await imageService.uploadImage(
            fileBuffer,
            folder,
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
        const { name,folder } = req.body;
        key = folder + "/" + name;
        const result = await imageService.makeUndeletable(key);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});

router.post("/makeDeletable", async (req, res) => {
    try {
        const { name,folder } = req.body;
        key = folder + "/" + name;
        const result = await imageService.makeDeletable(key);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;