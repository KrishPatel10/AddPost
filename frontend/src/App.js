import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostForm from './posts';
import Navbar from './Navbar';

const Home = () => {
  return <h1>Welcome to the Home Page!</h1>;
};

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
