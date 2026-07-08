import { z } from "zod";

export const registerUserSchema = z.object({
    username: z
        .string("El nombre de usuario es requerido")
        .trim()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z
        .string("El correo electrónico es requerido")
        .trim()
        .email("El correo electrónico no es válido"),
    password: z
        .string("La contraseña es requerida")
        .trim()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[0-9]/, "La contraseña debe contener al menos un número")
});