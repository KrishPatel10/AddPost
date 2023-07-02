const { Client } = require('@elastic/elasticsearch');

// Create an Elasticsearch client instance
const username = 'elastic'
const password = 'gMgOt5IL5xGbuceU2HHpEgug'

const client = new Client({
  cloud: { id: '2a98bffcd2704f97afd89409f74e84b9:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGM4NWMyMDYxYmE2OTRlNTc5MTBkYWRlNDM5MGE5ZTA5JDRlNDI3NjUxYTkzYzQ2ZTk5NjIwZTk3YTg2MTQ5YmY0' },
  auth: { 
    username: username,
    password: password
   }
})

// Function to generate a random ID
function generateRandomID() {
  return Math.random().toString(36).substring(2, 15);
}

// Function to add a random document
async function addRandomDocument() {
  try {
    // Generate a random ID
    const id = generateRandomID();

    // Random description and title
    const description = 'This is a random description.';
    const title = 'Random Title';

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
    // Close the Elasticsearch client connection
    client.close();
  }
}

// Call the addRandomDocument function
addRandomDocument();
addRandomDocument();
addRandomDocument();
addRandomDocument();
addRandomDocument();
addRandomDocument();
addRandomDocument();
addRandomDocument();
