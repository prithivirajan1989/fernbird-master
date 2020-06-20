import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {ModalModule} from 'ngx-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DatePipe } from '@angular/common'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@NgModule({
  declarations: [
    InvoiceComponent,
    CreateInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterPipeModule,
    InvoiceRoutingModule,
    BsDatepickerModule,
    MatProgressBarModule,
    ModalModule.forRoot(),
    NgxExtendedPdfViewerModule
  ],
  providers: [DatePipe],
})
export class InvoiceModule { }
