import client from "../lib/prismadb";
import { Product } from "../interfaces/product/product";

export abstract class KittyService {
  public static async createKitty(
    userId: string,
    name: string,
    description: string,
    totalValue: number,
    product: Product[],
    users: string[]
  ) {
    return await client.kitty.create({
      data: {
        name,
        description,
        totalValue,
        users,
        products: {
          createMany: {
            data: product,
          },
        },
        owner: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        owner: true,
        products: true,
      },
    });
  }

  public static async updateKitty(
    id: string,
    name: string,
    description: string,
    totalValue: number
  ) {
    return await client.kitty.update({
      where: { id },
      data: {
        name,
        description,
        totalValue,
      },
      include: {
        products: true,
      },
    });
  }

  public static async addProductsToKitty(products: Product[], id: string) {
    return await client.kitty.update({
      where: { id },
      data: {
        products: {
          createMany: {
            data: products,
          },
        },
      },
    });
  }

  public static async addUserToKitty(id: string, user: string) {
    return await client.kitty.update({
      where: { id },
      data: {
        users: {
          push: user,
        },
      },
    });
  }

  public static async deleteUserFromKitty(id: string, user: string) {
    const resp = await client.kitty.findFirst({
      where: { id },
      select: {
        users: true,
      },
    });
    if (resp != null) {
      const { users } = resp;
      return await client.kitty.update({
        where: { id },
        data: {
          users: {
            set: users.filter((x) => x != user),
          },
        },
      });
    }
  }

  public static async deleteProductFromKitty(
    products: { id: string }[],
    id: string
  ) {
    return await client.kitty.update({
      where: { id },
      data: {
        products: {
          deleteMany: products,
        },
      },
    });
  }

  public static async changeStatus(id: string, isEnded: boolean) {
    return await client.kitty.update({
      where: { id },
      data: {
        isEnded: !isEnded,
      },
    });
  }

  public static async deleteKitty(id: string) {
    return await client.kitty.update({
      where: { id },
      data: {
        isVisible: false,
      },
    });
  }
}
