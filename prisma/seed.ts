// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
// ESM
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
import * as argon from 'argon2';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

const fakerUser = async () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  hash: await argon.hash('password'),
  role: Role.USER,
});

const adminUser = async () => ({
  firstName: 'admin',
  lastName: 'admin',
  email: 'admin@admin.com',
  hash: await argon.hash('admin'),
  role: Role.ADMIN,
  isVerified: true,
});

//generate admin
async function generateAdmin() {
  const admin = await adminUser();
  await prisma.user.create({ data: admin });
}

async function generateUsers() {
  const fakerRounds = 100;
  dotenv.config();
  console.log('Seeding...');
  /// --------- Users ---------------
  for (let i = 0; i < fakerRounds; i++) {
    const user = await fakerUser();
    await prisma.user.create({ data: user });
  }
}

//generate users
async function main() {
  await generateAdmin();
  await generateUsers();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
