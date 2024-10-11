const { HTTP_200_OK, SUCCESS } = require('../util/constant');
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
