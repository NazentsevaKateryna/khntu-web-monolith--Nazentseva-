import { Router } from 'express';
import { DishController } from '../controllers/dish.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateDishSchema } from '../dto/dish.dto';
import { authGuard } from '../middlewares/auth.middleware';
import { roleGuard } from '../middlewares/role.middleware';

const router = Router();

router.get('/', DishController.getAll);
router.post('/', authGuard, roleGuard(['ADMIN']), validateBody(CreateDishSchema), DishController.create);

export default router;
