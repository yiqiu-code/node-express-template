import { body, validationResult } from 'express-validator';
import { validationError } from '../utils/response.js';

export const validateLogin = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('用户名长度必须在3-20个字符之间')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('用户名只能包含字母、数字和下划线'),
    body('password')
        .isLength({ min: 6, max: 50 })
        .withMessage('密码长度必须在6-50个字符之间'),
    handleValidationErrors
];

export const validateRegister = [
    ...validateLogin,
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('请输入有效的邮箱地址'),
    handleValidationErrors
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return validationError(res, errors.array());
    }
    next();
}