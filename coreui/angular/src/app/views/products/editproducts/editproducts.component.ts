import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { Products } from '../products';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css'],
})
export class EditproductsComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  product: any = {};

  detailForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private actiroute: ActivatedRoute,
    private router: Router,
    private service: ProductsService
  ) {
    this.detailForm = this.fb.group({
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      unit: ['', Validators.required],
      grade: ['', Validators.required],
      dlength: ['', Validators.required],
      dwidth: ['', Validators.required],
      weight: ['', Validators.required],
      sellingprice: ['', Validators.required],
      purchaseprice: ['', Validators.required],
      description: ['', Validators.required],
    });
   }
  ngOnInit() {
    this.actiroute.params.subscribe((params) => {
      this.service.editProducts(params.id).subscribe((res) => {
        this.product = res;
      });
    });

    
  }
  

  onUpdate() {
    this.actiroute.params.subscribe((params) => {
      this.service
        .updateProducts(params.id, this.detailForm.value)
        .subscribe((data) => {
          if (data.success) {
            this.toastr.success(data.msg);
            this.gotoList();
          } else {
            this.toastr.error(data.msg);
          }
        });
    });
  }

  deleteProduct() {
    this.actiroute.params.subscribe((params) => {
      this.service.deleteProducts(params.id).subscribe((data) => {
        if (data.success) {
          this.dangerModal.hide();
          this.toastr.success(data.msg);
          this.gotoList();
        } else {
          this.toastr.error(data.msg);
        }
      });
    });
  }

  gotoList() {
    this.router.navigateByUrl('/products');
    //   this.router.navigateByUrl('/customers')
    // .then(() => {
    //   window.location.reload();
    // });
  }
}
