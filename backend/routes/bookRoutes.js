const express = require("express");
const { getBooks, getBook, createBook, updateBook, deleteBook } = require("../controllers/bookController");
const { auth, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", auth, adminOnly, createBook);
router.put("/:id", auth, adminOnly, updateBook);
router.delete("/:id", auth, adminOnly, deleteBook);

module.exports = router;

