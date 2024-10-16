require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client')

const port = process.env.PORT || 3000 // get port
const prisma = new PrismaClient; // create an instance of generated prisma client

module.exports = { //export important variables for running the application
    port, prisma
}