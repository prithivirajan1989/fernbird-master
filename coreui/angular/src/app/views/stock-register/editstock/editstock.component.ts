import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.css']
})
export class EditstockComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  stock: any = {};

  detailForm: FormGroup;

  constructor(  private toastr: ToastrService,
    private fb: FormBuilder,private actiroute: ActivatedRoute,
     private router: Router, private service: StocksService) {
    this.detailForm = this.fb.group({
      date: ['', Validators.required],
      stockPoint: ['', Validators.required],
      product: ['', Validators.required],
      grade: ['', Validators.required],
      // units: ['', Validators.required],
      openingStock: ['', Validators.required],
      stockIn: ['', Validators.required],
      stockOut: ['', Validators.required],
		});
   }
  ngOnInit() {

    this.actiroute.params.subscribe(params => {
			this.service.editStock(params['id']).subscribe(res => {
				this.stock = res;
			});
		});

  }






  onUpdate() {

    this.actiroute.params.subscribe(params => {
			this.service.updateStock(params['id'], this.detailForm.value).subscribe(data => {
        if (data.success) {

          this.toastr.success(data.msg);
          this.gotoList()


        } else {
          this.toastr.error(data.msg);

  }
			});
		});
  }

  deleteStocks() {

    this.actiroute.params.subscribe(params => {
			this.service.deleteStock(params['id']).subscribe(data => {
        if (data.success) {
          this.dangerModal.hide()
          this.toastr.success(data.msg);
          this.gotoList()


        } else {
          this.toastr.error(data.msg);

  }
			});
		});


	}



  gotoList() {
    this.router.navigateByUrl('/stocks');
  //   this.router.navigateByUrl('/customers')
  // .then(() => {
  //   window.location.reload();
  // });
  }


}
