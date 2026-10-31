import { z } from 'zod';

export const CreateDishSchema = z.object({
  name: z.string().min(3, 'Назва страви має містити не менше 3 символів'),
  price: z.number().positive('Ціна страви має бути більшою за 0'),
  restaurantId: z.number().int().positive('ID ресторану має бути додатним числом'),
});

export type CreateDishDto = z.infer<typeof CreateDishSchema>;
