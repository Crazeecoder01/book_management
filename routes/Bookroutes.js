const express = require('express');
const router = express.Router();
const Book = require('../model/Books');


router.post('/', postBook);
router.get('/', getBooks);
router.get('/:id', getBook, getBookById);
router.patch('/:id', getBook, updateBook);
router.delete('/:id', getBook, deleteBook);

async function postBook(req, res) {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
        console.log("Book added successfully");
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function getBooks(req, res) {
    try {
        const book = await Book.find();
        res.json(book);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function getBookById(req, res) {
    res.json(res.book);
}

// middleware
async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Book not found/ wrong id" });
    }
    res.book = book
    next();
}

async function updateBook(req, res) {
    if (req.body.title != null) {
        res.book.title = req.body.title;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }
    if (req.body.summary != null) {
        res.book.summary = req.body.summary;
    }
    try {
        const updateBook = await res.book.save();
        res.json(updateBook);
    }
    catch {
        res.status(400).json({ message: "Book not found" });
    }
}

async function deleteBook(req, res) {
    try {
        await Book.findByIdAndDelete(req.params.id);
        // or use--->
        // await Book.deleteOne({_id: req.params.id});
        res.json({ message: "Book deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Book not found" });
    }
}

module.exports = router