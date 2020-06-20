import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
@Component({
  selector: 'app-online-payments',
  templateUrl: './online-payments.component.html',
  styleUrls: ['./online-payments.component.css']
})
export class OnlinePaymentsComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
