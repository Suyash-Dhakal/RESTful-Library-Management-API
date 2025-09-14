import express from 'express';
import {getBooks, createBook, updateBook, getBookById} from '../controllers/books.controller.js';
import {validateBook} from '../validators/books.validator.js'

const router=express.Router();

router.get('/', validateBook, getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);

export default router;