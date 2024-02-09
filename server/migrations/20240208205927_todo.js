// title - text
// priority - integer 1-5
// description - text
// done - boolean
// date - datetime

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('todo', (table) => {
        table.increments('id').primary();
        table.text('title').notNullable();
        table.integer('priority').notNullable();
        table.text('description');
        table.boolean('done').defaultTo(false).notNullable();
        table.datetime('date').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('todo');
};
