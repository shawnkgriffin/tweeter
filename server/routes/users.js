'use strict'

const userHelper = require('../lib/util/user-helper')

const express = require('express')
const usersRoutes = express.Router()

module.exports = function (dataHelpers) {
  console.log('users datahelpers')
  /**
  * usersRoutes.get('/login' sets the route to get the list of users.
  * @param {string} / - Routes to /users
  * @param {function} function - Calls dataHelpers.getusers
  */
  usersRoutes.get('/login', function (req, res) {
    dataHelpers.getUser(req.query.email, req.query.password, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(user)
      }
    })
  })
  /**
  * Posts to /users/register which creates a new user. 
  * @
  * @param {string} / 
  * @param {string} function (req, res) - the function to act upon the output. 
  */
  usersRoutes.post('/', function (req, res) {
    console.log('user post(', req.body.email, req.body.pwd)
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' })
      return
    }

    const user = req.body.user
      ? req.body.user
      : userHelper.generateRandomUser()
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    }

    dataHelpers.addUser(user, err => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).send()
      }
    })
  })

  return usersRoutes
}
