import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaymentRoutingModule } from './payments-routing.module';
import { OnlinePaymentsComponent } from './online-payments.component'
import { TabsModule } from 'ngx-bootstrap/tabs'
@NgModule({
  declarations: [OnlinePaymentsComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatProgressBarModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    TabsModule,

    ModalModule.forRoot()
  ],
})
export class OnlinePaymentsModule { }
