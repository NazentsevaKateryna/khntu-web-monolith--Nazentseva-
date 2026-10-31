import { Request, Response } from 'express';
import { DishRepository } from '../repositories/dish.repository';

const dishRepo = new DishRepository();

export class DishController {
  static async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await dishRepo.findPaginated(page, limit);
      res.json({ status: 'success', data: result });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const dish = await dishRepo.create(req.body);
      res.status(201).json({ status: 'success', data: dish });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
}
