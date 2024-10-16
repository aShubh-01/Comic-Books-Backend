const zod = require('zod')

const createBookDataSchema = zod.object({
    bookName: zod.string({message: 'Book name must be an string'}),
    authorName: zod.string({message: 'Author Name must be an string'}),
    description: zod.string({ message: 'Description must be an string'}).optional(),
    price: zod.number({ message: 'Price must be an number' }),
    publishedYear: zod.number({ message: 'Published Year must be an number '}),
    discount: zod.number({ message: 'Discount must be an number'}).max(100, { message: 'Discount cannot be more than 100%'}).optional(),
    isUsed: zod.boolean({ message: 'isUsed must be true or false' })
})

const updateBookDataSchema = createBookDataSchema.partial();

module.exports = {
    createBookDataSchema, 
    updateBookDataSchema
}