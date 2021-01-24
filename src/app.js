const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


const app = express()


app.get('/', (req, res) => {
    res.status(500).json({
        message: 'Hello World!!!'
    })
})


app.listen(4000, () => {
    console.log('Server is listening on 4000');
})