import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../../profile/profile';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-createproducts',
  templateUrl: './createproducts.component.html',
  styleUrls: ['./createproducts.component.css']
})
export class CreateproductsComponent implements OnInit {
  detailForm: FormGroup;
  

  constructor( private toastr: ToastrService,
     private router: Router,
      private service: ProductsService) { }

  ngOnInit(): void {
    this.createForm();
  }



  private createForm() {
    this.detailForm = new FormGroup({
      itemcode: new FormControl('', Validators.required),
      itemname: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      dlength: new FormControl('', Validators.required),
      dwidth: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      sellingprice: new FormControl('', Validators.required),
      purchaseprice: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  save() {

    this.service.createProducts(this.detailForm.value,)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }


  onSubmit() {
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/products');
    this.router.navigateByUrl('/products')
    .then(() => {
      this.toastr.success('Products Added Successfully');
    });
  }

}
