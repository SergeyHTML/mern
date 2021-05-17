import jwt from 'jsonwebtoken';
import config from 'config';

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Not authorization!'});
        }

        req.user = jwt.verify(token, config.get('jwtSecret'));
        next();

    } catch (e) {
        res.status(401).json({ message: 'Not authorization!'});
    }
}