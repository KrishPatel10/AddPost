const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const postSchema = require('./schemas/postSchema');
const Post = require('./models/post');
const cors = require('cors');
const postRouter = require('./Routers/posts');

const app = express();
const port = 3000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://KrishPatel:KrishPatel@posts.bgf3wlr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

app.use('/posts', postRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
