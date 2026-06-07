import configdotenv from "dotenv";
import Redis from "ioredis";

configdotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("server is connected to redis");
});

redis.on("error", (err) => {
  console.log(err);
});

export default redis;
