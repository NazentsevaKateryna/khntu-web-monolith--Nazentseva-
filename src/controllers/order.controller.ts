import { Request, Response } from 'express';
import { OrderRepository } from '../repositories/order.repository';

const orderRepo = new OrderRepository();

export class OrderController {
  static async create(req: Request, res: Response) {
    try {
      const { userId, items } = req.body;
      const order = await orderRepo.createOrderTx(userId, items);
      res.status(201).json({
        status: 'success',
        message: 'Замовлення успішно створено через ACID-транзакцію',
        data: order,
      });
    } catch (err: any) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const orders = await orderRepo.findAll();
      res.json({ status: 'success', data: orders });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
}
