import express from 'express';
import { login, register, refreshToken, logout } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../middleware/validationMiddleware.js';
import { rateLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/login', rateLimiter, validateLogin, login);
router.post('/register', rateLimiter, validateRegister, register);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;