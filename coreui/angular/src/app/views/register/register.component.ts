import { ValidateService } from "./../../auth/validate.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { ToastrService } from "ngx-toastr";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: `register.component.html`
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        mobilenumber: ["", [Validators.required, Validators.minLength(10)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue]
      },
      
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const user = {
      user:this.registerForm.value,
    }

    if (this.registerForm.valid) {
      this._auth.registerUser(user).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.toastr.success(data.msg);
          this._router.navigate(["/login"]);
        } else {
          this.toastr.error(data.msg);
          this._router.navigate(["/register"]);
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
