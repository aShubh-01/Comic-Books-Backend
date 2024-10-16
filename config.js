require('dotenv').config({ path: './.env' });
const { PrismaClient } = require('@prisma/client')
const redis = require('redis')

const port = process.env.PORT || 3000       // get port

const prisma = new PrismaClient;            // create an instance of generated prisma client

const redisClient = redis.createClient();   // create an instance of redis client

redisClient.connect().then(() => {          // connect to redis
    console.log('Connected to Redis');
}).catch(err => {
    console.error('Unable to connect with redis', err)
})

module.exports = {              //export important variables for running the application
    port, prisma, redisClient 
}