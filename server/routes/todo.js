const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

/* This router is mounted at https://localhost:3000/todo */
router.get('/', (req, res) => {
    knex.select()
        .from('todo')
        .then((todos) => {
            res.render('all', { todos: todos });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) {
        knex('todo')
            .select()
            .where('id', id)
            .first()
            .then((todo) => {
                console.log(todo);
                res.render('single', todo);
            });
    } else {
        res.status(500);
        res.render('error', {
            message: 'Invalid id'
        });
    }
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.get('/:id/edit', (req, res) => {
    // get the todo with id int the url
    const id = req.params.id;
    if (!isNaN(id)) {
        knex('todo')
            .select()
            .where('id', id)
            .first()
            .then((todo) => {
                res.render('edit', todo);
            });
    } else {
        res.status(500);
        res.render('error', {
            message: 'Invalid id'
        });
    }
});

validTodo = (todo) => {
    return (
        typeof todo.title == 'string' &&
        todo.title.trim() != '' &&
        !isNaN(todo.priority) &&
        todo.priority >= 1 &&
        todo.priority <= 5
    );
};

router.post('/', (req, res) => {
    console.log(req.body);
    if (validTodo(req.body)) {
        const todo = {
            title: req.body.title,
            priority: req.body.priority,
            description: req.body.description,
            date: new Date()
        };
        // insert into db
        knex('todo')
            .insert(todo, 'id')
            .then((ids) => {
                const id = ids[0];
                res.redirect('/todo/' + id);
            });
    } else {
        // respond with an error
        res.status(500);
        res.render('error', {
            message: 'Invalid todo'
        });
    }
});

module.exports = router;
