import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { CreateproductsComponent } from './createproducts/createproducts.component';
import { EditproductsComponent } from './editproducts/editproducts.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import {ModalModule} from 'ngx-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ProductsComponent, CreateproductsComponent, EditproductsComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ProductsRoutingModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FilterPipeModule,
    NgxSpinnerModule
  ]
})
export class ProductsModule { }
