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
    maxlength: 5000
  },
  author: {
    type: String,
    required: true
  },
  uploadOption: {
    type: String,
    enum: ['personal', 'community'],
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  },
  files: [{
    filename: String,
    contentType: String,
    fileData: Buffer
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
