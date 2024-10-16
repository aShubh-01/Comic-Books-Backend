const express = require('express')
const cors = require('cors')
const { port } = require('./config.js')
const { createBook, updateBook, deleteBook, getBook, getBooksList } = require('./controllers.js')

const router = express()      // create main router

router.use(express.json())           // makes sure express is able to parse the json data
router.use(cors())                   // allows request from cross origins site

router.post('/create', createBook)          // API to create a book
router.put('/update/:id', updateBook)       // API to update a book
router.delete('/delete/:id', deleteBook)    // API to delete a book
router.get('/details/:id', getBook)         // API to get book details
router.post('/list', getBooksList)      // API to get an list of books

router.listen(port, () => {                         // listen on given port
    console.log('Backend running on port ', port)
})