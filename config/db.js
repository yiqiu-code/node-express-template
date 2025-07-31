import knex from 'knex';

const db = knex({
    client: 'mysql2', // 使用mysql2，性能更好
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'auto_form',
        charset: 'utf8mb4'
    },
    // pool: {
    //     min: parseInt(process.env.DB_POOL_MIN) || 2,
    //     max: parseInt(process.env.DB_POOL_MAX) || 10,
    //     idleTimeoutMillis: 30000,
    //     acquireTimeoutMillis: 60000,
    //     createTimeoutMillis: 30000,
    //     destroyTimeoutMillis: 5000,
    //     propagateCreateError: false
    // },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
});

export default db;