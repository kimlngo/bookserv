const express = require('express');
const bookCtrl = require('./../controller/bookController');

const router = express.Router();

//get All Books
router.route('/').get(bookCtrl.getAllBooks);

//get Books by ISBN
router.route('/ISBN-:isbn').get(bookCtrl.getBookByISBN);

//get book by slug
router.route('/:slug').get(bookCtrl.getBookBySlug);

module.exports = router;
