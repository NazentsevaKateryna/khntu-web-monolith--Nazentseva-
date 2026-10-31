import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateOrderSchema } from '../dto/order.dto';

const router = Router();
router.get('/', OrderController.getAll);
router.post('/', validateBody(CreateOrderSchema), OrderController.create);

export default router;
