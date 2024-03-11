import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3),
  content: z.string(),
  categoryId: z.number(),
});

// Implementar outros esquemas de validação conforme necessário
