import express from 'express';
import authorsRoutes from './routes/authors.route.js';
import booksRoutes from './routes/books.route.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const app = express();

// Middlewares
app.use(express.json()); // to parse JSON request bodies
app.use(rateLimiter); // Apply rate limiting to all requests

// Routes
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

export default app;