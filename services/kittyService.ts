// import client from "../lib/prismadb";
import { Product } from "../interfaces/product/product";
import { UserService } from "./userService";
import prisma from "../prisma/prisma";

export abstract class KittyService {
  public static async getKitty(id: string) {
    const kitty = await prisma.kitty.findFirst({
      where: { id },
      select: {
        name: true,
        createdAt: true,
        description: true,
        totalValue: true,
        users: true,
        isEnded: true,
        owner: {
          select: {
            id: true,
            name: true,
            nickname: true,
          },
        },
        products: {
          select: {
            name: true,
            price: true,
            users: {
              select: {
                name: true,
                nickname: true,
                id: true,
              },
            },
          },
        },
      },
    });
    if (kitty) {
      const users = await UserService.getUserFriends(kitty.users);

      const values = kitty.users.map((user) =>
        kitty.products.reduce(
          (acc, curr) =>
            curr.users.find((ProductUser) => ProductUser.id == user)
              ? Math.ceil((curr.price / curr.users.length) * 100) / 100 + acc
              : acc + 0,
          0
        )
      );
      const data = [];
      for (let i = 0; i < users.length; i++) {
        data.push({
          value: values[i],
          name: users[i].nickname ? users[i].nickname : users[i].name,
        });
      }
      return { ...kitty, users: users, data };
    }
  }

  public static async createKitty(
    userId: string,
    name: string,
    description: string,
    totalValue: number,
    product: Product[],
    users: string[]
  ) {
    return await prisma.kitty.create({
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
    return await prisma.kitty.update({
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
    return await prisma.kitty.update({
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
    return await prisma.kitty.update({
      where: { id },
      data: {
        users: {
          push: user,
        },
      },
    });
  }

  public static async deleteUserFromKitty(id: string, user: string) {
    const resp = await prisma.kitty.findFirst({
      where: { id },
      select: {
        users: true,
      },
    });
    if (resp != null) {
      const { users } = resp;
      return await prisma.kitty.update({
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
    return await prisma.kitty.update({
      where: { id },
      data: {
        products: {
          deleteMany: products,
        },
      },
    });
  }

  public static async changeStatus(id: string, isEnded: boolean) {
    return await prisma.kitty.update({
      where: { id },
      data: {
        isEnded: !isEnded,
      },
    });
  }

  public static async deleteKitty(id: string) {
    return await prisma.kitty.update({
      where: { id },
      data: {
        isVisible: false,
      },
    });
  }
}
