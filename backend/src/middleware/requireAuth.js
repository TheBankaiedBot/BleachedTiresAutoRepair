const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
console.log("token: ",token);
    
    try{
        if(!token) return res.status(401).json({message: 'Unauthorized token'});
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: payload.id};
        
        return next();
    } catch(err){
        return res.status(401).json({message:"Invalid Token"});
    }
   
};
module.exports = requireAuth;