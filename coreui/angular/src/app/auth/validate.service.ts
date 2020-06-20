import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name === undefined || user.email === undefined || user.mobilenumber === undefined || user.password === undefined ) {
      return false;
    } else {
      return true;
    }
  }

  validateProfile(user) {
    if (user.name === undefined || user.email === undefined || user.mobilenumber === undefined || user.password === undefined ) {
      return false;
    } else {
      return true;
    }
  }

  validateOtp(otp) {
    if (otp.sendotp === undefined ) {
      return false;
    } else {
      return true;
    }
  }

  verifyOtp(otp) {
    if (otp.verifyotp === undefined ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobilenumber(number) {
    const val = number.value;
    if (/^\d{10}$/.test(val)) {
        // value is ok, use it
    } else {
        alert('Invalid number; must be ten digits');
        number.focus();
        return false;
    }
  }

}
