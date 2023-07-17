import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postId}`);
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.log('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [postId, comments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
        content: comment, user: 'Test User'
      });
      const newComment = response.data;
      setComments([...comments, newComment]);
      setComment('');
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

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
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Comments:</h3>
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                <p className="text-gray-600 mb-2">{comment.content}</p>
                <p className="text-gray-600 mb-2">User: {comment.user}</p>
                {/* <p className="text-gray-600 mb-2">Date: {comment.date}</p> */}
              </div>
            ))}
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
