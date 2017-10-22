'use strict'
/**
 * @swagger
 * definitions:
 *  Avatar:
 *    type: object
 *    properties: 
 *      small:
 *        type: string
 *        format: url
 *       medium:
 *        type: string
 *        format: url
 *      large:
 *        type: string
 *        format: url
 * 
 *   User:
 *     type: object
 *     required:
 *       - _id
 *       - name
 *       - handle
 *     properties:
 *       _id : 
 *        type: string
 *      name:
 *         type: string
 *       handle:
 *         type: string
 *       allOf:
 *        - $ref: '#/definitions/Avatar'
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type:string
 *         format: password
 *   TweetUser:
 *     type: object
 *     required:
 *       - name
 *       - handle
 *     properties:
 *       name:
 *         type: string
 *       handle:
 *         type: string
 *       allOf:
 *        - $ref: '#/definitions/Avatar'
 *   Tweet:
 *     type: object
 *     required:
 *       - _id
 *       - user
 *       - content
 *       - created_at
 *       - likes
 *     properties:
 *       _id : 
 *          type: string*     
 *       allOf:
 *          - $ref: '#/definitions/TweetUser'
 *       - content:
 *          type: string;
 *       - created_at: 
 *          type: date
 *          format: date
 *       - likes:
 *          type: array
 */

const userHelper = require('../lib/util/user-helper')

const express = require('express')
const likesRoutes = express.Router()

module.exports = function (dataHelpers) {
  /**
  * likesRoutes.get('/' sets the route to get the list of tweets.
  * @param {string} / - Routes to /tweets
  * @param {function} function - Calls dataHelpers.getTweets
  */
  /**
 * @swagger
 * /likes:
 *   post:
 *    summary: Adds a like to an existing user. 
 *    tags:
 *       - Tweets
 *     description: Adds a like from handle to tweets pointed at by tweetID
 *     produces:
 *       - application/json
 *     parameters:
 *       - tweetID: string
 *         description: ObjectID of tweet to like
 *         in: body
 *         required: true
 *         type: string
 *      - handle: string
 *         description: user handle to add to likes array in tweet.
 *         in: body
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: Successfully added like
 */
  likesRoutes.post('/', function (req, res) {
    console.log('likesRoutes.post(/(', req.query.tweetID, req.query.handle )
    dataHelpers.likeTweet(true, req.query.tweetID, req.query.handle, err => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(200)
      }
    })
  })

  likesRoutes.delete('/', function (req, res) {
    console.log('likesRoutes.delete(/(', req.query.tweetID, req.query.handle)
    dataHelpers.likeTweet(false, req.query.tweetID, req.query.handle, err => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(200)
      }
    })
  })

  return likesRoutes
}
