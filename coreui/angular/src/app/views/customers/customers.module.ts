import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [CustomersComponent, CreatecustomerComponent, EditcustomerComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatProgressBarModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    BsDropdownModule,
    FilterPipeModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,

    ModalModule.forRoot()
  ],
  entryComponents: [CreatecustomerComponent, EditcustomerComponent],
})
export class CustomersModule { }
