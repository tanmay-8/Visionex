const { uploadFile, makeUndeletable, makeDeletable,getObjectSignedUrl } = require("../lib/s3");
const { prismaClient } = require("../lib/db");

class VideoService {
    async uploadVideo(fileBuffer, fileName, mimetype) {
        try {
            const result = await uploadFile(fileBuffer,"PostVideos/"+fileName, mimetype);
            if (result.$metadata.httpStatusCode === 200) {
                console.log("uploadVideo service ", fileName);
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
            key = "PostVideos/"+key;
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
            key = "PostVideos/"+key;
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
    async getSignedUrl(key) {
        try {
            key = "PostVideos/"+key;
            const url = await getObjectSignedUrl(key);
            return { success: true, url };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }

    async createVideo({ fileName, ownerId, ideaId }) {
        try {
            const video = await prismaClient.video.create({
                data: {
                    name:fileName,
                    ownerId,
                    ideaId,
                },
            });
            return { video, success: true };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    
    }
}

module.exports = { videoService: new VideoService() };
