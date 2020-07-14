import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { Supliers } from '../suplier';
import { ProfileUser } from '../../profile/profile';
import { ToastrService } from 'ngx-toastr';
import { SupliersSercice } from '../supliers.service';
import { Products } from '../../products/products';
import { ProductsService } from '../../products/products.service';
@Component({
  selector: 'app-createsuplier',
  templateUrl: './createsuplier.component.html',
  styleUrls: ['./createsuplier.component.css']
})
export class CreatesuplierComponent implements OnInit {
  detailForm: FormGroup;
  resume = new Supliers();
  protected products: Products[] = [];
  constructor( private router: Router, private productService: ProductsService,private service: SupliersSercice,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.createForm();
    this.getItem();
  }



  private createForm() {
    this.detailForm = new FormGroup({
     // sino: new FormControl('', Validators.required),
      suplierName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
    });
  }

  getItem(){
    this.productService.getProductsList().subscribe(data => {
      
      this.products = data;
      
    });
  }


  save() {

    this.service.createSuplier(this.detailForm.value)
      .subscribe(
        data =>
         console.log(data),
          error => console.log(error));

    this.gotoList();
  }


  onSubmit() {

    this.save();
  }

  gotoList() {
    this.router.navigateByUrl('/suplier')
    .then(() => {
      this.toastr.success('Vendoer Details Added');
    });
  }

}
