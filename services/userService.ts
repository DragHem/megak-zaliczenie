// import client from "../lib/prismadb";
import prisma from "../prisma/prisma";

import { ErrorResponseStatus } from "../interfaces/ErrorResponseStatus";

export abstract class UserService {
  public static async getUser(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        nickname: true,
        friends: true,
        isActive: true,
        isVirtual: true,
        password: true,
      },
    });
  }

  public static async getUserFriends(ids: string[]) {
    return await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        email: true,
        id: true,
        name: true,
        nickname: true,
        image: true,
      },
    });
  }

  public static async getOutgoingInvitations(id: string) {
    const ids = await prisma.user.findFirst({
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
    const ids = await prisma.user.findFirst({
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
    return await prisma.user.findMany({
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
    return await prisma.user.create({
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
    return await prisma.user.update({
      where: { email },
      data: {
        name,
        nickname,
      },
    });
  }

  public static async findFriend(email: string, nickname: string) {
    return await prisma.user.findMany({
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
    const userResponse = await prisma.user.update({
      where: { id: userId },
      data: {
        outgoingInvitations: {
          push: friendId,
        },
      },
    });
    const friendResponse = await prisma.user.update({
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
    const userResp = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        incomingInvitations: true,
      },
    });
    const friendResp = await prisma.user.findFirst({
      where: { id: friendId },
      select: {
        outgoingInvitations: true,
      },
    });

    if (userResp) {
      const { incomingInvitations } = userResp;
      await prisma.user.update({
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
      await prisma.user.update({
        where: { id: friendId },
        data: {
          outgoingInvitations: {
            set: outgoingInvitations.filter((id) => id !== userId),
          },
          friends: {
            push: userId,
          },
        },
      });
    }
  }

  public static async rejectFriendRequest(userId: string, friendId: string) {
    const userResp = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        incomingInvitations: true,
      },
    });
    const friendResp = await prisma.user.findFirst({
      where: { id: friendId },
      select: {
        outgoingInvitations: true,
      },
    });

    if (userResp) {
      const { incomingInvitations } = userResp;
      await prisma.user.update({
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
      await prisma.user.update({
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
    const userResp = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        outgoingInvitations: true,
      },
    });
    const friendResp = await prisma.user.findFirst({
      where: { id: friendId },
      select: {
        incomingInvitations: true,
      },
    });

    if (userResp) {
      const { outgoingInvitations } = userResp;
      await prisma.user.update({
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
      await prisma.user.update({
        where: { id: friendId },
        data: {
          incomingInvitations: {
            set: incomingInvitations.filter((id) => id !== userId),
          },
        },
      });
    }
  }

  public static async getUserKitties(id: string, isEnded: boolean) {
    return await prisma.user.findFirst({
      where: { id },
      select: {
        kitties: {
          where: { isEnded },
          select: {
            id: true,
            name: true,
            createdAt: true,
            description: true,
            totalValue: true,
          },
        },
      },
    });
  }
  public static async deleteFriend(userId: string, friendId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const friend = await prisma.user.findUnique({
      where: {
        id: friendId,
      },
    });

    if (user && friend) {
      const { friends: userFriends } = user;
      const { friends: friendFriends } = friend;

      await prisma.user.update({
        where: { id: userId },
        data: {
          friends: {
            set: friendFriends.filter((id) => id !== friendId),
          },
        },
      });

      await prisma.user.update({
        where: { id: friendId },
        data: {
          friends: {
            set: friendFriends.filter((id) => id !== userId),
          },
        },
      });
    }
  }

  public static async getUserKittiesDetails(id: string, isEnded: boolean) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        kitties: {
          where: { isEnded },
          select: {
            products: {
              select: {
                name: true,
                price: true,
                users: {
                  select: {
                    id: true,
                    name: true,
                    nickname: true,
                  },
                },
              },
            },
            id: true,
            userId: true,
            name: true,
            createdAt: true,
            description: true,
            totalValue: true,
            receiptsPhotos: true,
            users: true,
          },
        },
      },
    });
  }

  public static async activateUser(activationLink: string) {
    const user = await prisma.user.findUnique({
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

    const updatedUser = await prisma.user.update({
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
