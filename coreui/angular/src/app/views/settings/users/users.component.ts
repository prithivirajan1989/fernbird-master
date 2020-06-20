import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {DataService } from '../../../auth/data.service';
import { Customers } from '../customers';
import { Observable, interval, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('dangerModal') public dangerModal: ModalDirective;
   Users;
  roleBased = true;
  customers: {}
  constructor(  private toastr: ToastrService, private router: Router, private _service: DataService,
    private dialog: MatDialog) { }

  ngOnInit() {
   this.getUser();
    this._service.getUsersList()
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
        this.customers = data;
      }
    );


  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
    console.log(this.Users)
    if(this.Users.role === 1){
      this.roleBased = false;
    } else {
      this.roleBased = true;
    }
  }
  


  // addCustomers(customerIndex, id) {
  //     const dialog = new MatDialogConfig();
  //     dialog.autoFocus = true;
  //     dialog.disableClose = true;
  //     dialog.width = '50%';
  //     dialog.data = {customerIndex, id};
  //  this.dialog.open(AdduserComponent, dialog );
  // }

  // deleteEmployee(id: number) {

  //   if (confirm('Are you sure to delete this record ?')) {
  //     this._service.deleteCustomer(id)
  //     .subscribe(
  //       data => {
         
  //         console.log(data);
  //         this.ngOnInit();
  //         this.reloadData();
  //       },
  //       error => console.log(error));
  //  }

  // }


  deleteCustomer(id) {

    this._service.deleteUser(id).subscribe(data => {
      if (data.success) {
        this.dangerModal.hide();
        this.toastr.success(data.msg);
        this.ngOnInit();
       
      
      } else {
        this.toastr.error(data.msg);
        // this.flashMessage.show(data.msg, {
        //   cssClass: 'alert-danger', timeout: 2000
        // });
}
    });
	
	}


  reloadData() {
    this._service.getUsersList();
  }

  create() {
    this.router.navigate(['/settings/adduser']);
  }

  // exportAsXLSX():void {
  //   this._service.exportAsExcelFile(this.customers, 'sample');
  // }
}
