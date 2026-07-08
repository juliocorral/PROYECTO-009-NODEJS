import { z } from "zod";

export const loginSchema = z.object({
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