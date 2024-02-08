/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('todo')
        .del()
        .then(function () {
            const todos = [
                {
                    title: 'Build a CRUD app',
                    priority: 1,
                    description: 'Read the documentation',
                    date: new Date()
                },
                {
                    title: 'Do the dishes',
                    priority: 2,
                    date: new Date()
                },
                {
                    title: 'Render a view',
                    priority: 3,
                    description: 'Read the documentation',
                    date: new Date()
                },
                {
                    title: 'Walk the dog',
                    priority: 4,
                    description: 'Read the documentation',
                    date: new Date()
                }
            ];
            return knex('todo').insert(todos);
        });
};
