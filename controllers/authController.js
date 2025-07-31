import db from '../config/db.js';
import { success, error } from '../utils/response.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, getCookieOptions } from '../utils/jwtUtils.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    
    const user = await db('users').where({ username }).first();
    if (!user) {
        return error(res, '用户名或密码错误', 400);
    }
    
    const isValidPassword = await comparePassword(password, user.password);
    console.log(isValidPassword);
    
    if (!isValidPassword) {
        return error(res, '用户名或密码错误', 400);
    }
    
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });
    
    res.cookie('refreshToken', refreshToken, getCookieOptions());
    
    success(res, { 
        accessToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }, '登录成功');
});

export const register = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    
    const existingUser = await db('users')
        .where({ username })
        .orWhere({ email })
        .first();
        
    if (existingUser) {
        return error(res, '用户名或邮箱已存在', 400);
    }
    
    const hashedPassword = await hashPassword(password);
    
    await db('users').insert({
        username,
        password: hashedPassword,
        email
    });
    
    success(res, null, '注册成功', 201);
});

export const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return error(res, 'Refresh Token不存在', 401);
    }
    
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
        return error(res, 'Refresh Token无效或已过期', 401);
    }
    
    const newAccessToken = generateAccessToken({ userId: payload.userId });
    success(res, { accessToken: newAccessToken }, 'Token刷新成功');
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('refreshToken', getCookieOptions());
    success(res, null, '退出成功');
});