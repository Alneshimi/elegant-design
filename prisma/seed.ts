import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await prisma.adminUser.upsert({
    where: {
      email: "admin@elegantdesign.bh",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@elegantdesign.bh",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });