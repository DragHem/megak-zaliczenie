import { UserService } from "./userService";
import { Product } from "../interfaces/product/product";
import { KittyService } from "./kittyService";

export abstract class Services {
  //User Service
  public static async createUser(
    name: string,
    email: string,
    password: string,
    nickname: string,
    activationLink: string
  ) {
    return await UserService.createUser(
      name,
      email,
      password,
      nickname,
      activationLink
    );
  }
  public static async getUser(email: string, id?: string) {
    return await UserService.getUser(email, id);
  }
  public static async getUserFriends(ids: string[]) {
    return await UserService.getUserFriends(ids);
  }
  public static async getOutgoingInvitations(id: string) {
    return await UserService.getOutgoingInvitations(id);
  }
  public static async getIncomingInvitations(id: string) {
    return await UserService.getIncomingInvitations(id);
  }
  public static async updateUser(
    email: string,
    name: string,
    nickname: string
  ) {
    return await UserService.updateUser(email, name, nickname);
  }
  public static async findFriend(email: string, nickname: string) {
    return await UserService.findFriend(email, nickname);
  }
  public static async sendFriendRequest(userId: string, friendId: string) {
    return await UserService.sendFriendRequest(userId, friendId);
  }
  public static async acceptFriendRequest(userId: string, friendId: string) {
    return await UserService.acceptFriendRequest(userId, friendId);
  }
  public static async rejectFriendRequest(userId: string, friendId: string) {
    return await UserService.rejectFriendRequest(userId, friendId);
  }
  public static async cancelFriendRequest(userId: string, friendId: string) {
    return await UserService.cancelFriendRequest(userId, friendId);
  }
  public static async getUserKittysEnded(id: string) {
    return await UserService.getUserKittysEnded(id);
  }
  public static async getUserKittysActive(id: string) {
    return UserService.getUserKittysActive(id);
  }
  //Kitty Service
  public static async createKitty(
    userId: string,
    name: string,
    description: string,
    totalValue: number,
    product: Product[],
    users: string[]
  ) {
    return KittyService.createKitty(
      userId,
      name,
      description,
      totalValue,
      product,
      users
    );
  }
  public static async updateKitty(
    id: string,
    name: string,
    description: string,
    totalValue: number
  ) {
    return KittyService.updateKitty(id, name, description, totalValue);
  }
  public static async addProductsToKitty(products: Product[], id: string) {
    return KittyService.addProductsToKitty(products, id);
  }
  public static async addUserToKitty(id: string, user: string) {
    return KittyService.addUserToKitty(id, user);
  }
  public static async deleteUserFromKitty(id: string, user: string) {
    return KittyService.deleteUserFromKitty(id, user);
  }
  public static async deleteProductFromKitty(
    products: { id: string }[],
    id: string
  ) {
    return KittyService.deleteProductFromKitty(products, id);
  }
  public static async changeStatus(id: string, isEnded: boolean) {
    return KittyService.changeStatus(id, isEnded);
  }
  public static async deleteKitty(id: string) {
    return KittyService.deleteKitty(id);
  }
}
