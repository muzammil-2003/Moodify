const Redis = require("ioredis").default

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
});

redis.on('connect', () => {
    console.log("Server is connected to Redis.");
})

redis.on('error', (err) => {
    console.log("Redis error: ", err);
})

module.exports = redis
