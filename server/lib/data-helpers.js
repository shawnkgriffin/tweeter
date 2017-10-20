'use strict'

// Defines helper functions for saving and getting tweets, using the database `mongodb`
module.exports = function makeDataHelpers (mongodb) {
  return {
    /*
    * Insert a new tweet into the database.
    */
    saveTweet: function (newTweet, callback) {
      mongodb.collection('tweets').insertOne(newTweet, (err, result) => {
        if (err) {
          return callback(err)
        }
        callback(null, true)
      })
    },
    /*
    * Get all tweets in `db`, sorted by newest first
    */
    getTweets: function (callback) {
      mongodb
        .collection('tweets')
        .find()
        .toArray((err, tweets) => {
          if (err) {
            return callback(err)
          }
          const sortNewestFirst = (a, b) => a.created_at - b.created_at
          callback(null, tweets.sort(sortNewestFirst))
        })
    }
  }
}
