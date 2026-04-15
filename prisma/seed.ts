import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const connectionString = process.env.DIRECT_DATABASE_URL;
if (!connectionString) throw new Error("DIRECT_DATABASE_URL is not set");

const prisma = new PrismaClient({ adapter: new PrismaPg(new Pool({ connectionString })) });

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12);

  await prisma.user.upsert({
    where: { email: "influencer@test.com" },
    update: {},
    create: {
      email: "influencer@test.com",
      password: hashedPassword,
      firstName: "Test",
      lastName: "Influencer",
      role: "INFLUENCER",
    },
  });

  await prisma.user.upsert({
    where: { email: "brand@test.com" },
    update: {},
    create: {
      email: "brand@test.com",
      password: hashedPassword,
      firstName: "Test",
      lastName: "Brand",
      role: "BRAND",
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
