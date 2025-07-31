import { verifyAccessToken } from '../utils/jwtUtils.js';
import { error } from '../utils/response.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return error(res, '未提供有效的认证令牌', 401);
    }
    
    const token = authHeader.slice(7); // 移除 'Bearer ' 前缀
    
    if (!token) {
        return error(res, 'Token格式错误', 401);
    }
    
    try {
        const payload = verifyAccessToken(token);
        if (!payload) {
            return error(res, 'Token无效或已过期', 401);
        }
        
        req.user = payload;
        next();
    } catch (err) {
        return error(res, 'Token验证失败', 401);
    }
};

export default authMiddleware;