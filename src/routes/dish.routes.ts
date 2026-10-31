import { Router } from 'express';
import { DishController } from '../controllers/dish.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateDishSchema } from '../dto/dish.dto';

const router = Router();
router.get('/', DishController.getAll);
router.post('/', validateBody(CreateDishSchema), DishController.create);

export default router;
