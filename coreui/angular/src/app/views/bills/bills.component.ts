import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileUser } from '../profile/profile';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../auth/data.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  Users: ProfileUser;

  bills = [];

  loading = true;

  userFilter: any = { vendorName: '' };

  constructor(
    private toastr: ToastrService,
    private _service: DataService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this.Users = this._auth.getUser();
    this._service.getBillsList(this.Users.id)
    .subscribe((data) => {
      this.bills = data;
      this.loading = false;
    });
  }


  deleteInvoice(id) {
    this._service.deleteBill(id)
    .subscribe((data) => {
      if (data.success) {
        this.dangerModal.hide();
        this.toastr.success(data.msg);
        this.ngOnInit();
      } else {
        this.toastr.error(data.msg);
      }
    });
  }
}
