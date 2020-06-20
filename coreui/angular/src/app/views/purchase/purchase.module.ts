import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditpurchaseComponent } from './editpurchase/editpurchase.component';
import { CreatepurchaseComponent } from './createpurchase/createpurchase.component';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import {ModalModule} from 'ngx-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PurchaseComponent,CreatepurchaseComponent ,EditpurchaseComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TooltipModule,
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FilterPipeModule,
    NgxSpinnerModule,
    NgxPaginationModule,
  ]
})
export class PurchaseModule { }
