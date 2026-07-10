import { success } from 'zod';
import { isValidToken } from '../services/jwt.services.js';

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Token requerido"
        });  
    }

    const token = authorization.replace("Bearer ", "").trim();

    // Comnprobar que el token llegue al cliente
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "El access token es requerido"
        });
    }

    const payload = isValidToken(token);

    // Si el token es válido
    if (payload) {
        req.user = payload;
        return next();
    }

    return res.status(401).json({
        success: false,
        message: "El token es invalido o ha expirado"
    });  
};

export default authMiddleware;