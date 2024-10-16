const express = require('express')
const cors = require('cors')
const { port } = require('./config.js')
const { createBook, updateBook, deleteBook, getBook, getBooksList } = require('./controllers.js')

const router = express()      // create main router

router.use(express.json())           // makes sure express is able to parse the json data
router.use(cors())                   // allows request from cross origins sites

router.post('/create', createBook)          // Endpoint to create an book
router.put('/update/:id', updateBook)       // Endpoint to update an book
router.delete('/delete/:id', deleteBook)    // Endpoint to delete an book
router.get('/details/:id', getBook)         // Endpoint to get book details
router.get('/list', getBooksList)           // Endpoint to get an list of available books

router.listen(port, () => {                         // listen on given port
    console.log('Backend running on port ', port)
})