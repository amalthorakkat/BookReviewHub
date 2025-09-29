const Book = require("../models/book");
const Review = require("../models/review");

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const book = new Book({ title, author, genre, image });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding book", error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching books", error: error.message });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    const reviews = await Review.find({ book: req.params.id })
      .populate("user", "email")
      .sort({ createdAt: -1 });
    res.status(200).json({ book, reviews });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching book details", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    await Review.deleteMany({ book: req.params.id });
    res.status(200).json({ message: "Book and its reviews deleted" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting book", error: error.message });
  }
};
