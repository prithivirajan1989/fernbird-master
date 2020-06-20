import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderRoutingModule } from './sales-order.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {DatePipe} from '@angular/common';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CreateSalesOrderComponent } from './create-sales/create-sales.componet';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [SalesOrderComponent , CreateSalesOrderComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatToolbarModule,
    SalesOrderRoutingModule,
    BsDatepickerModule,
    MatProgressButtonsModule,
    MatProgressBarModule,
    FilterPipeModule,
    ModalModule,
    BsDropdownModule
  ],
  providers: [
    DatePipe
  ],
})
export class SalesOrderModule { }
