import express from 'express';
import {getBooks, createBook, updateBook} from '../controllers/books.controller.js';

const router=express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);

export default router;