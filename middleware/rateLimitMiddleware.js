import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10分钟
    max: 5, // 限制每个IP 10分钟内最多5次请求
    message: {
        code: 429,
        message: '请求过于频繁，请稍后再试'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 一般接口限制
    message: {
        code: 429,
        message: '请求过于频繁，请稍后再试'
    }
});