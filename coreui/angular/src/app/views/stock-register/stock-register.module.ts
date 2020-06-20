import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatestockComponent } from './createstock/createstock.component';
import { EditstockComponent } from './editstock/editstock.component';
import { StockRegisterComponent } from './stock-register.component';
import { StockRoutingModule } from './stock-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import {ModalModule} from 'ngx-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ StockRegisterComponent,CreatestockComponent, EditstockComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    StockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    TooltipModule,
    FilterPipeModule,
    NgxSpinnerModule,
    NgxPaginationModule,
  ]
})
export class StockRegisterModule { }
