// 首先加载环境变量配置
import loadEnvConfig from './config/env.js';
loadEnvConfig();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// 路由导入
import authRoutes from './routes/authRoutes.js';

// 中间件导入
import authMiddleware from './middleware/authMiddleware.js';
import { globalErrorHandler } from './middleware/errorMiddleware.js';
import { generalLimiter } from './middleware/rateLimitMiddleware.js';
import { error } from './utils/response.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 安全中间件
app.use(helmet());

// CORS配置 - 使用环境变量
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    credentials: process.env.CORS_CREDENTIALS === 'true'
}));

// 限流
app.use(generalLimiter);

// 解析中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 公开路由
app.use('/api/auth', authRoutes);

// 需要认证的路由
app.use('/api', authMiddleware);
// 在这里添加其他需要认证的路由

// 404处理
app.use('*', (req, res) => {
    error(res, '接口不存在', 404);
});

// 全局错误处理
app.use(globalErrorHandler);

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 SIGINT received, shutting down gracefully');
    process.exit(0);
});