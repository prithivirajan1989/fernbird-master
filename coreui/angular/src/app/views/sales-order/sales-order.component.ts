import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileUser } from '../profile/profile';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../auth/data.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  Users: ProfileUser;

  table: boolean = true;

  sales = [];

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
    this._service.getSalessList(userId).subscribe((data) => {
      this.sales = data;

      this.loading = false;
    });

    this.reloadData();
  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }

  deleteInvoice(id) {
    this._service.deleteSales(id).subscribe((data) => {
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

  exportAsXLSX(): void {
    let exs = this.sales.map((customer) => {
      return {
        customerName: customer.customerName,
        customerNo: customer.customerNo,
        customerEmail: customer.customerEmail,
        salesOrderNo: customer.salesOrderNo,
        salesOrderDate: customer.salesOrderDate,
        shipmentDate: customer.shipmentDate,
        salesPerson: customer.salesPerson,
        generatedDate: customer.date,
      };
    });

    this._service.exportAsExcelFile(exs, 'sample');
  }

  reloadData() {
    const userId = this.Users.id;
    this._service.getSalessList(userId).subscribe((data) => {
      this.sales = data;
    });
  }

  create() {
    this.router.navigate(['/salesorder/add']);
  }
}
