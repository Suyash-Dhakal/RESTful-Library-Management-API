
export const validateBook = (req, res, next)=>{
    const {title, isbn, published_year} = req.body;
    if(!title || typeof title !== 'string' || title.trim().length < 1){
        return res.status(400).json({error: "Title is required and should be at least 1 character long."});
    }
    const yearRegex = /^\d{4}$/;
    if(published_year && !yearRegex.test(published_year)){
        return res.status(400).json({ error: "Published year must be a valid 4-digit year" });
    }
    const isbnRegex = /^\d{10}$/;
    if(!isbnRegex.test(isbn)){
        return res.status(400).json({ error: "ISBN must be exactly 10 digits" });
    }
    next();
}