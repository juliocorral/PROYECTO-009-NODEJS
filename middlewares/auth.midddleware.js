import { success } from 'zod';
import { isValidToken } from '../services/jwt.services.js';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    // Comnprobar que el token llegue al cliente
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "El access token es requerido"
        });
    }

    const payload = isValidToken(token);

    if (!payload) {
        return res.status(401).json({
            success: false,
            message: "El token es invalido"
        });
    }

    const isExpires = Date.now() > Date(payload.exp);

    // Si el token es valido y no ha expirado lo dejamos pasar
    if (isExpires) {
        return res.status(401).json({
            success: false,
            message: "El token ha expirado"
        });
    }

    next();    
};

export default authMiddleware;