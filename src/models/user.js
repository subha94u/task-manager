const bcrypt = require('bcryptjs')
const { urlencoded } = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true,
})

//Set Virtual property : It is relation between two entity
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login!')
    }

    return user
}

//Set the middleware up to Hash the plain text to
userSchema.pre('save', async function (next) {
    const user = this

    console.log('Just before saving');

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user task when user removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({  owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

/*
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


module.exports = User
