import {db} from '../../db/db.js';

export const getAuthors = (req, res) => {
    try {
        const { name, order } = req.query;

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
};

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