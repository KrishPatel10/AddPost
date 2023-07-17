import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadOption, setUploadOption] = useState('personal');

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const updatedFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileType = e.target.result.split(';')[0].split(':')[1];
        updatedFiles.push({ file, fileType });

        if (updatedFiles.length === selectedFiles.length) {
          setFiles(updatedFiles);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadOptionChange = (event) => {
    setUploadOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('uploadOption', uploadOption);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i].file);
    }

    try {
      await axios.post('http://localhost:5000/posts/addpost', formData);
      // Post successfully added, you can redirect or show a success message
      navigate('/posts/all');
    } catch (error) {
      console.log('Error adding post:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-2xl w-full px-4">
        <h1 className="text-3xl font-bold mb-4">Add Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-700 font-semibold mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={handleAuthorChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="file" className="block text-gray-700 font-semibold mr-2">
              Files
            </label>
            <label
              htmlFor="file"
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-200"
            >
              Upload Files
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
            </label>
            {files.length > 0 && (
              <span className="-2 text-gray-700">{files.length} Files Selected</span>
            )}
          </div>
          <div className="flex items-center">
            <label htmlFor="uploadOption" className="block text-gray-700 font-semibold mr-2">
              Upload Option
            </label>
            <select
              id="uploadOption"
              value={uploadOption}
              onChange={handleUploadOptionChange}
              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="personal">Personal</option>
              <option value="community">Community</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
