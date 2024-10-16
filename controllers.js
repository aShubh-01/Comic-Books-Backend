const { prisma, redisClient } = require('./config.js')
const { createBookDataSchema, updateBookDataSchema } = require('./validationSchemas.js')

const createBook = async (req, res) => {                   // Create comic book Endpoint

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

    return res.status(500).json({                            // Return message if endpoint fails to create comic book
        message: "Unable to create book"
    })
}

const updateBook = async (req, res) => {                   // Update comic book Endpoint

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
        console.log('Unable to update comic book ', err)
    }

    return res.status(500).json({                       // Return message if endpoint fails to update comic book
        message: "Unable to update comic book data"
    })
}

const deleteBook = async (req, res) => {                   // Delete comic book Endpoint

    const comidBookId = parseInt(req.params.id);

    try {                                                
        await prisma.comicBook.delete({      // If payload validation succeeds, delete the records from database
            where: { id: comidBookId }
        })

        return res.status(200).json({                       // if the deletion succeeds, return an message
            message: `Comic Book Deleted!`
        })

    } catch (err) {                                         // catch any error that might arise during delete operation
        console.log('Unable to delete comic book', err)
    }

    res.json({                                           // Return message if endpoint fails to delete comic book
        message: "Unable to delete comic book"
    })
}

const getBook = async (req, res) => {                      // Get details of an book Endpoint

    const comicBookId = parseInt(req.params.id);

    try {                                                   // Get the details of the book using comic book id
        const bookDetails = await prisma.comicBook.findFirst({
            where: { id: comicBookId },
            select: {
                authorName: true,
                bookName: true,
                description: true,
                publishedYear: true,
                price: true,
                discount: true,
                pages: true,
                isUsed: true
            }
        })

        return res.status(200).json({
            message: 'Book Details Fetched!',
            bookDetails
        })
    } catch (err) {                                         // catch any error that might occur during find operation
        console.log('Unable to get comic book data', err)
    }

    res.status(500).json({                           // Return message if endpoint fails to get comic book details
        message: "Unable to get comic book data"
    })
}

const getBooksList = async (req, res) => {                  //Get an list of filtered and sorted books

    const { author, year : maxYear, price : maxPrice, pages : maxPages, discount : maxDiscount, isUsed : isBookUsed, sortBy,  page, limit }= req.query; // get query parameters

    const key = JSON.stringify(req.query);

    const cachedData = await redisClient.get(key);              // check for cached data in redis
    if(cachedData) {
        return res.status(200).json({                           // return the cached data in response
            message: "Books fetched!",
            booksList: JSON.parse(cachedData)
        })
    }

    let filters = [                                                     // build an filter for fetching the books that satisfy the filtering criteria 
        author ? { authorName: author } : {},
        maxYear ? { publishedYear: { lte: parseInt(maxYear) } } : {},
        maxPrice ? { price: { lte: parseInt(maxPrice) } } : {},
        maxPages ? { pages: { lte: parseInt(maxPages) } } : {},
        maxDiscount ? { discount: { lte: parseInt(maxDiscount) } } : {},
        isBookUsed ? { isUsed: (isBookUsed == 'true' ? true : false) } : {}
    ]

    const skip = (parseInt(page) - 1) * limit;                          // calculate the offset for skipping records

    try {
        let booksList = await prisma.comicBook.findMany({               // fetch the required books from the database by applysing offset, limit and filters
            where : filters.length > 0 ? { AND : filters } : {},
            skip: skip,
            take: parseInt(limit)
        })

            switch (sortBy) {                                             // sort the fetched comic books based on sorting metric (eg price, pages, discount, year, etc)
            case 'price': booksList = booksList.sort((a, b) => a.price - b.price)
            break;
            case 'discount': booksList = booksList.sort((a, b) => b.discount - a.discount)
            break;
            case 'year': booksList = booksList.sort((a, b) => b.year - a.year)
            break;
            case 'pages': booksList = booksList.sort((a, b) => b.pages - a.pages)
            break;
            case 'alphabets': booksList = booksList.sort((a, b) => a.bookName.localeCompare(b.bookName))
            break;
            default : booksList = booksList.sort((a, b) => a.id - b.id)
            break;
        }

        await redisClient.setEx(key, 60, JSON.stringify(booksList));        // cache the data for 1 min with the stringified query parameters as the key

        return res.status(200).json({                                       // return the sorted books in response
            message: "Books fetched!",
            booksList
        })
    } catch (err) {                                             // catch any errors that might occur during fetching, sorting or caching of books
        console.log('Unable to fetch books list', err)
    }
    
    return res.status(500).json({                       // return if endpoint fails to return comic books
        message: "Unable to fetch books list"
    })
}

module.exports = {
    createBook, updateBook, deleteBook, getBook, getBooksList
}