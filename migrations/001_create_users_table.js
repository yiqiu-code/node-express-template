export const up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username', 50).notNullable().unique();
        table.string('email', 100).notNullable().unique();
        table.string('password', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        // 添加索引
        table.index(['username']);
        table.index(['email']);
    });
};

export const down = function(knex) {
    return knex.schema.dropTable('users');
};