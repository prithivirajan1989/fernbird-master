import { Injectable, OnInit } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser } from '../views/profile/profile';
import { AuthService } from './auth.service';

@Injectable()
export class CreatorInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthService) {
  }



  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // tslint:disable-next-line: triple-equals
    if (req.headers.get('Creator') === '') {
      const newHeaders = req.headers.delete('Creator');
      const newRequest = req.clone({ headers: newHeaders , setParams: {'id': this.getCreator() } });
      return next.handle(newRequest);
    } else {
      return next.handle(req);
    }
  }

  // getCreator() {
  //   let creatorId: string;
  //   const User: ProfileUser = JSON.parse(localStorage.getItem('user'));
  //   console.log(User);
  //   if (User.creator === null) {
  //     creatorId = User.id;
  //   } else {
  //     creatorId = User.creator;
  //   }
  //   console.log(creatorId);
  //   return creatorId;
  // }

  getCreator() {
    let creatorId = null;
    const user: ProfileUser =  JSON.parse(localStorage.getItem('user'));
    user.creator != null ? creatorId = user.creator : creatorId = user.id;
    return creatorId;
  }

}
