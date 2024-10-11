const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const BookModel = require('./../../model/bookModel');
const { ENV } = require('./../../util/constant');
const { generateISBN } = require('./../../util/isbn');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB_CONNECTION = ENV.DATABASE.replace('<PASSWORD>', ENV.DATABASE_PASSWORD);

const IMPORT = '--import';
const DELETE = '--delete';

mongoose.connect(DB_CONNECTION).then(function () {
  console.log('DB Connection Successful');
  console.log(`operation = ${process.argv[2]}`);

  if (process.argv[2] === IMPORT) {
    importData();
  } else if (process.argv[2] === DELETE) {
    deleteData();
  } else {
    console.log('unsupported command - exit now!');
  }
});

async function importData() {
  let bookArr = [];
  fs.createReadStream('./dev-data/data/books.csv')
    .pipe(csv())
    .on('data', function (data) {
      try {
        bookArr.push({
          isbn: generateISBN(),
          author: data.AuthorName,
          title: data.BookTitle,
          averageRatings: Number(data.AverageRating),
          ratingCategory: data.RatingCategory,
          publishingDate: new Date(data.PublishingDate),
          pages: Number(data.Pages),
        });
      } catch (err) {
        console.error(err);
      }
    })
    .on('end', async function () {
      await BookModel.create(bookArr);
      console.log('import completed');
      process.exit();
    });
}

async function deleteData() {
  try {
    const res = await BookModel.deleteMany();
    console.log(res);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
