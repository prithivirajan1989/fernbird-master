import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [TaxesComponent],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    MatProgressBarModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    BsDatepickerModule,

    ModalModule.forRoot()
  ],
})
export class TaxesModule { }
