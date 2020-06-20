import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../auth/data.service';
import { Supliers } from './suplier';
import { MatDialogConfig } from '@angular/material/dialog';
import { CreateproductsComponent } from '../products/createproducts/createproducts.component';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from 'ngx-filter-pipe';
import { ProfileUser } from '../profile/profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { SupliersSercice } from './supliers.service';

@Component({
  selector: 'app-suplier',
  templateUrl: './suplier.component.html',
  styleUrls: ['./suplier.component.css'],
})
export class SuplierComponent implements OnInit {
  Users: ProfileUser;
  supliers = [];
  dialog: any;
  table: boolean = true;
  loading = true;
  imgUrl = '../../../assets/img/vendor.png';
  userFilter: any = { suplierName: '' };
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _service: SupliersSercice,
    private filterPipe: FilterPipe,
    private spinner: NgxSpinnerService,
    private pdf: NgxExtendedPdfViewerService
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this._service.getSupliersList().subscribe((data) => {
        this.supliers = data;
        this.loading = false;
      });
       this.spinner.hide();
     }, 500);

  }



  // addCustomers(customerIndex, id) {
  //   const dialog = new MatDialogConfig();
  //   dialog.autoFocus = true;
  //   dialog.disableClose = true;
  //   dialog.width = '50%';
  //   dialog.data = { customerIndex, id };
  //   this.dialog.open(CreateproductsComponent, dialog);
  // }



  // updateDetails(id: number) {
  //   this.router.navigate(['/suplier/edit', id]);
  // }

  create() {
    this.router.navigate(['/suplier/add']);
  }
}
