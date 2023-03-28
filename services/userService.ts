import client from "../lib/prismadb";
import { KittyService } from "./kittyService";

export abstract class UserService {
  public static async getUser(email: string, id?: string) {
    return await client.user.findFirst({
      where: {
        OR: [
          {
            email,
            id,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        nickname: true,
        kittys: true,
        friends: true,
        isActive: true,
        isVirtual: true,
        password: true,
      },
    });
  }

  public static async getUserFriends(ids: string[]) {
    return await client.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        name: true,
        nickname: true,
      },
    });
  }

  public static async getOutgoingInvitations(id: string) {
    const ids = await client.user.findFirst({
      where: {
        id,
      },
      select: {
        outgoingInvitations: true,
      },
    });
    if (ids) {
      return await this.getUserFriends(ids.outgoingInvitations);
    }
  }

  public static async getIncomingInvitations(id: string) {
    const ids = await client.user.findFirst({
      where: {
        id,
      },
      select: {
        incomingInvitations: true,
      },
    });
    if (ids) {
      return await this.getUserFriends(ids.incomingInvitations);
    }
  }

  public static async incomingInvitations(id: string) {
    return await client.user.findMany({
      where: {
        id,
      },
      select: {
        incomingInvitations: true,
      },
    });
  }

  public static async createUser(
    name: string,
    email: string,
    password: string,
    nickname: string,
    activationLink: string
  ) {
    return await client.user.create({
      data: {
        name,
        email,
        password,
        nickname,
        activationLink,
      },
    });
  }

  public static async updateUser(
    email: string,
    name: string,
    nickname: string
  ) {
    return await client.user.update({
      where: { email },
      data: {
        name,
        nickname,
      },
    });
  }

  public static async findFriend(email: string, nickname: string) {
    return await client.user.findMany({
      where: {
        OR: [
          {
            email: {
              startsWith: email,
            },
            nickname: {
              startsWith: nickname,
            },
          },
        ],
      },
      select: {
        email: true,
        nickname: true,
        id: true,
      },
    });
  }

  public static async sendFriendRequest(userId: string, friendId: string) {
    const userResponse = await client.user.update({
      where: { id: userId },
      data: {
        outgoingInvitations: {
          push: friendId,
        },
      },
    });
    const friendResponse = await client.user.update({
      where: { id: friendId },
      data: {
        incomingInvitations: {
          push: userId,
        },
      },
    });
    return { user: userResponse, friend: friendResponse };
  }
  //pierwsza osoba to osoba dostająca zaproszenie a przyjaciel to osoba wysyłająca
  public static async acceptFriendRequest(userId: string, friendId: string) {
    const userResp = await client.user.findFirst({
      where: { id: userId },
      select: {
        incomingInvitations: true,
      },
    });
    const friendResp = await client.user.findFirst({
      where: { id: friendId },
      select: {
        outgoingInvitations: true,
      },
    });

    if (userResp) {
      const { incomingInvitations } = userResp;
      await client.user.update({
        where: { id: userId },
        data: {
          incomingInvitations: {
            set: incomingInvitations.filter((id) => id !== friendId),
          },
          friends: {
            push: friendId,
          },
        },
      });
    }
    if (friendResp) {
      const { outgoingInvitations } = friendResp;
      await client.user.update({
        where: { id: friendId },
        data: {
          outgoingInvitations: {
            set: outgoingInvitations.filter((id) => id !== userId),
          },
          friends: {
            push: friendId,
          },
        },
      });
    }
  }

  public static async getUserKittysEnded(id: string) {
    return await client.user.findFirst({
      where: {
        id,
      },
      select: {
        kittys: {
          where: { isEnded: true },
          select: {
            products: true,
            id: true,
            userId: true,
            name: true,
            createdAt: true,
            description: true,
            totalValue: true,
            isEnded: true,
            receiptsPhotos: true,
            users: true,
          },
        },
      },
    });
  }

  public static async getUserKittysActive(id: string) {
    return await client.user.findFirst({
      where: {
        id,
      },
      select: {
        kittys: {
          where: { isEnded: false },
          select: {
            products: true,
            id: true,
            userId: true,
            name: true,
            createdAt: true,
            description: true,
            totalValue: true,
            isEnded: true,
            receiptsPhotos: true,
            users: true,
          },
        },
      },
    });
  }
}
