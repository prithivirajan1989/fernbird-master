import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';
import { ProfileUser } from '../../profile/profile';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  Users: ProfileUser;
  submitted = false;
  detailForm: FormGroup;

  constructor(   private toastr: ToastrService, private actiroute: ActivatedRoute, private router: Router, private service: AuthService) { }
  ngOnInit() {
    this.getUser();
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
    this.service.registerUser(user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }


  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/orgsettings/users')
  .then(() => {
    this.toastr.success('User Added Successfully');
  });
  }

}
