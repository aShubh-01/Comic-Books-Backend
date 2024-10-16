const { prisma } = require('./config.js')
const { createBookDataSchema, updateBookDataSchema } = require('./validationSchemas.js')

const createBook = async (req, res) => {                   // Create comic book API

    const parsingResponse = createBookDataSchema.safeParse(req.body)   // Validate the data types of the fields

    try {
        if(!parsingResponse.success) {                             // If the paylaod validation fails, send the appropriate issue message in response
            const invalidDataTypeMessages = 
                parsingResponse.error.issues.map((issue) => {
                    return issue.message
                })
            return res.status(422).json({
                "issues": invalidDataTypeMessages,
                "message": "Payload data has invalid types"
            })
        }
    } catch (err) {                                         // Return an message if some error occures during parsing payload
        console.log('Unable to parse payload', err)
        return res.status(500).json({
            message: 'Unable to parse the body payload'
        })
    }
                                                                   
    try {                                                
        const { id } = await prisma.comicBook.create({      // If payload validation succeeds, insert the records in database
            data: req.body,
            select: { id: true }
        })

        return res.status(200).json({                       // if the insertion succeeds, return the id of the book in response
            message: `Comic Book Created! Book id : ${id}`
        })

    } catch (err) {                                         // catch any error that might arise while inserting operation
        console.log('Unable to create comic book ', err)
    }

    return res.status(500).json({                           // respond with an error message if database operation fails
        message: "Unable to create book"
    })
}

const updateBook = async (req, res) => {                         // Update comic book API

    const comidBookId = parseInt(req.params.id);

    const parsingResponse = updateBookDataSchema.safeParse(req.body)   // Validate the data types of the payload

    try {
        if(!parsingResponse.success) {                             // If the paylaod validation fails, send the appropriate issue message in response
            const invalidDataTypeMessages = 
                parsingResponse.error.issues.map((issue) => {
                    return issue.message
                })
            return res.status(422).json({
                "issues": invalidDataTypeMessages,
                "message": "Payload data has invalid types"
            })
        }
    } catch (err) {                                         // Return an message if some error occures during parsing payload
        console.log('Unable to parse payload', err)
        return res.status(500).json({
            message: 'Unable to parse the body payload'
        })
    }

    try {                                                
        await prisma.comicBook.update({      // If payload validation succeeds, update the records in database
            where: { id: comidBookId },
            data: req.body
        })

        return res.status(200).json({                       // if the updation succeeds, return the id of the book in response
            message: `Comic Book Updated! Book id : ${comidBookId}`
        })

    } catch (err) {                                         // catch any error that might arise during update operation
        console.log('Unable to create comic book ', err)
    }

    return res.json({
        message: "Unable to update comic book data"
    })
}

const deleteBook = (req, res) => {
    res.json({
        message: "Dek"
    })
}

const getBook = (req, res) => {
    res.json({
        message: "get"
    })
}

const getBooksList = (req, res) => {
    res.json({
        message: "list"
    })
}

module.exports = {
    createBook, updateBook, deleteBook, getBook, getBooksList
}