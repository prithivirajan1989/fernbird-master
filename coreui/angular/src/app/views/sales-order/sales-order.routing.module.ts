import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesOrderComponent } from './sales-order.component';
import { CreateSalesOrderComponent } from './create-sales/create-sales.componet';

const routes: Routes = [
  {
    path: '',
    component: SalesOrderComponent,
    data: {
      title: 'Sales Order'
    }
  },
    { path: 'add', component: CreateSalesOrderComponent, data: {
      title: 'Create Sales Order'
    } },
  
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule {}


