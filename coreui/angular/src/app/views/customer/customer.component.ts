import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {DataService } from '../../auth/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  customersForms: FormArray = this.fb.array([]);


  constructor(private fb: FormBuilder, private _service: DataService) { }

  ngOnInit() {
    this._service.getCustomerList()
    .subscribe(res => {
      console.log(res);
      if (res === []) {
        this.addCustomers();
      } else {
        (res as []).forEach((customer: any) => {
          this.customersForms.push(this.fb.group({
            id: [customer.id],
            SIno : [customer.sino, ],
            customerName: [customer.customerName, Validators.required],
            address: [customer.address, Validators.required],
            city: [customer.city, Validators.required],
            state: [customer.state, Validators.required],
            contactNumber: [customer.contactNumber, Validators.required],
            deliveryMode: [customer.deliveryMode, Validators.required],
            status: [customer.status, Validators.required]
          }));
      });
      }
    });
  }

  addCustomers() {
    this.customersForms.push(this.fb.group({
        SIno : ['', ],
        customerName: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        contactNumber: ['', Validators.required],
        deliveryMode: ['', Validators.required],
        status: ['', Validators.required]
    }));
  }

  recordSubmit(fg: FormGroup) {
    console.log(fg.value);
    if (fg.value.id === 0) {
      this._service.createCustomer(fg.value)
        .subscribe(
          (res: any) => {
            fg.patchValue({id: res.id});

          }
         );

    } else {
      this._service.updateCustomer(fg.value.id, fg.value)
      .subscribe(
        (res: any) => {

        }
       );
    }
  }

  onDelete(id, i) {
    console.log(id);
  if (confirm('Are you sure to delete this record ?')) {
       this._service.deleteCustomer(id).subscribe(
        res => {
          this.customersForms.removeAt(i);
        }
      );
    }
  }

}
