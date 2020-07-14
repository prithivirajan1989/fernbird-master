import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../auth/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Stocks } from '../stock';
import { ProfileUser } from '../../profile/profile';
import { StocksService } from '../stocks.service';
import { ProductsService } from '../../products/products.service';
import { Products } from '../../products/products';

@Component({
  selector: 'app-createstock',
  templateUrl: './createstock.component.html',
  styleUrls: ['./createstock.component.css']
})
export class CreatestockComponent implements OnInit {
  // Users: ProfileUser;
  resume = new Stocks();
  detailForm: FormGroup;
  
  protected products: Products[] = [];
  constructor( private toastr: ToastrService,
     private router: Router, 
     private productService: ProductsService,
     private service: StocksService) { }

  ngOnInit(): void {
    this.createForm();
    this.getItem();

  }

  getItem(){
    this.productService.getProductsList().subscribe(data => {
      
      this.products = data;
      
    });
  }

  // getUser() {
  //   const ls = localStorage.getItem('user');
  //   this.Users = JSON.parse(ls);
  // }

  private createForm() {
    this.detailForm = new FormGroup({
      stockPoint: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      openingStock: new FormControl('', Validators.required),
      stockIn: new FormControl('', Validators.required),
      stockOut: new FormControl('', Validators.required),
    });
  }

  save() {

    this.service.createStock(this.detailForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }


  onSubmit() {
    this.save();
  }

  gotoList() {
    // this.router.navigateByUrl('/products');
    this.router.navigateByUrl('/stocks')
    .then(() => {
      this.toastr.success('Stocks Added Successfully');
    });
  }

}
