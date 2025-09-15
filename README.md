# RESTful Library Management API

## Project Overview
A RESTful API for managing authors and books using **Node.js**, **Express**, and **SQLite**.  
Features include **Create, Read, and Update operations**, filtering, sorting, pagination, input validation and global rate limiting to protect the API.

## Project Structure
```bash
yipl-backend-2025/
├── db/                    # Database setup and helpers          
├── src/
│   ├── controllers/       # Authors & Books controllers
│   ├── routes/            # Express route files
│   ├── validators/        # Authors & Books validation
│   ├── utils/             # Reusable utility (Redis client)
│   ├── middleware/        # Custom middleware (rate limiting)
│   └── app.js
│
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```
## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suyash-Dhakal/yipl-backend-2025.git
   cd yipl-backend-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   node db/initDb.js
   ```

4. **Start Redis server**
     ```bash
     redis-server
     ```
4. **Run the project**
   Start server:
     ```bash
     npm start
     ```


## API Endpoints

### Authors
- **GET** `/authors` – List all authors  
  _Query params_: `name`, `order`, `page`, `limit`
- **POST** `/authors` – Create a new author
- **GET** `/authors/:id` – Get a single author with their books

### Books
- **GET** `/books` – List all books  
  _Query params_: `title`, `author`, `year`, `sort`, `order`, `page`, `limit`
- **POST** `/books` – Create a new book
- **PUT** `/books/:id` – Update a book
- **GET** `/books/:id` – Get a single book with author details

## Dependencies
- **express** – Web framework for Node.js  
- **nodemon** – Auto-restart server on file changes (development only)  
- **sqlite3** – Database engine for storing authors and books 
- **redis** – In-memory data store for rate limiting 

## Notes
- Input validations are implemented for authors and books.  
- Pagination, filtering, and sorting are supported on list endpoints.  
- Error handling includes:
  - **201** – Resource created successfully
  - **400** – Bad Request 
  - **404** – Resource not found 
  - **429** – Too Many Requests   
  - **500** – Internal server error  


# API Documentation

### Query Parameters Reference

#### Authors (`GET /authors`)
- **name** → filter authors by partial match   
- **order** → `asc` or `desc` (default: `desc`, based on book count)
- **page**, **limit** → pagination

#### Books (`GET /books`)
- **title** → filter books by partial match on book title
- **author** → filter books by partial match on author name  
- **year** → filter books by exact published year  
- **sort** → field to sort by (`title`, `published_year`, default: `created_at`)  
- **order** → `asc` or `desc` (default: `desc`)  
- **page**, **limit** → pagination

### Authors
- `GET /authors` → List all authors (supports query params: `name`, `order`, `page`, `limit`)<br><br>
**Example Request:**
`/authors?name=Laxmi&order=asc&page=1&limit=10`
  ```json
  {
  "authors": [
    {
      "id": 2,
      "name": "Laxmi Prasad Devkota",
      "email": "laxmi.devkota@example.com",
      "created_at": "2025-09-15 12:11:28",
      "book_count": 1
    }
  ]
  }

- `GET /authors/:id` → Get Author By Id  
  ```json
  {
    "author": {
        "id": 10,
        "name": "Sarubhakta",
        "email": "sarubhakta@example.com",
        "created_at": "2025-09-15 12:11:28"
    },
    "books": [
        {
            "id": 10,
            "title": "Pagal Basti",
            "published_year": 1991,
            "isbn": "9789937105"
        }
    ]
  }

- `POST /authors` → Create a new author  
  ```json
  {
    "name": "J.K. Rowling",
    "email": "jk@example.com"
  }

### Books
- `GET /books` → List all books (supports query params: `title`, `author`, `year`, `sort`, `order`, `page`, `limit`)<br><br>
**Example Request:**
`/books?title=summer&author=subin&year=2012&sort=title&page=1&limit=10`

  ```json
  {
  "books": [
    {
      "id": 4,
      "title": "Summer Love",
      "isbn": "9789937011",
      "published_year": 2012,
      "author_id": 4,
      "created_at": "2025-09-15 12:11:28",
      "author_name": "Subin Bhattarai"
    }
  ]
  }

- `GET /books/:id` → Get Book By Id  
  ```json
  {
    "book": {
        "id": 12,
        "title": "Jhola",
        "isbn": "9789937206",
        "published_year": 2010,
        "author_id": 11,
        "created_at": "2025-09-15 12:11:28",
        "author_name": "Krishna Dharabasi",
        "author_email": "krishna.dharabasi@example.com"
    }
  }

- `POST /books` → Create a new book  
  ```json
  {
  "title": "Antyahin Yatraa",
  "isbn": "7438526543",
  "published_year": 2019,
  "author_id": 12
  }

- `PUT /books/:id` → Update book info  
  ```json
  {
  "title": "Antyahin Yatra",
  "isbn": "7438526543",
  "published_year": 2019,
  "author_id": 12
  }
