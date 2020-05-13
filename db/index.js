const { MongoClient, ObjectID } = require('mongodb')

const connect = MongoClient.connect(process.env.DATABASE_URL)

const findAllFlashcardsDb = async () => {
   const client = await connect
   const db = client.db('db')
   // TODO: limit flashcards to 10 (paged)
   return db.collection('flashcards').find({}).toArray()
}

const findFlashcardByIdDb = async (id) => {
   const client = await connect
   const db = client.db('db')
   return db.collection('flashcards').findOne({_id: ObjectID(id)})
}

const findFlashcardByDataDb = async (data) => {
   const client = await connect
   const db = client.db('db')
   const q = {question: data.question, answer: data.answer}
   return db.collection('flashcards').findOne(q)
}

const createFlashcardDb = async (data) => {
   const client = await connect
   const db = client.db('db')
   const q = {question: data.question, answer: data.answer}
   return db.collection('flashcards').insertOne(q)
}

const updateFlashcardDb = async (id, data) => {
   const client = await connect
   const db = client.db('db')
   const q = {$set: {question: data.question, answer: data.answer}}
   return db.collection('flashcards').updateOne({_id: ObjectID(id)}, q)
}

const deleteFlashcardDb = async (id) => {
   const client = await connect
   const db = client.db('db')
   return db.collection('flashcards').deleteOne({_id: ObjectID(id)})
}



module.exports = {
   findAllFlashcardsDb,
   findFlashcardByIdDb,
   findFlashcardByDataDb,
   createFlashcardDb,
   updateFlashcardDb,
   deleteFlashcardDb
}
