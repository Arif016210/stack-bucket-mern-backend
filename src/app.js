require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')


const app = express()
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




app.listen(process.env.PORT, () => {
    console.log('Server is listening on:', process.env.PORT);
})