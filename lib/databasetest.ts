import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// Pobranie uzytownikow

(async () => {
  const users = await client.user.findMany({});
  console.log(users);
})();
