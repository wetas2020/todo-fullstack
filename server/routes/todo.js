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

router.get('/new', (req, res) => {
    res.render('new');
});

module.exports = router;
