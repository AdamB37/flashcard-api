const {
   findAllFlashcards,
   findOneFlashcard,
   createFlashcard,
   updateFlashcard,
   removeFlashcard
} = require('../services')

const headers = {
   "Access-Control-Allow-Origin" : "*",
   "Access-Control-Allow-Credentials" : true
}
const getFlashcards = async (req, res, next) => {
   res.set(headers)
   try {
      const records = await findAllFlashcards()
      res.json({flashcards: records}).send()
   } catch(e) {
      console.error(e.message)
      res.sendStatus(500) && next(e)
   }
}

const getFlashcard = async (req, res, next) => {
   res.set(headers)
   const id = req.params.cardId
   if(!id) {
      res.sendStatus(400)
      return
   }

   try {
      const record = await findOneFlashcard(id)
      if(!record) {
         res.sendStatus(404)
         return
      }
      res.json({flashcard: record}).send()
   } catch(e) {
      console.error(e.message)
      res.sendStatus(500) && next(e)
   }
}

const postFlashcard = async (req, res, next) => {
   res.set(headers)
   const data = req.body
   if(!data) {
      res.status(400).send('Bad request')
      return
   }
   const existingRecord = await findOneFlashcard(null, data)
   if(existingRecord) {
      res.status(400).send('Record already exists.')
      return
   }

   try {
      const record = await createFlashcard(data)
      res.sendStatus(200)
   } catch(e) {
      console.error(e.message)
      res.sendStatus(500) && next(e)
   }
}

const putFlashcard = async (req, res, next) => {
   res.set(headers)
   const id = req.params.cardId
   const data = req.body
   if(!id || !data) {
      res.status(400).send('Bad request')
      return
   }

   const existingRecord = await findOneFlashcard(id)
   if(!existingRecord) {
      res.sendStatus(404)
      return
   }

   try {
      const record = await updateFlashcard(id, data)
      res.sendStatus(200)
   } catch(e) {
      console.error(e.message)
      res.sendStatus(500) && next(e)
   }
}

const deleteFlashcard = async (req, res, next) => {
   const id = req.params.cardId
   res.set(headers)
   if(!id) {
      res.status(400).send('Bad request')
      return
   }

   try {
      await removeFlashcard(id)
      res.sendStatus(200)
   } catch(e) {
      console.error(e.message)
      res.sendStatus(500) && next(e)
   }
}


module.exports = {
   getFlashcards,
   getFlashcard,
   postFlashcard,
   putFlashcard,
   deleteFlashcard
}
