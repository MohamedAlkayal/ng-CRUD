import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UsersComponent } from "./components/users/users.component";
import { ErrorComponent } from "./components/error/error.component";
import { ProfileComponent } from "./components/profile/profile.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "users/:id", component: ProfileComponent },
  { path: "**", component: ErrorComponent },
];
