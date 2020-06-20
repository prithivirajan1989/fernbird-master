import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {DataService } from '../../auth/data.service';


import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  table:boolean = true;
  loading = true;

  Users: ProfileUser;

  warehouses = [];
  export = [];
  userFilter: any = { warehouseName: '' };
  constructor(  private toastr: ToastrService,
     private router: Router,
     private _service: DataService,
     private filterPipe: FilterPipe,
    ) {
      console.log(filterPipe.transform(this.warehouses, { warehouseName: 'M'}));
     }

  ngOnInit() {

    // this.getUser();
    //  const userId = this.Users.id
    // this._service.getCustomerList(userId)
    // .subscribe(
    //   data => {
    //     this.warehouses = data;

    //     this.loading = false;

    //   }

    // );

    // this.reloadData();



  }















  // create() {
  //   this.router.navigate(['/orgsettings/warehouse/add']);
  // }




  // exportAsXLSX():void {
  //   let exs = this.warehouses.map(customer => {

  //     return {
  //       Date: customer.date,
  //       SiNo: customer.sino,
  //       CustomeName: customer.customerName,
  //       Address: customer.address,
  //       City: customer.city,
  //       State: customer.state,
  //       ContactNumber: customer.contactNumber,
  //       DeliveryMode: customer.deliveryMode,
  //     }
  //   })

  //   this._service.exportAsExcelFile(exs, 'sample');
  // }


}
