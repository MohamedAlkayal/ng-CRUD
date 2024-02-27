import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [UsersService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  constructor(private client: UsersService) {}

  today = new Date();
  minBirthDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  maxBirthDate = new Date(this.today.getFullYear() - 80, this.today.getMonth(), this.today.getDate());

  regValidation = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z\s'-]{4,42}$/)]),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    date: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^1[0-2]\d{8}$/)]),
  });

  get isNameValid() {
    if (!this.regValidation.controls["name"].touched) {
      return true;
    } else {
      return this.regValidation.controls["name"].valid;
    }
  }
  get isDateValid() {
    const userDate = this.regValidation.get("date")?.value;
    const inputDate = new Date(`${userDate}`);
    if (!this.regValidation.controls["date"].touched) {
      return true;
    } else if (isNaN(inputDate.getTime()) || inputDate >= this.minBirthDate || inputDate <= this.maxBirthDate) {
      return false;
    } else {
      return this.regValidation.controls["date"].valid;
    }
  }

  get isEmailValid() {
    return !this.regValidation.controls["email"].touched || this.regValidation.controls["email"].valid;
  }
  get isPhoneValid() {
    return !this.regValidation.controls["phone"].touched || this.regValidation.controls["phone"].valid;
  }
  add() {
    if (this.regValidation.valid) {
      const { name, email, date, phone } = this.regValidation.value;
      let newUser = { name, email, dateOfBirth: date, phone };
      this.client.AddNewUser(newUser).subscribe({
        complete: () => {
          alert("Added Successfully");
        },
        error: (err) => alert(err.message),
      });
      this.regValidation.reset();
    } else {
      console.log("invalid data");
      this.markFormGroupTouched(this.regValidation);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
