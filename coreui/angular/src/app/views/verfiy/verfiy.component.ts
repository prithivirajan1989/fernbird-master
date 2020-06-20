import { ValidateService } from './../../auth/validate.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';



@Component({
  selector: 'app-verfiy',
  templateUrl: './verfiy.component.html',
  styleUrls: ['./verfiy.component.css']
})
export class VerfiyComponent implements OnInit {

  verifyOtp: Number;




  constructor(private _auth: AuthService,
    private _router: Router,
    private flashMessage: FlashMessagesService,
    private validate: ValidateService) { }

  ngOnInit() {

  }



  verifyOtpSubmit() {
    const number = {
      id: this._auth.otpId,
     token: this.verifyOtp,
     number: this._auth.mobilenumber
    };

    // if (!this.validate.verifyOtp(number)) {
    //   this.flashMessage.show('Please enter the valid Otp', {
    //     cssClass: 'alert-danger', timeout: 2000
    //   });
    //   return false;

    // }

    this._auth.verifyOtp(number)
    .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this._auth.storeUserData(data.token, data.user);
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-success', timeout: 2000
          });
          this._router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger', timeout: 2000
          });
         }
      },
    );


  }




}
