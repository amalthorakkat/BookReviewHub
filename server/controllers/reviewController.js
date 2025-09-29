const Book = require("../models/book");
const Review = require("../models/review");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = new Review({
      book: req.params.id,
      user: req.user._id,
      rating,
      comment,
    });
    await review.save();

    const reviews = await Review.find({ book: req.params.id });
    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    book.averageRating = averageRating;
    book.reviewCount = reviews.length;
    await book.save();

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "email"
    );
    res.status(201).json(populatedReview);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding review", error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (
      req.user.role !== "admin" &&
      review.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }
    await Review.findByIdAndDelete(req.params.reviewId);

    const book = await Book.findById(req.params.id);
    const reviews = await Review.find({ book: req.params.id });
    book.averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    book.reviewCount = reviews.length;
    await book.save();

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting review", error: error.message });
  }
};
