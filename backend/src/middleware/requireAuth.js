const requireAuth = (req, res, next) => {
    const jwt = require('jsonwbetoken');
    const token = req.headers.authorization?.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {id: payload.id};
    next();
};
