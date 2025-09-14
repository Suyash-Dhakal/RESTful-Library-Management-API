import express from 'express';
import { createAuthor, getAuthors, getAuthorById } from '../controllers/authors.controller.js';

const router=express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);

export default router;