const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const postSchema = require('./schemas/postSchema');
const Post = require('./models/post');
const cors = require('cors');

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

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware
app.use(express.json());

// Add a new post with file upload
app.post('/posts', upload.array('files'), (req, res) => {
  console.log(req.body);
  const { error } = postSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { title, description, author} = req.body;
  let files = [];
  if(req.body.files) {
    files = req.body.files.map((file) => ({
    filename: file.path,
    fileData: file.buffer
  }));
}

  const post = new Post({
    title,
    description,
    author,
    date: new Date(),
    files
  });

  post.save()
    .then(() => {
      res.status(201).json({ message: 'Post created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create post' });
    });
});

// Search posts
app.get('/posts', (req, res) => {
  const { query } = req.query;

  Post.find({ $text: { $search: query } })
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to search posts' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
