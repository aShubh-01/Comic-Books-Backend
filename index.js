const express = require('express')
const cors = require('cors')
const { port } = require('./config.js')

const mainRouter = express()

mainRouter.use(cors())

mainRouter.listen(port, () => {
    console.log('Backend running on port ', port)
})