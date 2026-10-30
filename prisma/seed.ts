import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Variant 7...');

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Mario Pizza & Pasta',
    },
  });

  await prisma.dish.createMany({
    data: [
      { name: 'Піца Маргарита', price: 210, restaurantId: restaurant.id },
      { name: 'Паста Карбонара', price: 245, restaurantId: restaurant.id },
      { name: 'Салат Цезар з куркою', price: 180, restaurantId: restaurant.id },
    ],
  });

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });