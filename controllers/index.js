const { flashcardsService } = require('../services')

const flashcardsController = async (req, res, next) => {
   console.log('inside controller ')
   try {
      const flashcards = await flashcardsService()
      // console.log(flashcards)
      res.set({
         "Access-Control-Allow-Origin" : "*",
         "Access-Control-Allow-Credentials" : true
      })
      .json({flashcards})
      .send()
   } catch(e) {
      console.error(e.message)
      res.sendStatus(500) && next(e)
   }
}

module.exports = {
   flashcardsController
}
