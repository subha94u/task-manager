const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlparser: true
})
//useCreateIndex: true
/*
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Eail is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const me = new User({
    name: '        Subhabrata     ',
    email: '  SUBHAA@gmail.com   ',
    password: 'XYz45ee!' 
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('*******: ', error)
})*/

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: '    Learn the Mongoose Validation   ',
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})
