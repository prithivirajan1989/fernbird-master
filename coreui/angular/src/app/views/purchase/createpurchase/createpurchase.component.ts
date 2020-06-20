import { Component, OnInit } from '@angular/core';
import { Purchase } from '../purchase';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../../profile/profile';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-createpurchase',
  templateUrl: './createpurchase.component.html',
  styleUrls: ['./createpurchase.component.css']
})
export class CreatepurchaseComponent implements OnInit {
  Users: ProfileUser;


  detailForm: FormGroup;

  constructor( private fb : FormBuilder, private toastr: ToastrService, private router: Router, private service: PurchasesService) {
    // this.detailForm = this.fb.group({
    //   sino: ['', Validators.required],
    //   suplierName: ['', Validators.required],
    //   address: ['', Validators.required],
    //   contactNumber: ['', Validators.required],
    //   product: ['', Validators.required],
    //   grade: ['', Validators.required],
    //   quality: ['', Validators.required],
    //   rate: ['', Validators.required],
    //   amount: ['', Validators.required],
    //   transportCharge: ['', Validators.required],
    //   miscCharge: ['', Validators.required],
    //   totalPurchaseAmount: ['', Validators.required],
    //   paymentStatus: ['', Validators.required],
    // });
   }


   ngOnInit(): void {
    this.getUser();
    this.createForm();
  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }


  private createForm() {
    this.detailForm = new FormGroup({
      sino: new FormControl('', Validators.required),
      suplierName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      quality: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      transportCharge: new FormControl('', Validators.required),
      miscCharge: new FormControl('', Validators.required),
      totalPurchaseAmount: new FormControl('', Validators.required),
      paymentStatus: new FormControl('', Validators.required),
    });
  }



  save() {

    this.service.createPurchase(this.detailForm.value)
      .subscribe((data) => console.log(data), error => console.log());
    this.gotoList();
  }


  onSubmit() {
    this.save();
  }

  gotoList() {
    this.router.navigateByUrl('/purchase')
    .then(() => {
      this.toastr.success('Purchase Details Added');
    });
  }

}
