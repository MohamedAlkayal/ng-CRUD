import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { OneUserComponent } from "../one-user/one-user.component";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [HttpClientModule, OneUserComponent],
  providers: [UsersService],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.css",
})
export class UsersComponent implements OnInit {
  constructor(private users: UsersService) {}
  usersData: any;
  ngOnInit() {
    this.users.GetAllUsers().subscribe({
      next: (data) => {
        this.usersData = data;
      },
      error: (err) => console.log(err),
    });
  }
}
