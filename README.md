RESTful Library Management API
Project Overview
A RESTful API for managing authors and books using Node.js, Express, and SQLite.
Features include Create, Read, and Update operations, filtering, sorting, pagination, and input validation.
Project Structure
yipl-backend-2025/├── db/                    # Database setup and helpers          ├── src/│   ├── controllers/       # Authors & Books controllers│   ├── routes/            # Express route files│   ├── validators/        # Authors & Books validation│   └── app.js├── .gitignore├── package-lock.json├── package.json├── README.md└── server.js
Setup


Clone the repository
git clone https://github.com/Suyash-Dhakal/yipl-backend-2025.gitcd yipl-backend-2025


Install dependencies
npm install


Initialize the database
node db/initDb.js


Run the project
Start server:
npm start


API Endpoints
Authors

GET /authors – List all authors
Query params: name, order, page, limit
POST /authors – Create a new author
GET /authors/:id – Get a single author with their books

Books

GET /books – List all books
Query params: title, author, year, sort, order, page, limit
POST /books – Create a new book
PUT /books/:id – Update a book

Dependencies

express – Web framework for Node.js
nodemon – Auto-restart server on file changes (development only)
sqlite3 – Database engine for storing authors and books

Notes

Input validations are implemented for authors and books.
Pagination, filtering, and sorting are supported on list endpoints.
Error handling includes:

400 – Bad Request
404 – Resource not found
500 – Internal server error
201 – Resource created successfully



Examples
Authors (GET /authors)
Request: /authors?name=Laxmi&order=asc&page=1&limit=10

name=Laxmi → filter authors containing “Laxmi”
order=asc → sort by book count ascending
page=1 → first page
limit=10 → 10 authors per page

Books (GET /books)
Request: /books?title=Summer&author=Subin&year=2012&sort=title&order=asc&page=1&limit=5

title=Summer → partial match on book title
author=Subin → partial match on author name
year=2012 → exact published year
sort=title → sort by title
order=asc → ascending order
page=1, limit=5 → pagination
