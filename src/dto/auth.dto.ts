import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email('Некоректний формат email'),
  password: z.string().min(6, 'Пароль має містити не менше 6 символів'),
  role: z.enum(['USER', 'MANAGER', 'ADMIN']).optional().default('USER'),
});

export const LoginSchema = z.object({
  email: z.string().email('Некоректний формат email'),
  password: z.string().min(1, 'Пароль обов’язковий'),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
