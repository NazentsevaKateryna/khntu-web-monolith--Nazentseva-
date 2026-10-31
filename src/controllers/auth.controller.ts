import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';

const authService = new AuthService();
const userRepo = new UserRepository();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const user = await authService.register(email, password, role);
      res.status(201).json({ status: 'success', data: user });
    } catch (err: any) {
      res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({ status: 'success', data: result });
    } catch (err: any) {
      res.status(err.statusCode || 401).json({ status: 'error', message: err.message });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await userRepo.findAll();
      res.json({ status: 'success', data: users });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
}
