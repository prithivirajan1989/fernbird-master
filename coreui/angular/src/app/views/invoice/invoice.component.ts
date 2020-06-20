import { Component, OnInit, ViewChild } from '@angular/core';
import { Purchase } from '../purchase/purchase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../auth/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  Users: ProfileUser;

  table: boolean = true;

  invoices = [];

  loading = true;

  userFilter: any = { customerName: '' };


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _service: DataService,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit() {
    this.getUser();
    const userId = this.Users.id;
    this._service.getInvoiceList(userId).subscribe((data) => {
      this.invoices = data;

      this.loading = false;
    });

    this.reloadData();
  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }

  deleteInvoice(id) {
    this._service.deleteInvoice(id).subscribe((data) => {
      if (data.success) {
        this.dangerModal.hide();
        this.toastr.success(data.msg);
        this.ngOnInit();
      } else {
        this.toastr.error(data.msg);
      }
    });
  }

  reloadData() {
    const userId = this.Users.id;
    this._service.getInvoiceList(userId).subscribe((data) => {
      this.invoices = data;
    });
  }

  create() {
    this.router.navigate(['/invoice/add']);
  }
}
