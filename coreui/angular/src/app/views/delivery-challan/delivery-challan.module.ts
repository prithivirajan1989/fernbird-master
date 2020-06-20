import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryChallanRoutingModule } from './delivery-challan-routing.module';
import { DeliveryChallanComponent } from './delivery-challan.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateDeliveryChallanComponent } from './create-delivery-challan/create-delivery-challan.component';
import { EditDeliveryChallanComponent } from './edit-delivery-challan/edit-delivery-challan.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModalModule } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [DeliveryChallanComponent, CreateDeliveryChallanComponent, EditDeliveryChallanComponent],
  imports: [
    CommonModule,
    FormsModule,
    DeliveryChallanRoutingModule,
    BsDatepickerModule,
    FilterPipeModule,
    BsDatepickerModule,
    MatProgressBarModule,
    BsDropdownModule,
    ModalModule.forRoot(),
  ],
  providers: [DatePipe],
})
export class DeliveryChallanModule { }
