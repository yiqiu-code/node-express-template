import dotenv from 'dotenv';
import path from 'path';

// 根据 NODE_ENV 加载对应的环境变量文件
const loadEnvConfig = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    
    // 优先级：.env.local > .env.[NODE_ENV] > .env
    const envFiles = [
        `.env.${nodeEnv}.local`,
        `.env.${nodeEnv}`,
        '.env.local',
        '.env'
    ];
    
    envFiles.forEach(file => {
        const envPath = path.resolve(process.cwd(), file);
        dotenv.config({ path: envPath });
    });
    
    // 验证必需的环境变量
    validateRequiredEnvVars();
};

const validateRequiredEnvVars = () => {
    const required = [
        'NODE_ENV',
        'PORT',
        'DB_HOST',
        'DB_USER',
        'DB_PASSWORD',
        'DB_NAME',
        'JWT_ACCESS_SECRET',
        'JWT_REFRESH_SECRET'
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('❌ 缺少必需的环境变量:', missing.join(', '));
        process.exit(1);
    }
    
    console.log('✅ 环境变量验证通过');
};

export default loadEnvConfig;