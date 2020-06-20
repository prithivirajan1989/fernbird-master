import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../../profile/profile';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {

  Users: ProfileUser;
  submitted = false;
  detailForm: FormGroup;

  constructor(   private toastr: ToastrService, private actiroute: ActivatedRoute, private router: Router, private service: DataService) { }
  ngOnInit() {
    this.getUser();
    this.createForm();
  }
  private createForm() {
    this.detailForm = new FormGroup({
      warehouseName: new FormControl('', Validators.required),
      street1: new FormControl('', Validators.required),
      street2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      
     
    });
  }


   
  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }
  
 

  save() {
    const user = {
      user:this.detailForm.value,
      userId:this.Users.id,
    }
    console.log(user);
    // this.service.registerUser(user)
    //   .subscribe(data => console.log(data), error => console.log(error));
    // this.gotoList();
  }


  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/orgsettings/warehouse')
  .then(() => {
    this.toastr.success('User Added Successfully');
  });
  }

}
