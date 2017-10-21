'use strict'

// Basic express setup:

const PORT = 8080
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Set up and use mongo client. Running mongo locally.
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = 'mongodb://localhost:27017/tweeter'

// set up the connect to mongo and then implement all the routes.
MongoClient.connect(MONGODB_URI, (err, mongodb) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  }
  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`)

  // the dataHelpers have been re-factored to user mongo. 

  const dataHelpers = require('./lib/data-helpers.js')(mongodb)

  // The `tweets-routes` module works similarly: we pass it the `dataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require('./routes/tweets')(dataHelpers)

  const userRoutes = require('./routes/users')(dataHelpers)

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use('/tweets', tweetsRoutes)

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use('/users', userRoutes)

  app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT)
  })
})
