const { MongoClient } = require('mongodb')

const connect = MongoClient.connect(process.env.DATABASE_URL)

const flashcardsDb = async () => {
   const client = await connect
   const db = client.db('db')
   return db.collection('flashcards').find({}).toArray()
}

module.exports = {
   flashcardsDb
}
