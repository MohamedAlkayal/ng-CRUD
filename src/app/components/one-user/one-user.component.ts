import { Component, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-one-user",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./one-user.component.html",
  styleUrl: "./one-user.component.css",
})
export class OneUserComponent {
  @Input() user: any;
  constructor(private router: Router) {}

  viewProfile() {
    this.router.navigate([`/users/${this.user.id}`]);
  }
}
