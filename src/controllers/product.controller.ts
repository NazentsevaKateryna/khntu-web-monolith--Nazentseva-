import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class ProductController {
  static getAll(req: Request, res: Response): void {
    const items = productService.getAll();
    res.status(200).json({ status: 'success', data: items });
  }

  static getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const item = productService.getById(id);
      res.status(200).json({ status: 'success', data: item });
    } catch (error) {
      next(error);
    }
  }
}