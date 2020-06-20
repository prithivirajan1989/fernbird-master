import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CustomersComponent} from './customers.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import {EditcustomerComponent} from './editcustomer/editcustomer.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    data: {
      title: 'Customers'
    }
  },
  { path: 'add', component: CreatecustomerComponent, data: {
    title: 'Add Customers'
  } },
  { path: 'edit/:id', component: EditcustomerComponent, data: {
    title: 'Update Customers'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomersRoutingModule {}
