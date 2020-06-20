import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.css']
})
export class EditWarehouseComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  warehouse: any = {};

  detailForm: FormGroup;


  constructor(  private toastr: ToastrService,private fb: FormBuilder,private actiroute: ActivatedRoute, private router: Router, private service: DataService) {
    this.detailForm = this.fb.group({
      warehouseName: ['', Validators.required],
      street1:['', Validators.required],
      street2: ['', Validators.required],
      city:['', Validators.required],
      country: ['',Validators.required],
      state: ['',Validators.required],
      zipCode: ['',Validators.required],
      number: ['',Validators.required],
      email: ['',Validators.required],
		});
   }



  ngOnInit() {

    // this.actiroute.params.subscribe(params => {
		// 	this.service.editUser(params['id']).subscribe(res => {
		// 		this.warehouse = res;
		// 	});
		// });

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
  deleteCustomer() {

  //   this.actiroute.params.subscribe(params => {
	// 		this.service.deleteUser(params['id']).subscribe(data => {
  //       if (data.success) {
  //        this.dangerModal.hide();
  //         this.toastr.success(data.msg);
  //         this.gotoList()


  //       } else {
  //         this.toastr.error(data.msg);

  // }
	// 		});
	// 	});


	}



  gotoList() {
    this.router.navigateByUrl('/orgsettings/warehouse');
  //   this.router.navigateByUrl('/customers')
  // .then(() => {
  //   window.location.reload();
  // });
  }
}
