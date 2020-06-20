import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {DataService } from '../../auth/data.service';
import { Customers } from './customers';
import { Observable, interval, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersService } from './customers.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  customers: Customers[] = [];
  userFilter: any = { customerName: '' };
  p: number = 1;
  constructor(  private toastr: ToastrService,
    private router: Router, private _service: CustomersService,
    private filterPipe: FilterPipe,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog) {
      // console.log(filterPipe.transform(this.customers, { customerName: 'M'}));
     }

  ngOnInit() {
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
      this._service.getCustomerList()
    .subscribe(
      (data) => {
        this.customers = data;
      }, (error) => {
        console.log(error);
      }

    );
       this.spinner.hide();
     }, 500);




  }


  // addCustomers(customerIndex, id) {
  //     const dialog = new MatDialogConfig();
  //     dialog.autoFocus = true;
  //     dialog.disableClose = true;
  //     dialog.width = '50%';
  //     dialog.data = {customerIndex, id};
  //  this.dialog.open(CreatecustomerComponent, dialog );
  // }







  create() {
    this.router.navigate(['/customers/add']);
  }




  exportAsXLSX() {
    const exs = this.customers.map(customer => {

      return {
        Date: customer.date,
        SiNo: customer.sino,
        CustomeName: customer.customerName,
        Address: customer.address,
        City: customer.city,
        State: customer.state,
        ContactNumber: customer.contactNumber,
        DeliveryMode: customer.deliveryMode,
      }
    })

    this._service.exportAsExcelFile(exs, 'sample');
  }



}

