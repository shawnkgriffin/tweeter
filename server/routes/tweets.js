'use strict'

const userHelper = require('../lib/util/user-helper')

const express = require('express')
const tweetsRoutes = express.Router()

module.exports = function (dataHelpers) {
  /**
  * tweetsRoutes.get('/' sets the route to get the list of tweets.
  * @param {string} / - Routes to /tweets
  * @param {function} function - Calls dataHelpers.getTweets
  */
  tweetsRoutes.get('/', function (req, res) {
    dataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(tweets)
      }
    })
  })
  /**
  * Posts to /tweets which creates a new tweet. 
  * @
  * @param {string} / 
  * @param {string} function (req, res) - the function to act upon the output. 
  */
  tweetsRoutes.post('/', function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' })
      return
    }
    const user = req.session.user ? req.session.user : userHelper.generateRandomUser()
  
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: []
    }

    dataHelpers.saveTweet(tweet, err => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).send()
      }
    })
  })

  return tweetsRoutes
}
