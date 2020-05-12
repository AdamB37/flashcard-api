const express = require('express')
const { flashcardsController } = require('../controllers')

const router = express.Router()

router.get('/flashcards', flashcardsController)

module.exports = router
