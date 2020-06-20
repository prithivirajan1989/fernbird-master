import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import {AuthService} from './auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService,
              private _router: Router     ) {}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
if (this._authService.getToken()) {
 return true;
} else {
  this._router.navigate(['/login']);
}
  }


}
