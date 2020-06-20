import { Component, OnInit, ViewChild } from "@angular/core";
import { ProfileUser } from "../profile/profile";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DataService } from "../../auth/data.service";
import { FilterPipe } from "ngx-filter-pipe";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-delivery-challan",
  templateUrl: "./delivery-challan.component.html",
  styleUrls: ["./delivery-challan.component.css"],
})
export class DeliveryChallanComponent {
  @ViewChild("dangerModal") public dangerModal: ModalDirective;

  Users: ProfileUser;

  table: boolean = true;

  challans = [];

  loading = true;

  userFilter: any = { customerName: "" };

  imgUrl = "../../../assets/img/vendor.png";

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _service: DataService,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit() {
    this.getUser();
    const userId = this.Users.id;
    this._service.getChallanList(userId).subscribe((data) => {
      this.challans = data;

      this.loading = false;
    });

    this.reloadData();
  }

  getUser() {
    const ls = localStorage.getItem("user");
    this.Users = JSON.parse(ls);
  }

  deleteInvoice(id) {
    this._service.deleteChallan(id).subscribe((data) => {
      if (data.success) {
        this.dangerModal.hide();
        this.toastr.success(data.msg);
        this.ngOnInit();
      } else {
        this.toastr.error(data.msg);
        // this.flashMessage.show(data.msg, {
        //   cssClass: 'alert-danger', timeout: 2000
        // });
      }
    });
  }

  exportAsXLSX(): void {
    let exs = this.challans.map((customer) => {
      return {
        Name: customer.customerName,
        Number: customer.customerNo,
        Email: customer.customerEmail,
        ChallanNo: customer.challanNo,
        ChallanDate: customer.challanDate,
        ChallanType: customer.challanType,
        GeneratedDate: customer.date,
      };
    });

    this._service.exportAsExcelFile(exs, "sample");
  }

  reloadData() {
    const userId = this.Users.id;
    this._service.getChallanList(userId).subscribe((data) => {
      this.challans = data;
    });
  }

  create() {
    this.router.navigate(["/deliverychallan/add"]);
  }
}
