const express = require('express')
const {
   getFlashcards,
   getFlashcard,
   postFlashcard,
   putFlashcard,
   deleteFlashcard
} = require('../controllers')

const router = express.Router()

router.route('/flashcards')
.get(getFlashcards) //plural
.post(postFlashcard) //singular

router.route('/flashcards/:cardId') //all singular
.get(getFlashcard)
.put(putFlashcard)
.delete(deleteFlashcard)

module.exports = router
