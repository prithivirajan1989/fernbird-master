import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../auth/data.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';
import { AuthService } from '../../auth/auth.service';
import { Products } from './products';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from './products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  loading = false;
  products: Products[] = [];
  userFilter: any = { itemname: '' };
  p: number = 1;
  productSubcription: Subscription;

  constructor(
    private router: Router,
    private _service: ProductsService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.productSubcription = this._service
      .getProductsList()
      .subscribe((data) => {
        console.log(data)

        this.products = data;
      });
       this.spinner.hide();
     }, 500);

  }

  ngOnDestroy() {
    this.productSubcription.unsubscribe();
  }
}
