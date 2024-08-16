const {
    uploadFile,
    makeUndeletable,
    makeDeletable,
    getObjectSignedUrl,
    deleteFile,
} = require("../lib/s3");
const { prismaClient } = require("../lib/db");

class ImageService {
    async uploadImage(fileBuffer, folder, fileName, mimetype) {
        try {
            const result = await uploadFile(
                fileBuffer,
                folder + "/" + fileName,
                mimetype
            );
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
            const url = await getObjectSignedUrl(key);
            return { success: true, url };
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
    async createImage(input) {
        try {
            const { fileName, ownerId, ideaId,folder } = input;
            const result = await this.makeUndeletable(folder+"/"+fileName);
            if (result.success) {
                const image = await prismaClient.image.create({
                    data: {
                        name: fileName,
                        ownerId,
                        ideaId,
                    },
                });
                if (image) {
                    return { image, success: true };
                } else {
                    return { error: "Error creating image", success: false };
                }
            } else {
                return { error: "Error creating image", success: false };
            }
        } catch (err) {
            console.log(err);
            return { error: err, success: false };
        }
    }
    async deleteImage(key){
        try{
            const result = await deleteFile(key);
            if(result.success){
                return {success:true};
            }
            else{
                return {error:"Error deleting image", success:false};
            }
        }catch(err){
            console.log(err);
            return {error:err, success:false};
        }
    }
}

module.exports = { imageService: new ImageService() };
