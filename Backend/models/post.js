const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: String,
  files: [{
    filename: String,
    contentType: String,
    fileData: Buffer
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
