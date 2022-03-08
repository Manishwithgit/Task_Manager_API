const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const todosSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    Age: {
        type: Number,
        min: 0,
        max: 101,
        required: true
    }

});

todosSchema.pre('save', async function(next) {
    var userdb = this;
    if (userdb.isModified('Password')) {
        userdb.Password = await bcrypt.hash(userdb.Password, 12);
    }
    next();
});

module.exports = mongoose.model('Todos', todosSchema)