import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  return (
    <div className="h-1/7 flex w-full z-50 top-0 fixed bg-redd mb-12">
      <div className="w-1/2 flex">
        <ul className="flex text-white">
          <li className="px-5">
            <Link to="/posts/all" className="hover:text-darkbg">
              <h2 className="text-2xl font-bold">Home</h2>
            </Link>
          </li>
          <li className="px-5">
            <Link to="/profile" className="hover:text-darkbg">
              <h2 className="text-2xl font-bold">Profile</h2>
            </Link>
          </li>
          <li className="px-5">
            <Link to="/posts/addpost" className="hover:text-darkbg">
              <h2 className="text-2xl font-bold">Add Post</h2>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <ul className="flex text-white">
          <li className="px-5">
            <Link to="/" className="hover:text-darkbg">
              <h2 className="text-2xl font-bold">Logout</h2>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
