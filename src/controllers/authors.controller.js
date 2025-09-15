import {db} from '../../db/db.js';

export const getAuthors = (req, res) => {
    try {
        const { name, order, page = 1, limit = 10} = req.query;
        const offset = (page - 1) * limit;

        let sql = `
            SELECT authors.*, COUNT(books.id) as book_count
            FROM authors
            LEFT JOIN books ON authors.id = books.author_id
        `;
        const params = [];

        // Filter by name (partial match)
        if (name) {
            sql += ' WHERE authors.name LIKE ? ';
            params.push(`%${name}%`);
        }

        sql += ' GROUP BY authors.id ORDER BY book_count ' + (order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');

        // Pagination
        sql += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ authors: rows });
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAuthorById = (req, res)=>{
    try {
        const {id} = req.params;
        const sql = `
        SELECT authors.*, books.id as book_id, books.title as book_title, 
        books.published_year as book_published_year, books.isbn as book_isbn
        FROM authors LEFT JOIN books ON authors.id = books.author_id
        WHERE authors.id = ?
        `;
        db.all(sql, [id], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (!rows.length) {
                res.status(404).json({ error: "Author not found" });
            } else {
                const {id, name, email, created_at} = rows[0];
                res.status(200).json({ author: { id, name, email, created_at }, books: rows.filter(r => r.book_id).map(r => ({
                    id: r.book_id,
                    title: r.book_title,
                    published_year: r.book_published_year,
                    isbn: r.book_isbn
                })) });
            }
        });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const createAuthor = (req, res) => {
    try {
        db.run('INSERT INTO authors (name, email) VALUES (?, ?)', [req.body.name, req.body.email], (err)=>{
            if(err){
                res.status(500).json({error: err.message});
            }else{
                res.status(201).json({message: "Author created successfully"});
            }
        });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}