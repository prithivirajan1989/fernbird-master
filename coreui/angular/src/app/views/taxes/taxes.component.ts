import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../profile/profile';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit {
  activeForm:boolean = false;
  submitted = false;
  detailForm: FormGroup;
  Users: ProfileUser;

  constructor(   private toastr: ToastrService, private actiroute: ActivatedRoute, private router: Router, private service: DataService) { }
  ngOnInit() {
    this.getUser();
    this.createForm();
  }
  private createForm() {
    this.detailForm = new FormGroup({
      check: new FormControl('', Validators.required),
      gstinNo: new FormControl('', Validators.required),
      gstinDate: new FormControl('', Validators.required),
      scheme: new FormControl('', Validators.required),

    });
  }


  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }

  onInput(event){
    this.activeForm = true;
  }
  change(event){
    this.activeForm = false;
  }

  save() {

    // const customer = {
    //   customer:this.detailForm.value,
    //   userId:this.Users.id
    // }
    // this.service.createCustomer(customer)
    //   .subscribe(data => console.log(data), error => console.log(error));
    // this.gotoList();
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
