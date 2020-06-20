import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Router} from '@angular/router';
import{ToastrService} from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons'
import { UserIdleService } from 'angular-user-idle';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    spinnerSize: 18,
    raised: false,
    flat: false,
    stroked: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    // buttonIcon: {

    // }
  }


  submitted = false;

  loginForm : FormGroup;

  constructor( private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService,
    private userIdle: UserIdleService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },

    );
  }


  get f() {
    return this.loginForm.controls;
  }


  someFunc(): void {
    this.spinnerButtonOptions.active = true;
    setTimeout(() => {
      this.spinnerButtonOptions.active = false;
      this.onLoginSubmit();
    }, 2500)
  }


  onLoginSubmit() {

    this.submitted = true;
    if(this.loginForm.valid) {
      this._auth.loginUser(this.loginForm.value)
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this._auth.storeUserData(data.token, data.user);
            this.toastr.success(data.msg);
            this._router.navigate(['/dashboard']);
            this.userIdle.startWatching();
          } else {
            this.toastr.error(data.msg);
            this._router.navigate(['/login']);
           }
        }, (error => {
          console.log(error);
        })
      );
    }


  }



}
