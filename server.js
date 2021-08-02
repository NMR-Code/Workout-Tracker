const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

mongoose.connect(
   process.env.MONGODB_URI || 'mongodb://localhost:27017/workout',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   }
)

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

// routes
app.use(require('./routes'))

app.listen(PORT, () => {
   console.log(`App running on port ${PORT}!`)
})
