const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/users'

const app = express()

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
});

app.use(express.json())

const todosRouter = require('./routers/todo')
app.use('/todo', todosRouter)

app.listen(9000, () => {
    console.log('Server started')
});