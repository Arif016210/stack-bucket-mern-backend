require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');


const app = express()

mongoose.connect('mongodb://localhost:27017/stack-bucket-mern-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database Connected!!!');
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on:', process.env.PORT);
        })
    })
    .catch(e => {
        console.log(e);
    })


app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get('/', (req, res) => {
    res.status(500).json({
        message: 'Hello World!!!'
    })
})

app.use((req, res, next) => {
    const error = new Error('Error 404 Page Not Found!!!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.status(404).json({
            msg: error.message,
            status: 404,
        })
    }
    return res.status(500).json({
        msg: 'Internal Server Error',
        status: 500
    })
})


