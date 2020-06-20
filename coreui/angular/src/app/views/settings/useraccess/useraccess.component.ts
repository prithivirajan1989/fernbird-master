import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.css']
})
export class UseraccessComponent implements OnInit {

  customer: any = {};

  detailForm: FormGroup;


  constructor(  private toastr: ToastrService,private fb: FormBuilder,private actiroute: ActivatedRoute, private router: Router, private service: DataService) {
    this.detailForm = this.fb.group({
    name: ['', Validators.required],
    email:['', Validators.required],
    mobilenumber: ['', Validators.required],
    role:['', Validators.required],
    password: ['',Validators.required],
		});
   }

  
    
  ngOnInit() {

    this.actiroute.params.subscribe(params => {
			this.service.editUser(params['id']).subscribe(res => {
				this.customer = res;
			});
		});

  }
  



  
  
  onUpdate() {
    
    this.actiroute.params.subscribe(params => {
			this.service.updateUser(params['id'], this.detailForm.value).subscribe(data => {
        if (data.success) {
         
          this.toastr.success(data.msg);
          this.gotoList()
         
        
        } else {
          this.toastr.error(data.msg);
          // this.flashMessage.show(data.msg, {
          //   cssClass: 'alert-danger', timeout: 2000
          // });
  }
			});
		});
  }

  // onSubmit() {
  //   this.save();
  // }

  reloadData() {
    this.service.getUsersList();
  }

  gotoList() {
    this.router.navigateByUrl('/settings/users');
  //   this.router.navigateByUrl('/customers')
  // .then(() => {
  //   window.location.reload();
  // });
  }

}
