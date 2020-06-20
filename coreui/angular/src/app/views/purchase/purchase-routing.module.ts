import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PurchaseComponent} from './purchase.component';
import { CreatepurchaseComponent } from './createpurchase/createpurchase.component';
import {EditpurchaseComponent} from './editpurchase/editpurchase.component';
const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    data: {
      title: 'Purchase'
    }
  },
  { path: 'add', component: CreatepurchaseComponent, data: {
    title: 'Add Purchase'
  } },
  { path: 'edit/:id', component: EditpurchaseComponent, data: {
    title: 'Update Purchase'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PurchaseRoutingModule {}
