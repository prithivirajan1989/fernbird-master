import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {ModalModule} from 'ngx-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BillsComponent } from './bills.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { EditBillComponent } from './edit-bill/edit-bill.component';
import { BillsRoutingModule } from './bills-routing.module';
import { DatePipe } from '@angular/common'
@NgModule({
  declarations: [
    BillsComponent,
    CreateBillComponent,
    EditBillComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterPipeModule,
    BillsRoutingModule,
    BsDatepickerModule,
    MatProgressBarModule,
    ModalModule.forRoot(),
  ],
  providers: [DatePipe],
})


export class BillsModule { }
