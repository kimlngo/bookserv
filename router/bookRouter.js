const express = require('express');
const bookCtrl = require('./../controller/bookController');

const router = express.Router();

router.route('/').get(bookCtrl.getAllBooks);

module.exports = router;
