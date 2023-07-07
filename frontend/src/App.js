import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddPost from './addPosts';
import Navbar from './Navbar';
import Home from './Home/home';
import PostDetails from './postDetails';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/posts/addpost" element={<AddPost />} />
          <Route exact path="/posts/all" element={<Home />} />
          <Route exact path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
