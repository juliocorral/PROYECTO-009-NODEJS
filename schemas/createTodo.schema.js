import { z } from "zod";

const createTodoSchema = z.object({
    title: z.string().trim().min(2, "El título debe tener al menos 2 caracteres").max(100, "El título no puede exceder los 100 caracteres"),
});

export default createTodoSchema;