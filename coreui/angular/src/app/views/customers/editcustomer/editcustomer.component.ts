import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { CustomersService } from '../customers.service';


@Component({
  selector: 'app-createcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  customer: any = {};
  Users;

  roleBased = true;

  detailForm: FormGroup;


  constructor(  
    private toastr: ToastrService,
    private fb: FormBuilder,
    private actiroute: ActivatedRoute,
     private router: Router, 
     private service: CustomersService) {
    this.detailForm = this.fb.group({
     // sino: ['', Validators.required],
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      contactNumber: ['', Validators.required],
      deliveryMode: ['', Validators.required],
      status: ['', Validators.required],
		});
   }
  ngOnInit() {
    this.getUser();
    this.actiroute.params.subscribe(params => {
			this.service.editCustomer(params['id']).subscribe(res => {
				this.customer = res;
			});
		});

  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
    if(this.Users.role === 1){
      this.roleBased = false;
    } else {
      this.roleBased = true;
    }
  }


  deleteCustomer() {

    this.actiroute.params.subscribe(params => {
			this.service.deleteCustomer(params['id']).subscribe(data => {
        if (data.success) {
         this.dangerModal.hide();
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





  onUpdate() {

    this.actiroute.params.subscribe(params => {
			this.service.updateCustomer(params['id'], this.detailForm.value).subscribe(data => {
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


  gotoList() {
    this.router.navigateByUrl('/customers');
  //   this.router.navigateByUrl('/customers')
  // .then(() => {
  //   window.location.reload();
  // });
  }
}


