import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private readonly client: HttpClient) {}
  private readonly DB_URL = "http://localhost:3000/users";
  GetAllUsers() {
    return this.client.get(this.DB_URL);
  }
  GetUserByID(id: number) {
    return this.client.get(this.DB_URL + "/" + id);
  }
  AddNewUser(user: any) {
    return this.client.post(this.DB_URL, user);
  }
  deleteUser(userId: number) {
    return this.client.delete(this.DB_URL + `/${userId}`);
  }
  updateUser(userId: number, data: any) {
    return this.client.patch(this.DB_URL + `/${userId}`, data);
  }
}
