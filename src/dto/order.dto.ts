import { z } from 'zod';

export const CreateOrderSchema = z.object({
  userId: z.number().int().positive('ID користувача має бути додатним числом'),
  items: z.array(
    z.object({
      dishId: z.number().int().positive('ID страви має бути додатним числом'),
      portionCount: z.number().int().positive('Кількість порцій має бути не менше 1'),
    })
  ).min(1, 'Замовлення має містити хоча б одну страву'),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
