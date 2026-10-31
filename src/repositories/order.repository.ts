import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderRepository {
  async createOrderTx(userId: number, items: Array<{ dishId: number; portionCount: number }>) {
    return await prisma.$transaction(async (tx) => {
      // Автостворення користувача, якщо ще не існує
      let user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        user = await tx.user.create({
          data: {
            id: userId,
            email: `client${userId}@delivery.com`,
            password: 'hashed_password_123',
            role: 'USER',
          },
        });
      }

      let totalAmount = 0;
      const dishInOrderData = [];

      for (const item of items) {
        const dish = await tx.dish.findUnique({ where: { id: item.dishId } });
        if (!dish) {
          throw new Error(`Страву з ID ${item.dishId} не знайдено`);
        }

        totalAmount += dish.price * item.portionCount;
        dishInOrderData.push({
          dishId: item.dishId,
          portionCount: item.portionCount,
          priceAtOrder: dish.price, // Фіксація історичної ціни!
        });
      }

      return await tx.order.create({
        data: {
          userId,
          status: 'PENDING',
          totalAmount,
          items: {
            create: dishInOrderData,
          },
        },
        include: {
          items: {
            include: { dish: true },
          },
          user: true,
        },
      });
    });
  }

  async findAll() {
    return await prisma.order.findMany({
      include: {
        items: { include: { dish: true } },
        user: true,
      },
      orderBy: { id: 'desc' },
    });
  }
}
