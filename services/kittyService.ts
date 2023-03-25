import client from "../lib/prismadb";

export abstract class KittyService {
  public static async createKitty(
    userId: string,
    name: string,
    description: string,
    totalValue: number,
    users: string[]
  ) {
    return await client.kitty.create({
      data: {
        userId,
        name,
        description,
        totalValue,
        users,
      },
    });
  }

  public static async getKittys(id: string) {
    return await client.kitty.findMany({
      where: {
        OR: [{ users: { has: id } }, { userId: id }],
      },
    });
  }

  public static async updateKitty(
    kittyId: string,
    name: string,
    description: string,
    totalValue: number,
    users: string[]
  ) {
    return await client.kitty.update({
      where: { id: kittyId },
      data: {
        name,
        description,
        totalValue,
        users,
      },
    });
  }
}
