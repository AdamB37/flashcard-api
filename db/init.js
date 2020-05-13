const { MongoClient } = require('mongodb')
// const mongoose = require('mongoose')
// const { Schema } = mongoose

const connect = MongoClient.connect(process.env.DATABASE_URL)
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// const flashcardSchema = new Schema({
//    question: String,
//    answer: String
// })
//
// const Flashcard = db.model('flashcard', flashcardSchema)

// db.createCollection('flashcards')
async function initDb() {
   await connect.then(async (client) => {
      const db = client.db('db')
      // await db.dropDatabase()
      // await db.listCollections().toArray().then(arr => {
      //    arr.map(c => db.dropDatabase(c.name))
      // })
      const collection = db.collection('flashcards')
      if(!collection) {
         await db.createCollection('flashcards')
         await db.collection('flashcards').insertMany(shuffleFlashcards())
      }
   })
}

function shuffleFlashcards() {
   const flashcards = [
      {
         question: "What is the derivative of e^x?",
         answer: "e^x"
      },
      {
         question: "What is the square root of 144?",
         answer: "12"
      },
      {
         question: "What is 2 + 2?",
         answer: "4"
      },
   ]

   function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1))
         let temp = array[i]
         array[i] = array[j]
         array[j] = temp
      }
      return array
   }

   return shuffle(flashcards)
}

module.exports = initDb
