import { Component, OnInit } from '@angular/core';
import { MustMatch } from "./password-match";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from '../../auth/auth.service';
import { ProfileUser } from '../profile/profile';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetComponent implements OnInit {
  Users: ProfileUser;
   
  onChangePassword :boolean = false;

  imgUrl:string  = '../../../../assets/img/Password.png'
  
  registerForm: FormGroup;
  submitted = false;
  
   
  constructor( private formBuilder: FormBuilder, private service: AuthService, private toastr: ToastrService,private _router: Router ) { }

  ngOnInit() {
    this.getUser();
    this.registerForm = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
       
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

   
  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
    
  }

  get f() {
    return this.registerForm.controls;
  }

 
   
  onPasswordChange(){
    this.onChangePassword = true
    
  }

  onSubmit() {
 
    const id = this.Users.id;
    this.submitted = true;
 
    this.service.forgetPassword(id,this.registerForm.value)
    .subscribe(data => {
      console.log(data);
      if (data.success) {
        this.toastr.success(data.msg);
        this._router.navigate(["/login"]);
      } else {
        this.toastr.error(data.msg);
       
      }
    });
    
    }

    onReset() {
      this.onChangePassword = false
      this.submitted = false;
      this.registerForm.reset();
    }
  
}
