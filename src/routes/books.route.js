import express from 'express';
import {getBooks, createBook, updateBook, getBookById} from '../controllers/books.controller.js';
import {validateBook} from '../validators/books.validator.js'

const router=express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/',validateBook, createBook);
router.put('/:id',validateBook, updateBook);

export default router;