import express from 'express';
import {getBooks, createBook, updateBook, getBookById} from '../controllers/books.controller.js';

const router=express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);

export default router;