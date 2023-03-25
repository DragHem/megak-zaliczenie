import client from "../lib/prismadb";
import { mockSession } from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;

export abstract class UserService {
  public static async getUser(email: string, id: string) {
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

  public static async createUser(
    name: string,
    email: string,
    password: string,
    nickname: string
  ) {
    //@toDo dodać walidację
    try {
      return await client.user.create({
        data: {
          name,
          email,
          password,
          nickname,
        },
      });
    } catch (e: any) {
      return e.code === "P2002"
        ? { message: "This email already exist" }
        : e.message;
    }
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
    //@toDo do przemyślenia sprawdzanie czy zaproszenie już istnieje
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
}
