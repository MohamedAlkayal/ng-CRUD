import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, MatIconModule, RouterModule],
  providers: [UsersService],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  constructor(ThisActivatedRoute: ActivatedRoute, private UserService: UsersService, private router: Router) {
    this.id = ThisActivatedRoute.snapshot.params["id"];
  }

  id: number;
  user: any;
  toggleEdit = false;

  today = new Date();
  minBirthDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  maxBirthDate = new Date(this.today.getFullYear() - 80, this.today.getMonth(), this.today.getDate());

  ngOnInit(): void {
    this.UserService.GetUserByID(this.id).subscribe({
      next: (data) => {
        this.user = data;
        this.user.dateOfBirth = new Date(this.user.dateOfBirth);
      },
      error: (err) => console.log(err),
    });
  }

  updateValidation = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    date: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^1[0-2]\d{8}$/)]),
  });

  editInfo() {
    if (this.updateValidation.valid) {
      const { email, date, phone } = this.updateValidation.value;
      let newUser = { name: this.user.name, email, dateOfBirth: date, phone };
      this.UserService.updateUser(this.id, newUser).subscribe({
        next: () => alert("Updated Successfully"),
        error: (err) => alert(err.message),
      });
      this.updateValidation.reset();
    } else {
      if (this.toggleEdit) {
        alert("invalid data");
      }
      this.markFormGroupTouched(this.updateValidation);
    }
    this.toggleEdit = true;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  delete() {
    this.UserService.deleteUser(this.id).subscribe(
      () => console.log("user Deleted"),
      (err) => console.log(err)
    );
    this.router.navigate([`/users/`]);
  }
}
