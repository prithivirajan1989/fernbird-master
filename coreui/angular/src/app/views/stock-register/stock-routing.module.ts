import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StockRegisterComponent} from './stock-register.component';
import { CreatestockComponent } from './createstock/createstock.component';
import {EditstockComponent} from './editstock/editstock.component';
const routes: Routes = [
  {
    path: '',
    component: StockRegisterComponent,
    data: {
      title: 'Stocks'
    }
  },
  { path: 'add', component: CreatestockComponent, data: {
    title: 'Add Stocks'
  } },
  { path: 'edit/:id', component: EditstockComponent, data: {
    title: 'Update Stocks'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StockRoutingModule {}
