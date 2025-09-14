import { redisClient } from "../utils/redisClient.js";

const RATE_LIMIT = 10; // max requests
const WINDOW_SIZE_IN_SECONDS = 60; // per minute

export const rateLimiter = async (req, res, next)=>{
    try{
        const key = `rate:${req.ip}`
        const requests = await redisClient.incr(key);

        if(requests === 1){
            await redisClient.expire(key, WINDOW_SIZE_IN_SECONDS); // set expiration only on first request
        }

        if(requests > RATE_LIMIT){
            return res.status(429).json({message: 'Too many requests. Please try again later.'});
        }
        next();
    }catch(err){
        console.error('Rate Limiter Error:', err);
        // skip rate limiting if redis fails
        next();
    }
}