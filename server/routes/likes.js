'use strict'

const userHelper = require('../lib/util/user-helper')

const express = require('express')
const likesRoutes = express.Router()

module.exports = function (dataHelpers) {
  /**
  * likesRoutes.get('/' sets the route to get the list of tweets.
  * @param {string} / - Routes to /tweets
  * @param {function} function - Calls dataHelpers.getTweets
  */
  likesRoutes.get('/', function (req, res) {
    dataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(tweets)
      }
    })
  })
  /**
  * Posts to /likes which adds a like to that tweet. 
  * @
  * @param {string} / 
  * @param {string} function (req, res) - the function to act upon the output. 
  */
  likesRoutes.post('/', function (req, res) {
    console.log('Server/likes', req.body.handle, req.body.tweetID)
  })

  return likesRoutes
}
