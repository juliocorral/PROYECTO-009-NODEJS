import { Router } from "express";
import todoValidator from "../middlewares/todo.validator.middleware.js";
import { registerUserSchema } from "../schemas/registerUser.schema.js";
import { loginController, registerController } from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/login.schema.js";
import adminAuthMiddleware from "../middlewares/admin.auth.middleware.js";
import authMiddleware from "../middlewares/auth.midddleware.js";

const authRouter = Router();

authRouter.post("/login", todoValidator(loginSchema), loginController);

authRouter.post(
    "/register", 
    authMiddleware,
    adminAuthMiddleware,
    todoValidator(registerUserSchema), 
    registerController
);

export default authRouter;