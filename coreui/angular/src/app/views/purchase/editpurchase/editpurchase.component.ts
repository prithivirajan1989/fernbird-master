import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-editpurchase',
  templateUrl: './editpurchase.component.html',
  styleUrls: ['./editpurchase.component.css'],
})
export class EditpurchaseComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  purchase: any = {};

  detailForm: FormGroup;

  constructor(
    private actiroute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: PurchasesService
  ) {
    this.detailForm = this.fb.group({
      sino: ['', Validators.required],
      suplierName: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      product: ['', Validators.required],
      grade: ['', Validators.required],
      quality: ['', Validators.required],
      rate: ['', Validators.required],
      amount: ['', Validators.required],
      transportCharge: ['', Validators.required],
      miscCharge: ['', Validators.required],
      totalPurchaseAmount: ['', Validators.required],
      paymentStatus: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.actiroute.params.subscribe((params) => {
      this.service.editPurchase(params['id']).subscribe((res) => {
        this.purchase = res;
      });
    });
  }

  onUpdate() {
    this.actiroute.params.subscribe((params) => {
      this.service
        .updatePurchase(params.id, this.detailForm.value)
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

  deletePurchase() {
    this.actiroute.params.subscribe((params) => {
      this.service.deletePurchase(params.id).subscribe((data) => {
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
    this.router.navigateByUrl('/purchase');
    //   this.router.navigateByUrl('/customers')
    // .then(() => {
    //   window.location.reload();
    // });
  }
}
