const express = require('express');
const router = express.Router();
const { Client } = require('@elastic/elasticsearch');
const multer = require('multer');
const postSchema = require('../Validation/postSchema');
const commentValidationSchema = require('../Validation/commentValidationSchema');

const username = 'elastic'
const password = 'gMgOt5IL5xGbuceU2HHpEgug'

const client = new Client({
  cloud: { id: '2a98bffcd2704f97afd89409f74e84b9:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGM4NWMyMDYxYmE2OTRlNTc5MTBkYWRlNDM5MGE5ZTA5JDRlNDI3NjUxYTkzYzQ2ZTk5NjIwZTk3YTg2MTQ5YmY0' },
  auth: { 
    username: username,
    password: password
   }
});


// Import the Post model
const Post = require('../models/post');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function createIndex() {
    try {
      // Define the index and its mapping
      const indexName = 'posts';
  
      const indexSchema = {
        settings: {
          analysis: {
            analyzer: {
              custom_analyzer: {
                tokenizer: 'standard',
                filter: [
                  'lowercase',
                  'asciifolding',
                  'english_stop',
                  'english_stemmer',
                ],
              },
            },
            filter: {
              english_stop: {
                type: 'stop',
                stopwords: '_english_',
              },
              english_stemmer: {
                type: 'stemmer',
                language: 'english',
              },
            },
          },
        },
        mappings: {
          properties: {
            post: {
              properties: {
                description: {
                  type: 'text',
                  analyzer: 'custom_analyzer',
                },
                title: {
                  type: 'text',
                  analyzer: 'custom_analyzer',
                },
                id_mongo: {
                  type: 'keyword',
                },
              },
            },
          },
        },
      };
  
      // Create the index
      const response = await client.indices.create({
        index: indexName,
        body: indexSchema,
      });
  
      console.log(`Index "${indexName}" created successfully.`);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
    }
  }
  
  // Function to perform a search query
  async function searchDocuments(qury) {
    try {
      let body = await client.search({
        index: 'posts',
        body: {
          query: {
            multi_match: {
              query: qury,
              fields: ['description', 'title'],
            },
          },
        },
      });
  
      // Extract relevant information from the search response
    // console.log(body);

    // const hits = await body.hits.hits.map((hit) => ({
    //     id: hit._id,
    //     score: hit._score,
    //     description: hit._source.description,
    //     title: hit._source.title,
    // }));

        return body.body.hits.hits;
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
    }
  }
  
  // Function to add a random document
  async function addDocument(obj) {
    try {
      // Random description and title
      const description = obj.description;
      const title = obj.title;
      const id = obj.id;
  
      // Create the document
      const response = await client.index({
        index: 'posts',
        id: id,
        body: {
          description: description,
          title: title,
          id_mongo: id,
        },
      });
  
      console.log(`Document with ID ${response.body._id} created successfully.`);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
    }
  };

router.post('/addPost', upload.array('files'), (req, res) => {
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
      if(files) {files}
    });
  
    const id = post._id.toString();
  
    // Add the post to ElasticSearch using addRandomDocument function
    addDocument({ description, title, id });
  
    post.save()
      .then(() => {
        res.status(201).json({ message: 'Post created successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
  
  //write a get request to get all posts
  router.get('/all', (req, res) => {
    Post.find()
      .then((posts) => {
        res.json(posts);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to search posts' });
      });
  });

router.post('/searchq', async (req, res) => {
    console.log(req.body);
    const query = req.body.query;
    if(!query) {
        return;
    }
    res.json({ rs: await searchDocuments(query) });
});
  
  // Get a single post by ID
  router.get('/:id', (req, res) => {
    const postId = req.params.id;
  
    // Find the post by ID in the database
    Post.findById(postId)
      .then((post) => {
        if (!post) {
          // If the post is not found, return a 404 status code
          return res.status(404).json({ error: 'Post not found' });
        }
        
        // If the post is found, return it in the response
        res.json(post);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  

router.post('/:postId/comments', async (req, res) => {
  try {
    const { error } = commentValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const postId = req.params.postId;
    const { content, user } = req.body;

    // Find the post by postId
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Add the comment to the post's comments array
    const newComment = { content, user };
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.log('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;  