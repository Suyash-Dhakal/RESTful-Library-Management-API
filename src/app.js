import express from 'express';
import authorsRoutes from './routes/authors.route.js';
import booksRoutes from './routes/books.route.js';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

export default app;