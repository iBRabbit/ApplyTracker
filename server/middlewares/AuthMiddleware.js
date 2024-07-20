const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers["token"]
    console.log(req.headers);
    console.log(`val token: ${token}`);
    if (!token) 
        return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = { validateToken };
