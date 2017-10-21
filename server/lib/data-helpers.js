'use strict'

// Defines helper functions for saving and getting tweets, using the database `mongodb`
module.exports = function makeDataHelpers (mongodb) {
  return {
    /**
   * Saves a Tweet to the mongo database.
   * @saveTweet - saves a new tweet.
   * @param {object} newTweet - A newly created tweet to save. 
   * @param {function} callback - The function to call back when the tweet database function returns. 
   * @returns {MongoError} err - An error instance representing the error during the execution.
   * @returns {true} true - result. 
   */
    saveTweet: function (newTweet, callback) {
      mongodb.collection('tweets').insertOne(newTweet, (err, result) => {
        if (err) {
          return callback(err)
        }
        callback(null, true)
      })
    },
    /**
    * Get all the Tweets from the database.
    * calls mongo database and returns an array of all tweets to the callback function.
    * @param {function} callback - the function that you want to process the tweet array when it is returned.  
    * @returns {MongoError} err - An error instance representing the error during the execution.
    * @returns {object} tweets - The result object if the command was executed successfully. In this case an array of tweets. 
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
    },

    /**
    * Get the user information from the database.
    * calls mongo database and a user.
    * @param {function} callback - the function that you want to process the user when it is returned.  
    * @returns {MongoError} err - An error instance representing the error during the execution.
    * @returns {object} tweets - The result object if the command was executed successfully. In this case a single user. 
    */
    getUser: function (email, password, callback) {
      console.log('getUser ', email, password)

      mongodb
        .collection('users')
        .findOne({ 'email': email, 'password': password }, (err, user) => {
          if (err) {
            return callback(err)
          }
          console.log('getUser callback ', user)
          callback(null, user)
        })
    }
  }
}
