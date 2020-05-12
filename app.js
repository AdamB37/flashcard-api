require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const initDb = require('./db/init')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('App is working'))

app.use('/api', routes)

app.listen(3001, () => console.log('\n\n--->>>>>Flashcard api listening on port 3001<<<<--------\n\n'))

const connect = MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
connect.then(db => {
   console.log('\n\n---->>>CONNECTED TO DATABASE<<<-------\n\n')
   initDb()
})

module.exports = {
   app
}
