import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { WarehouseComponent } from './warehouse.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { EditWarehouseComponent } from './edit-warehouse/edit-warehouse.component';


@NgModule({
  declarations: [WarehouseComponent, CreateWarehouseComponent, EditWarehouseComponent],
  imports: [
    CommonModule,
    FormsModule,
    WarehouseRoutingModule,
    BsDropdownModule,
    TooltipModule,
    ReactiveFormsModule,
    FilterPipeModule,
    MatProgressBarModule,
    MatDialogModule,
    ModalModule.forRoot()
  ]
})
export class WarehouseModule { }
