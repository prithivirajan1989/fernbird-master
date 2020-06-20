import { ValidateService } from './../../auth/validate.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {OtpId} from './forgotpassword';



@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  sendOtp: Number;


  constructor(private _auth: AuthService,
    private _router: Router,
    private flashMessage: FlashMessagesService,
    private validate: ValidateService) { }

  ngOnInit() {
  }

  sendOtpSubmit() {
    const number = {
     number: this.sendOtp
    };

    // if (!this.validate.validateOtp(number)) {
    //   this.flashMessage.show('Please enter the Registerd Mobile Number', {
    //     cssClass: 'alert-danger', timeout: 2000
    //   });
    //   return false;

    // }

    this._auth.sendOtp(number)
    .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this._auth.storeOtpId(data.id, data.number);
          // this._auth.storeUserData(data.token, data.user);
          this.flashMessage.show(data.msg , {
            cssClass: 'alert-success', timeout: 2000
          });
          this._router.navigate(['/verify']);
        } else {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger', timeout: 2000
          });
         }
      },
    );


  }



}

