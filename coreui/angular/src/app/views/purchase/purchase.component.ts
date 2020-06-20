import { Component, OnInit, ViewChild } from '@angular/core';
import { Purchase } from './purchase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../auth/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';
import { AuthService } from '../../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchasesService } from './purchases.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  purchases: Purchase[] = [];
  Users: ProfileUser;
  userFilter: any = { suplierName: '' };
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _service: PurchasesService,
    private filterPipe: FilterPipe,
    private _Auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {

    this.spinner.show();
    setTimeout(() => {
      this._service.getPurchaseList()
      .subscribe((data) => {
        this.purchases = data;
      });
       this.spinner.hide();
     }, 500);
  }

  create() {
    this.router.navigate(['/purchase/add']);
  }
}
