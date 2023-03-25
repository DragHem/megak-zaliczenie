import client from "../lib/prismadb";

export abstract class UserService{

    public static async getUser(email:string)
    {
        return await client.user.findUnique({
            where:{email},
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                nickname:true,
                kittys:true,
                friends:true,
            }
        })
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
        name:string,
        email:string,
        password:string,
        nickname:string,
        ){
        //@toDo dodać walidację

        return await client.user.create({
            data:{
                name,
                email,
                password,
                nickname,
            }
        })
    }

    public static async updateUser(
        email:string,
        name:string,
        nickname:string,
    )
    {
        return await client.user.update({
            where:{email},
            data:{
                name,
                nickname
            }
        })
    }


}
