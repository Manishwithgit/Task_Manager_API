const express = require('express')
const router = express.Router()
const Todos = require('../models/todos')


router.get('/', async(req, res) => {
    try {
        const todo = await Todos.find()
        res.json(todo)
    } catch (err) {
        res.send('Error ' + err)
    }
});

router.get('/:id', async(req, res) => {
    try {
        const todos = await Todos.findById(req.params.id)
        res.json(todos)
    } catch (err) {
        res.send('Error ' + err)
    }
});


router.post('/', async(req, res) => {
    const todos = new Todos({
        Email: req.body.Email,
        Password: req.body.Password,
        Age: req.body.Age
    });

    try {
        const a1 = await todos.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const todos = await Todos.updateOne({ id: req.params.id }, { $set: { Email: req.body.Email } });

        res.json(todos)
    } catch (err) {
        res.send('Error!')
    }

});
router.delete('/:id', async(req, res) => {
    try {
        const todos = await Todos.remove({ _id: req.params.id });
        res.json(todos)
    } catch (err) {
        res.send('Error')
    }

});

module.exports = router