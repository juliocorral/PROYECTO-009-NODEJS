import Roles from "../config/Roles.js";

const adminAuthMiddleware = (req, res, next) => {
    if (req.user.rol !== Roles.ADMIN) {
        return res.status(401).json({
            success: false,
            message: "No tienes privilegios de administrador"
        }); 
    };
    return next();
};

export default adminAuthMiddleware;


