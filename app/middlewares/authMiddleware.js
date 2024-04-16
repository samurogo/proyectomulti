// app/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "Token de acceso no proporcionado." });

    jwt.verify(token.split(' ')[1], 'clave_secreta', (err, user) => {
        if (err) return res.status(403).json({ message: "Token no válido." });
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
