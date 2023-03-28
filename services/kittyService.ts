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

  public static async deleteProductFromKitty(
    products: { id: string }[],
    id: string
  ) {
    return await client.kitty.update({
      where: { id },
      data: {
        products: {
          deleteMany: {
            data: [{ id: "642321edd03233cb031f3975" }],
          },
        },
      },
    });
  }
}
