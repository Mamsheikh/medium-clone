import { PrismaClient } from '@prisma/client';
import { data } from '../data/data';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany();
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
