import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
    // 确保密码是字符串
    if (typeof password !== 'string') {
        throw new Error('密码必须是字符串类型');
    }
    
    return await bcryptjs.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hashedPassword) => {
    // 确保两个参数都是字符串
    if (typeof password !== 'string' || typeof hashedPassword !== 'string') {
        throw new Error('密码和哈希值必须是字符串类型');
    }
    
    return await bcryptjs.compare(password, hashedPassword);
};