import {db} from '../../db/db.js';

export const getBooks = (req, res)=>{
    try {
        const { title, author, year, sort, order } = req.query;

        let sql = `
            SELECT books.*, authors.name as author_name FROM books
            LEFT JOIN authors ON books.author_id = authors.id
        `;

        const conditions = [];
        const params = [];

        // Filtering
        if (title) {
            conditions.push('books.title LIKE ?');
            params.push(`%${title}%`);
        }
        if (author) {
            conditions.push('authors.name LIKE ?');
            params.push(`%${author}%`);
        }
        if (year) {
            conditions.push('books.published_year = ?');
            params.push(year);
        }

        if(conditions.length > 0){
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        const validSort = ["title", "published_year", "created_at"];
        const sortField = validSort.includes(sort) ? sort : "created_at";

        sql += ` ORDER BY ${sortField} ${order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;

        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ books: rows });
            }
        });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const createBook = (req, res)=>{
    try {
        const {title, isbn, published_year, author_id} = req.body;
        db.run(`INSERT INTO books (title, isbn, published_year, author_id) VALUES
        (?, ?, ?, ?)`, [title, isbn, published_year, author_id], function(err){
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(201).json({message: "Book created", bookId: this.lastID});
            }
        });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const updateBook = (req, res)=>{
    try {
        const {id} = req.params;
        const {title, isbn, published_year, author_id} = req.body;

        db.run(`UPDATE books SET title = ?, isbn = ?, published_year = ?, author_id = ? WHERE id = ?`,
        [title, isbn, published_year, author_id, id], function(err){
            if(err){
                res.status(500).json({error: err.message});
            } else {
                res.status(200).json({message: "Book updated successfully"});
            }
        });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}