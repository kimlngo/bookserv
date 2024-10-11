const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
  {
    ISBN: {
      type: String,
      require: [true, 'A book must have ISBN number'],
    },
    title: {
      type: String,
      require: [true, 'A book must have title'],
    },
    author: {
      type: String,
      require: [true, 'A book must have author(s)'],
    },
    averageRatings: {
      type: Number,
      min: [1, 'Minimum Rating is 1'],
      max: [5, 'Maximum Rating is 5'],
    },
    ratingCategory: {
      type: String,
      require: [true, 'A book must have rating category'],
      enum: ['High', 'Medium', 'Low'],
    },
    publishingDate: {
      type: Date,
      require: [true, 'A book must have publishing date'],
    },
    pages: Number,
    slug: String,
  },
  //to disable __v in the output
  { toJSON: { versionKey: false } },
  { toObject: { versionKey: false } },
);

bookSchema.index({ ISBN: 1 });
bookSchema.index({ slug: 1 });

//creating slug before saving
bookSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const BookModel = new mongoose.model('Book', bookSchema);
module.exports = BookModel;
