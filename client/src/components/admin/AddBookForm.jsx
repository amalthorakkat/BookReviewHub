import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../redux/slices/booksSlice";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.books);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBook({ title, author, genre, image })).unwrap();
      setTitle("");
      setAuthor("");
      setGenre("");
      setImage(null);
    } catch (err) {
      console.error("Add book error:", err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">
            Cover Image (optional)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
