import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {DataService } from '../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Customers } from '../customers/customers';
import { ProfileUser } from '../profile/profile';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

   Users: ProfileUser;

  constructor(  private toastr: ToastrService, private router: Router, private _service: AuthService,
   ) { }

  ngOnInit() {
    this._service.getUsersList()
    .subscribe(
      data => {
        console.log(data);
        this.Users = data;
      }
    );


  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
    console.log(this.Users)

  }











  create() {
    this.router.navigate(['/orgsettings/users/add']);
  }


}
