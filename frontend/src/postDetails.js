import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-16 mb-4">
      <div className="w-3/4 bg-white rounded-lg overflow-hidden">
        <div className="max-w-2xl mx-auto p-4 overflow-auto">
          <h2 className="text-4xl font-bold mb-4 px-2 py-1">{post.title}</h2>
          <p className="text-gray-600 mb-2">Author: {post.author}</p>
          <p className="text-gray-600 mb-2">Upload Option: {post.uploadOption}</p>
          <p className="text-gray-600 mb-4">Date: {post.date}</p>
          <p className="text-lg mb-2">{post.description}</p>
          {post.files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Files:</h3>
              {post.files.map((file, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                  <p className="text-gray-600 mb-2">Filename: {file.filename}</p>
                  <p className="text-gray-600 mb-2">Content Type: {file.contentType}</p>
                  {/* Display file data or any other necessary information */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
