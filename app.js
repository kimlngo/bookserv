const express = require('express');
const bookRouter = require('./router/bookRouter');

const app = express();

app.use(
  express.json({
    limit: '10kb',
  })
);

//Routes
app.use('/api/v1/books', bookRouter);

module.exports = app;
