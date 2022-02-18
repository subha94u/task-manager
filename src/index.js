// const { ObjectID } = require('bson');
const express = require('express')
require('./db/mongoose');
// const User = require('./models/user');
// const Task = require('./models/task');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if(!file.originalname.endsWith('.pdf')) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a PDF'))
        }

        cb(undefined, true)
    }
})
// app.post('/upload', upload.single('upload-file'), (req, res) => {
app.post('/upload', upload.single('upload-file'), (req, res) => {    
    
    res.send()
}, (error, req, res, next) => {
    res.status('400').send({error: error.message})
})


//app.use(auth)

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// Without middleware: new request ---> run route handler
// With middleware: new request ---> de something ---> run route handler

/*
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    } 
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users);
    } catch (e) {
        res.status(400).send(e)
    }
})


app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const users = await User.findById(_id)
        if (!users){
            return res.status(404).send()
        }
        res.send(users);
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body) 
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(404).send({error: 'Invalid updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!user) {
            return res.status(404).send({error: 'No User!'})
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
       
        if(!user) {
            return res.status(404).send({error: 'No User!'})
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
*/
/*
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})*/
/*
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})*/

/*
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
*/

/*
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.statusCode(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.statusCode(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if(!task) {
            return res.status(404).send(e)
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(404).send({error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
         res.status(404).send()
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send({error: 'No task available!'})
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
*/
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// Hashing Algorithm
// const bcrypt = require('bcryptjs')
/*
const myFunction = async () => {
    const password = 'red12343!#'
    const hasedPassword = await bcrypt.hash(password, 8)
    
    console.log(password)
    console.log(hasedPassword)

    const isMatch = await bcrypt.compare('red12343!#', hasedPassword)

    console.log(isMatch);
}

myFunction()*/
/*
const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', { expiresIn: '7 days'})
    console.log(token)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE2NDQ3NzMwNTN9.Y_ZAhGTcmnNJE1HONustErSaudcuAGSKT32DdYt99a4
    // the above token is separated with three distinct part two dots(.)
    // 1st part is base64 encoded JSON string (header, meta information)
    // 2nd part is payload or body
    // 3rd signature verify the token

    const data = jwt.verify(token, 'thisismycourse')
    console.log(data)
}

myFunction()
*/
/*
const pet = {
    name: 'Hal'
}

pet.toJSON = function () {
    console.log("test1::: ", this);
    return {}
}
console.log("test2::: ")
console.log('test333::::', JSON.stringify(pet))

*/
/*
const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('620b2be280ae7d4c66ebfcf3')
    // await task.populate('owner').execPopulate() // execPopulate() is deprecated 


    // const taskQuery = Task.findById('620b2be280ae7d4c66ebfcf3')
    // const task = await taskQuery.populate('owner')
    // console.log(task.owner)

    const user = await User.findById('620b2b5680ae7d4c66ebfce5')
    const userQuery = await user.populate('tasks')
    console.log(userQuery.tasks)
    
}

main()*/


