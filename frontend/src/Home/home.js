import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts/all');
      setPosts(response.data);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="bg-white rounded-lg shadow-md p-4 h-44">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">
                {truncateDescription(post.description, 150)}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500 text-sm">{post.author}</span>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
