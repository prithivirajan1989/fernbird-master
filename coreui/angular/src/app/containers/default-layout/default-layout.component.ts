import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import {AuthService} from '../../auth/auth.service';
import { ProfileUser} from '../../views/profile/profile';

import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  Users: ProfileUser;

  imgUrl: string;

  settingsUrl='../../../assets/img/settings.png';

  brandUrl: string;

  logo = {src: "assets/img/brand/logo.svg", width: 89, height: 25, alt: 'Brand Logo'} 

  miniLogo = {src: "assets/img/brand/sygnet.svg", width: 30, height: 30, alt: 'Brand Logo'}

  constructor(private _authService: AuthService, private router: Router,) {}


  ngOnInit() {



    this.getUser();
    
    this.getBrandLogo()
    this.getImg();
    console.log(this.imgUrl)
    this.logo.src = this.brandUrl;
    this.miniLogo.src = this.brandUrl;
   // this.Users = JSON.parse(localStorage.getItem('user')) ;
   // console.log(this.Users);


 }



 getUser() {
  const ls = localStorage.getItem('user');
  this.Users = JSON.parse(ls);
  console.log(this.Users);
}



getImg() {

    if (this.Users.image == null) {
      this.imgUrl = '../../../assets/img/avatars/5.jpg';

     } else {
       this.imgUrl = this.Users.image;
     }

 }

 getBrandLogo() {

  if (this.Users.brandlogo == null) {
    this.brandUrl = '../../../assets/img/avatars/5.jpg';

   } else {
     this.brandUrl = this.Users.brandlogo;
   }

}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}



