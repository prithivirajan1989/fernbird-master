import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customers } from '../customers';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../../profile/profile';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

  submitted = false;
  detailForm: FormGroup;
  Users: ProfileUser;

  constructor(   private toastr: ToastrService,
     private actiroute: ActivatedRoute, private router: Router, private service: CustomersService) { }
  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.detailForm = new FormGroup({
     // sino: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      deliveryMode: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }


  save() {

    this.service.createCustomer(this.detailForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }


  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/customers')
  .then(() => {
    this.toastr.success('Customer Added Successfully');
  });
  }
}


