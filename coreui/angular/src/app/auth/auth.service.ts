import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProfileUser } from '../views/profile/profile';
import { ToastrService } from 'ngx-toastr';
import { UserIdleService } from 'angular-user-idle';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: string;
  existingUser: ProfileUser;
  otpId: any;
  mobilenumber: any;
  private tokenTimer: any
  private _registerUrl = 'http://localhost:3000/user/register';

  private _loginUrl = 'http://localhost:3000/user/authenticate';

  private _sendOtpUrl = 'http://localhost:3000/user/otp';

  private _VerifyOtpUrl = 'http://localhost:3000/user/verify';

  private _profileUpdateUrl = 'http://localhost:3000/user/update';

  private _profileImageUrl = 'http://localhost:3000/user/uploadfile';

  private _brandLogoUrl = 'http://localhost:3000/user/brandlogo';

  private _forgetUrl = 'http://localhost:3000/user/forgetpassword';

  private userUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private toastr: ToastrService,
    private userIdle: UserIdleService
  ) {}



  registerUser(user): Observable<any> {
    return this.http
      .post<any>(this._registerUrl, user)
      .pipe(map((res: Response) => res));
  }

  loginUser(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(this._loginUrl, user)
      .pipe(tap((res) => {
         console.log(res);
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        console.log(expirationDate);
       }));
  }


  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  editUser(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.userUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }


  deleteUser(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.userUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.userUrl}` , { headers: { 'Creator': '' }});
  }

  getUser() {
    this.existingUser = JSON.parse(localStorage.getItem('user'));
    return this.existingUser;
  }

  getToken() {
    const token: string = localStorage.getItem('id_token');
    return token;
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.errorMessage}`;
    } else {
      errorMessage = `Email or password is Invalid`;
    }
    console.log(errorMessage);

    return throwError(errorMessage);
  }

  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  storeProfileData(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.existingUser = user;
  }


  // loginUser(email: string, password:string): Observable<boolean> {
  //   const data = JSON.stringify({email: email,password: password});
  //   return this.http.post(this._loginUrl, data).pipe(map((response: Response)=> {
  //     let token = response.json() && response.json().token;
  //     if(token){
  //       this.token = token;
  //       localStorage.setItem('currentUser',JSON.stringify({
  //         email:email, token: token
  //       }));
  //       return true;
  //     }else {
  //       return false;
  //     }
  //   })
  //   .pipe(catchError(this.errorHandler))
  //   )}

  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  logout() {
    this.userIdle.stopWatching();
    this.toastr.success('You are logged out');
    window.localStorage.clear();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }

  // profileDetails() {
  //   const token = localStorage.getItem('token');
  //   const decoded = jwt_decode(token);
  //   console.log(decoded);
  // }

  // Otp verfivation

  sendOtp(otp: { number: Number }): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .post<any>(this._sendOtpUrl, otp, { headers: headers })
      .pipe(map((res: Response) => res));
  }

  storeOtpId(id: string, number: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('number', number);
    this.otpId = id;
    this.mobilenumber = number;
  }

  verifyOtp(otp: { id: any; token: Number; number: any }): Observable<any> {
    return this.http
      .post<any>(this._VerifyOtpUrl, otp)
      .pipe(map((res: Response) => res));
  }

  // CRUD OPERATION

  updateProfile(id: any, user: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http
      .put(`${this._profileUpdateUrl}/${id}`, user, { headers: headers })
      .pipe(map((res: Response) => res));
  }

  updateProfileImage(id: any, selectedFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    return this.http
      .put(`${this._profileImageUrl}/${id}`, formData)
      .pipe(map((res: Response) => res));
  }

  updateBrandlogo(id: any, selectedFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    return this.http
      .put(`${this._brandLogoUrl}/${id}`, formData)
      .pipe(map((res: Response) => res));
  }

  forgetPassword(id: any, password: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http
      .put(`${this._forgetUrl}/${id}`, password, { headers: headers })
      .pipe(map((res: Response) => res));
  }
}
