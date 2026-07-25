import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.adminUser.create({
    data: {
      name: "Admin",
      email: "admin@elegantdesign.com",
      password,
    },
  });

  console.log("✅ Admin created:");
  console.log(admin.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });