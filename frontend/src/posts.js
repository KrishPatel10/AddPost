import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a post object with the input values and files
    const post = {
      title,
      description,
      author,
      files,
    };

    console.log(post);

    axios.post('http://localhost:3000/posts', post)
    .then(response => {
      console.log(response.data);
      // Reset the form
      setTitle('');
      setDescription('');
      setAuthor('');
      setFiles([]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto text-white bg-darkbg p-4 shadow-md rounded-md mt-12">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block mb-1">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded px-2 py-1 text-black"
        />
      </div>
      <div className="mb-4">
        <div
          {...getRootProps()}
          className={`border rounded p-4 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop files here, or click to select files</p>
          )}
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <p>Selected Files:</p>
            <ul>
              {files.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};
export default PostForm;