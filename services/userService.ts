import client from "../lib/prismadb";
import { ErrorResponseStatus } from "../interfaces/ErrorResponseStatus";

export abstract class UserService {
  public static async getUser(email: string) {
    return await client.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        nickname: true,
        // kitties: true,
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

  public static async rejectFriendRequest(userId: string, friendId: string) {
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
        },
      });
    }
  }

  public static async cancelFriendRequest(userId: string, friendId: string) {
    const userResp = await client.user.findFirst({
      where: { id: userId },
      select: {
        outgoingInvitations: true,
      },
    });
    const friendResp = await client.user.findFirst({
      where: { id: friendId },
      select: {
        incomingInvitations: true,
      },
    });

    if (userResp) {
      const { outgoingInvitations } = userResp;
      await client.user.update({
        where: { id: userId },
        data: {
          outgoingInvitations: {
            set: outgoingInvitations.filter((id) => id !== friendId),
          },
        },
      });
    }
    if (friendResp) {
      const { incomingInvitations } = friendResp;
      await client.user.update({
        where: { id: friendId },
        data: {
          incomingInvitations: {
            set: incomingInvitations.filter((id) => id !== userId),
          },
        },
      });
    }
  }

  public static async getUserKittiesEnded(id: string) {
    return await client.user.findFirst({
      where: {
        id,
      },
      select: {
        kitties: {
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

  public static async getUserKittiesActive(id: string) {
    return await client.user.findFirst({
      where: {
        id,
      },
      select: {
        kitties: {
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

  public static async activateUser(activationLink: string) {
    const user = await client.user.findUnique({
      where: {
        activationLink,
      },
    });

    if (!user)
      return {
        message: "Użytkownik nie został odnaleziony odnaleziony.",
        status: ErrorResponseStatus.error,
      };

    if (user && user.isActive)
      return {
        message: "Konto zostało już aktywowane.",
        status: ErrorResponseStatus.warning,
      };

    const updatedUser = await client.user.update({
      where: {
        email: user.email,
      },
      data: {
        isActive: true,
      },
    });

    if (!updatedUser)
      return {
        message: "Aktywacja konta nie powiodła się, prosimy spróbować później.",
        status: ErrorResponseStatus.error,
      };

    return {
      message: "Użytkownik aktywowany pomyślnie.",
      status: ErrorResponseStatus.success,
    };
  }
}
