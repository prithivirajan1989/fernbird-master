import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Stocks } from './stock';
import { DataService } from '../../auth/data.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksService } from './stocks.service';
@Component({
  selector: 'app-stock-register',
  templateUrl: './stock-register.component.html',
  styleUrls: ['./stock-register.component.css'],
})
export class StockRegisterComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  Users: ProfileUser;
  stocks: Stocks[] = [];
  userFilter: any = { product: '' };
  loading = false;
  constructor(
    private _service: StocksService,
    private filterPipe: FilterPipe,
    private spinner: NgxSpinnerService
  ) {
    // console.log(filterPipe.transform(this.stocks, { product: 'M' }));
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this._service.getStockList()
      .subscribe((data) => {
        this.stocks = data;
        this.loading = false;
      });

      this.spinner.hide();
    }, 500);
  }


}
