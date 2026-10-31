import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DishRepository {
  async findPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.dish.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: { restaurant: true },
      }),
      prisma.dish.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
    };
  }

  async create(data: { name: string; price: number; restaurantId: number }) {
    return await prisma.dish.create({
      data,
      include: { restaurant: true },
    });
  }
}
