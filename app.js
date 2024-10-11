const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./router/bookRouter');

const app = express();

app.use(
  express.json({
    limit: '10kb',
  }),
);

//morgan dev log
app.use(morgan('dev'));

//Routes
app.use('/api/v1/books', bookRouter);

module.exports = app;
