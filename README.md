# bookserv

Bookserv is a Node.js back-end service which exposes REST APIs for querying books by ISBN and title-slug. In addition, bookserv also provides create, update and delete operations.

## API

- GET: /api/v1/books - get all books
- GET: /api/v1/books/{ISBN} - get books by ISBN
- GET: /api/v1/books/{title-slug} - get books by title slug
- POST: /api/v1/books - create a new book in inventory
- PATCH: /api/v1/books - update a book in inventory
- DELETE: /api/v1/books - delete a book in inventory

## Statistic API

- GET: /api/v1/books/stats - get book statistic

## Requirements

- Indexing on ISBN & title-slug

## Book Data

### Structure

Author name,Book Title,Average Rating,Rating Category,Publishing Date,Pages

    {
      ISBN,
      Title,
      Author,
      Average Rating,
      Rating Category,
      Publishing Date,
      Pages,
    }

### Example

#### Book Detail

    {
      isbn: 'ISBN-2025319189',
      author: 'J.K. Rowling',
      title: 'Harry Potter and the Order of the Phoenix (Harry Potter #5)',
      averageRatings: 4.5,
      ratingCategory: 'High',
      publishingDate: 2003-06-21T04:00:00.000Z,
      pages: 912
    }

#### Book Statistic

    {
      "stats": [
        {
            "_id": "HIGH",
            "count": 60,
            "avgPages": 518,
            "avgRatings": 4.26
        },
        {
            "_id": "MEDIUM",
            "count": 26,
            "avgPages": 339,
            "avgRatings": 3.88
        }
      ]
    }
