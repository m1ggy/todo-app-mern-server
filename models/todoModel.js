const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  done: Boolean,
  description: String,
  datePosted: Date,
});

const todo = mongoose.model('todo', todoSchema);
module.exports = { todo };
