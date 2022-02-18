const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlparser: true,
})
//useCreateIndex: true
// useFindAndModify: false // remove the deprecation warning

/*
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
})*/
