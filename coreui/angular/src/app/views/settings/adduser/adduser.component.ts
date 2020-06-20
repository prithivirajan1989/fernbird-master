import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customers } from '../customers';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  submitted = false;
  detailForm: FormGroup;

  constructor(   private toastr: ToastrService, private actiroute: ActivatedRoute, private router: Router, private service: AuthService) { }
  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.detailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobilenumber: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      
     
    });
  }

  
 

  save() {
    console.log(this.detailForm.value);
    this.service.registerUser(this.detailForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }


  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/settings/users')
  .then(() => {
    this.toastr.success('User Added Successfully');
  });
  }

}
