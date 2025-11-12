const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

async function authMiddleware(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = await User.findById(decoded.id);
        next();
    } catch(err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

function roleMiddleware(role){
    return (req, res, next) => {
        if(req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
        next();
    }
}



module.exports = { authMiddleware,roleMiddleware };
