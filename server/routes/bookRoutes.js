const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const upload = require("../config/multerConfig");

router.post(
  "/",
  auth(["user", "admin"]),
  upload.single("image"),
  bookController.addBook
);
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookDetails);
router.delete("/:id", auth(["admin"]), bookController.deleteBook);
router.post(
  "/:id/reviews",
  auth(["user", "admin"]),
  reviewController.addReview
);
router.delete(
  "/:id/reviews/:reviewId",
  auth(["user", "admin"]),
  reviewController.deleteReview
);

module.exports = router;
