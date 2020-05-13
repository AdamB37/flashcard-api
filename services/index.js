const {
   findAllFlashcardsDb,
   findFlashcardByIdDb,
   findFlashcardByDataDb,
   createFlashcardDb,
   updateFlashcardDb,
   deleteFlashcardDb
} = require('../db')

const findAllFlashcards = async () => {
   try {
      let records = await findAllFlashcardsDb()
      return records.map(r => {
         return {
            id: r._id,
            answer: r.answer,
            question: r.question
         }
      })
   } catch(e) {
      throw new Error(e.message)
   }
}

const findOneFlashcard = async (id, data) => {
   try {
      let record
      if(id) {
         record = await findFlashcardByIdDb(id)
      } else {
         record = await findFlashcardByDataDb(data)
      }
      console.log('record', record)
      if(record) {
         return {
            id: record._id,
            answer: record.answer,
            question: record.question
         }
      }
      return 0
   } catch(e) {
      throw new Error(e.message)
   }
}

const createFlashcard = async (data) => {
   try {
      await createFlashcardDb(data)
      return 1
   } catch(e) {
      throw new Error(e.message)
   }
}

const updateFlashcard = async (id, data) => {
   try {
      await updateFlashcardDb(id, data)
      return 1
   } catch(e) {
      throw new Error(e.message)
   }
}

const removeFlashcard = async (id) => {
   try {
      await deleteFlashcardDb(id)
      return 1
   } catch(e) {
      throw new Error(e.message)
   }
}

module.exports = {
   findAllFlashcards,
   findOneFlashcard,
   createFlashcard,
   updateFlashcard,
   removeFlashcard
}
