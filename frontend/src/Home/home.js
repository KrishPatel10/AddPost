import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [searchResults]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts/all');
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/posts/searchq', {
        query: searchQuery
      });
      setSearchResults(response.data.rs);
      console.log(response.data.rs);
    } catch (error) {
      console.log('Error searching posts:', error);
    }
  };

  const getSearchedPosts = async (e) => {
    try {
      setSearchQuery(e.target.value);
      // if(searchQuery === '') {setSearchQuery(''); return;}
      const response = await axios.post('http://localhost:5000/posts/searchq', {
        query: searchQuery
      });
      setSearchResults(response.data.rs);
      console.log(response.data.rs);
    } catch (error) {
      console.log('Error searching posts:', error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description && description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className="container mx-auto mt-12">
      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={getSearchedPosts}
          placeholder="Search"
          className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
          Search
        </button>
      </form>
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.length > 0
          ? searchResults.map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id}>
                {/* console.log({post._source}); */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-bold mb-2">{post._source.title}</h2>
                  <p className="text-gray-600">
                    {truncateDescription(post._source.description, 150)}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-500 text-sm">{post.author}</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                </div>
              </Link>
            ))
          : posts.map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <div className="bg-white rounded-lg shadow-md p-4">
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
