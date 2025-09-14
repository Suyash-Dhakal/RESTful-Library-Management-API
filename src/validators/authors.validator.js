
export const validateAuthor = (req, res, next)=>{
    const {name, email} = req.body;
    if(!name || typeof name !== 'string' || name.trim().length < 2){
        return res.status(400).json({error: "Name is required and should be at least 2 characters long."});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){
        return res.status(400).json({error: "A valid email is required."});
    }
    next();
}