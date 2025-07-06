const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note
