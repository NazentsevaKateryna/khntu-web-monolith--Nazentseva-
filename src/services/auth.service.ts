import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';

const userRepository = new UserRepository();
const SALT_ROUNDS = 10;

export class AuthService {
  async register(email: string, rawPassword: string, role: string = 'USER') {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Користувач з таким email вже існує', 400);
    }

    const passwordHash = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    const user = await userRepository.create({
      email,
      password: passwordHash,
      role,
    });

    return { id: user.id, email: user.email, role: user.role };
  }

  async login(email: string, rawPassword: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Невірний email або пароль', 401);
    }

    const isValid = await bcrypt.compare(rawPassword, user.password);
    if (!isValid) {
      throw new AppError('Невірний email або пароль', 401);
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'super_secret_jwt_key_khntu_2026',
      { expiresIn: '15m' }
    );

    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
