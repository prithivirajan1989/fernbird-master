import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { SupliersSercice } from '../supliers.service';

@Component({
  selector: 'app-editsuplier',
  templateUrl: './editsuplier.component.html',
  styleUrls: ['./editsuplier.component.css']
})
export class EditsuplierComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  supliers: any = {};

  detailForm: FormGroup;

  constructor(  private toastr: ToastrService,
    private fb: FormBuilder, private actiroute: ActivatedRoute, private router: Router, private service: SupliersSercice) {
    this.detailForm = this.fb.group({
      sino: ['', Validators.required],
      suplierName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      contactNumber: ['', Validators.required],
      status: ['', Validators.required],
      product: ['', Validators.required],
});
   }
  ngOnInit() {
    this.actiroute.params.subscribe(params => {
			this.service.editSuplier(params['id']).subscribe(res => {
        this.supliers = res;

			});
		});

  }






  onUpdate() {

    this.actiroute.params.subscribe(params => {
			this.service.updateSuplier(params['id'], this.detailForm.value).subscribe(data => {
        if (data.success) {

          this.toastr.success(data.msg);
          this.gotoList()


        } else {
          this.toastr.error(data.msg);

  }
			});
		});
  }

  deleteSuplier() {

    this.actiroute.params.subscribe(params => {
			this.service.deleteSuplier(params['id']).subscribe(data => {
        if (data.success) {
          this.dangerModal.hide();
          this.toastr.success(data.msg);
          this.gotoList()


        } else {
          this.toastr.error(data.msg);

  }
			});
		});



	}




  gotoList() {
    this.router.navigateByUrl('/suplier');
  //   this.router.navigateByUrl('/customers')
  // .then(() => {
  //   window.location.reload();
  // });
  }


}
