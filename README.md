# bookserv

Bookserv is a Node.js back-end service which exposes REST APIs for querying books by ISBN and title-slug. In addition, bookserv also provides create, update and delete operations.

## API

- GET: /api/v1/books - get all books
- GET: /api/v1/books/{ISBN} - get books by ISBN
- GET: /api/v1/books/{title-slug} - get books by title slug
- POST: /api/v1/books - create a new book in inventory
- PATCH: /api/v1/books - update a book in inventory
- DELETE: /api/v1/books - delete a book in inventory

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

    {
      <TBD>
    }
