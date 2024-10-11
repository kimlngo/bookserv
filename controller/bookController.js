const {
  FAIL,
  SUCCESS,
  HTTP_200_OK,
  HTTP_404_NOT_FOUND,
} = require('../util/constant');
const BookModel = require('./../model/bookModel');

exports.getAllBooks = async function (req, res, next) {
  const allBooks = await BookModel.find();

  res.status(HTTP_200_OK).json({
    status: SUCCESS,
    results: allBooks.length,
    data: {
      data: allBooks,
    },
  });
};

exports.getBookByISBN = async function (req, res, next) {
  const isbn = `ISBN-${req.params.isbn}`;
  return findOneDocument({ isbn }, `No book found with ${isbn}`, res);
};

exports.getBookBySlug = async function (req, res, next) {
  const slug = req.params.slug;
  return findOneDocument({ slug }, `No book found with slug ${slug}`, res);
};
const findOneDocument = async function (filter, errMsg, res) {
  const book = await BookModel.findOne(filter);

  if (!book)
    return res.status(HTTP_404_NOT_FOUND).json({
      status: FAIL,
      // message: `No book found with ${req.params.isbn}`,
      message: errMsg,
    });

  return res.status(HTTP_200_OK).json({
    status: SUCCESS,
    data: {
      book,
    },
  });
};
