import express from 'express';
import { createAuthor, getAuthors, getAuthorById } from '../controllers/authors.controller.js';
import {validateAuthor} from '../validators/authors.validator.js'

const router=express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', validateAuthor, createAuthor);

export default router;