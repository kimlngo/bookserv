const {
  FAIL,
  SUCCESS,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_404_NOT_FOUND,
} = require('../util/constant');
const { generateISBN } = require('./../util/isbn');
const BookModel = require('./../model/bookModel');

const ALLOWABLE_FIELDS = [
  'title',
  'author',
  'averageRatings',
  'ratingCategory',
  'publishingDate',
  'pages',
];

const UPDATE_OPTIONS = {
  new: true,
  runValidators: true,
};

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
      message: errMsg,
    });

  return res.status(HTTP_200_OK).json({
    status: SUCCESS,
    data: {
      book,
    },
  });
};

exports.createNewBook = async function (req, res, next) {
  const body = req.body;

  const insertBook = {
    isbn: generateISBN(),
    author: body.author,
    title: body.title,
    averageRatings: body.averageRatings,
    ratingCategory: body.ratingCategory,
    publishingDate: new Date(body.publishingDate),
    pages: body.pages,
  };

  const book = await BookModel.create(insertBook);

  res.status(HTTP_201_CREATED).json({
    status: SUCCESS,
    data: { book },
  });
};

exports.deleteBookByISBN = async function (req, res, next) {
  const isbn = `ISBN-${req.params.isbn}`;
  return deleteOne({ isbn }, `No book found with ${isbn}`, res);
};

exports.deleteBookBySlug = async function (req, res, next) {
  const slug = req.params.slug;
  return deleteOne({ slug }, `No book found with slug ${slug}`, res);
};

async function deleteOne(condition, errorMsg, res) {
  const response = await BookModel.deleteOne(condition);

  if (response?.deletedCount !== 1) {
    return res.status(HTTP_404_NOT_FOUND).json({
      status: FAIL,
      message: errorMsg,
    });
  }

  return res.status(HTTP_204_NO_CONTENT).json({
    status: SUCCESS,
    data: null,
  });
}

exports.updateBookByISBN = async function (req, res, next) {
  const isbn = `ISBN-${req.params.isbn}`;
  const filter = { isbn };

  return updateBook(filter, req, res, `Fail to update book with ${isbn}`);
};

exports.updateBookBySlug = async function (req, res, next) {
  const slug = req.params.slug;
  const filter = { slug };

  return updateBook(filter, req, res, `Fail to update book with slug ${slug}`);
};

async function updateBook(filter, req, res, errorMsg) {
  let updateBody = {};

  //filter to only allow update certain fields
  ALLOWABLE_FIELDS.forEach(field => {
    if (req.body[`${field}`]) {
      updateBody[`${field}`] = req.body[`${field}`];
    }
  });

  const updatedBook = await BookModel.findOneAndUpdate(
    filter,
    updateBody,
    UPDATE_OPTIONS,
  );

  if (!updatedBook) {
    return res.status(HTTP_404_NOT_FOUND).json({
      status: FAIL,
      message: errorMsg,
    });
  }

  return res.status(HTTP_200_OK).json({
    status: SUCCESS,
    data: {
      book: updatedBook,
    },
  });
}

exports.getBookStats = async function (req, res, next) {
  const stats = await BookModel.aggregate([
    {
      $group: {
        _id: { $toUpper: '$ratingCategory' },
        count: { $sum: 1 },
        avgPages: { $avg: '$pages' },
        avgRatings: { $avg: '$averageRatings' },
      },
    },
    {
      $addFields: {
        avgPages: { $round: ['$avgPages', 0] },
        avgRatings: { $round: ['$avgRatings', 2] },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(HTTP_200_OK).json({
    status: SUCCESS,
    data: {
      stats,
    },
  });
};
