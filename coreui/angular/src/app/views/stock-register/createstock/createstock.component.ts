import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../auth/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Stocks } from '../stock';
import { ProfileUser } from '../../profile/profile';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-createstock',
  templateUrl: './createstock.component.html',
  styleUrls: ['./createstock.component.css']
})
export class CreatestockComponent implements OnInit {
  Users: ProfileUser;

  detailForm: FormGroup;

  constructor( private toastr: ToastrService, private router: Router, private service: StocksService,private fb: FormBuilder) {
    this.detailForm = this.fb.group({
      stockPoint: ['', Validators.required],
      product: ['', Validators.required],
      grade: ['', Validators.required],
      // units: ['', Validators.required],
      openingStock: ['', Validators.required],
      stockIn: ['', Validators.required],
      stockOut: ['', Validators.required],
		});
   }

  ngOnInit(): void {
    this.getUser();

  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }



  save() {

    this.service.createStock(this.detailForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }


  onSubmit() {
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/products');
    this.router.navigateByUrl('/stocks')
    .then(() => {
      this.toastr.success('Stocks Added Successfully');
    });
  }

}
