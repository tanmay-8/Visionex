const { uploadFile, makeUndeletable, makeDeletable } = require("../lib/s3");

class ImageService {
    async uploadImage(fileBuffer, fileName, mimetype) {
        try {
            const result = await uploadFile(fileBuffer, fileName, mimetype);
            if (result.$metadata.httpStatusCode === 200) {
                console.log("uploadImage service ", fileName);
                return { success: true };
            } else {
                return { error: "Error uploading file", success: false };
            }
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async makeUndeletable(key) {
        try {
            console.log("makeUndeletable service ", key);
            const result = await makeUndeletable(key);
            if (result.$metadata.httpStatusCode === 200) {
                return { success: true };
            } else {
                return { error: "Error making file undelete", success: false };
            }
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async makeDeletable(key) {
        try {
            console.log("makeDeletable service ", key);
            const result = await makeDeletable(key);
            if (result.$metadata.httpStatusCode === 200) {
                return { success: true };
            } else {
                return { error: "Error making file delete", success: false };
            }
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
}

module.exports = { imageService: new ImageService() };
