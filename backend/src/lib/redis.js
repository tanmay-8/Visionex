const Redis = require("ioredis");
const dotenv = require("dotenv");
require("dotenv").config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
});

module.exports = redis;
