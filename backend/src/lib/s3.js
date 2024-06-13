// import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectTaggingCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");

dotenv.config();
const bucketName = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

const uploadFile = (fileBuffer, fileName, mimetype) => {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
        Tagging: "delete=true",
    };

    return s3Client.send(new PutObjectCommand(uploadParams));
};

const deleteFile = (fileName) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    return s3Client.send(new DeleteObjectCommand(deleteParams));
};

const getObjectSignedUrl = async (key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    const command = new GetObjectCommand(params);
    const seconds = 60 * 60 * 24;
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

    return url;
};

const makeUndeletable = async (key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Tagging: {
            TagSet: [
                {
                    Key: "delete",
                    Value: "false",
                },
            ],
        },
    };
    return s3Client.send(new PutObjectTaggingCommand(params));
};

const makeDeletable = async (key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Tagging: {
            TagSet: [
                {
                    Key: "delete",
                    Value: "true",
                },
            ],
        },
    };
    return s3Client.send(new PutObjectTaggingCommand(params));
};
module.exports = {
    uploadFile,
    deleteFile,
    getObjectSignedUrl,
    makeUndeletable,
    makeDeletable,
};
