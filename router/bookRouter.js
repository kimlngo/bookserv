const express = require('express');
const bookCtrl = require('./../controller/bookController');

const router = express.Router();

//get All Books
router.route('/').get(bookCtrl.getAllBooks).post(bookCtrl.createNewBook);

//get Books by ISBN
router
  .route('/ISBN-:isbn')
  .get(bookCtrl.getBookByISBN)
  .delete(bookCtrl.deleteBookByISBN);

//get book by slug
router
  .route('/:slug')
  .get(bookCtrl.getBookBySlug)
  .delete(bookCtrl.deleteBookBySlug);

module.exports = router;
