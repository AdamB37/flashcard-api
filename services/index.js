const { flashcardsDb } = require('../db')

const flashcardsService = async () => {
   try {
      let records = await flashcardsDb()
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

module.exports = {
   flashcardsService
}
