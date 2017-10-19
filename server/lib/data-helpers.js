"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(mongodb) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log("saveTweet");
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      mongodb.collection("tweets").insertOne(newTweet, (err, result) => {
        if (err) {
          return callback(err);
        }
        console.log("saveTweet callback:", result);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      console.log("getTweets");
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      mongodb
        .collection("tweets")
        .find()
        .toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          console.log("getTweets callback:", tweets);
          callback(null, tweets.sort(sortNewestFirst));
        });
    }
  };
};
