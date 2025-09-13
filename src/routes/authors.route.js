import express from 'express';
import { createAuthor, getAuthors } from '../controllers/authors.controller.js';

const router=express.Router();

router.get('/', getAuthors);
router.post('/', createAuthor);

export default router;