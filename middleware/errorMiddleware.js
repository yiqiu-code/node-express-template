import { error } from '../utils/response.js';

export const globalErrorHandler = (err, req, res, next) => {
    console.error('Global Error:', err);
    
    // JWT错误
    if (err.name === 'JsonWebTokenError') {
        return error(res, 'Token无效', 401);
    }
    
    if (err.name === 'TokenExpiredError') {
        return error(res, 'Token已过期', 401);
    }
    
    // 数据库错误
    if (err.code === 'ER_DUP_ENTRY') {
        return error(res, '数据已存在', 409);
    }
    
    // 默认服务器错误
    return error(res, '服务器内部错误', 500, err);
};

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};