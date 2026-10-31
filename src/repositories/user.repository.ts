import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string; role?: string }) {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: data.role || 'USER',
      },
    });
  }

  async findAll() {
    return await prisma.user.findMany({
      select: { id: true, email: true, password: true, role: true, createdAt: true },
      orderBy: { id: 'asc' },
    });
  }
}
