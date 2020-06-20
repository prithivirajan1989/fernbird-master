import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProductsComponent} from './products.component';
import { CreateproductsComponent } from './createproducts/createproducts.component';
import {EditproductsComponent} from './editproducts/editproducts.component';
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      title: 'Products'
    }
  },
  { path: 'add', component: CreateproductsComponent, data: {
    title: 'Add Products'
  } },
  { path: 'edit/:id', component: EditproductsComponent, data: {
    title: 'Update Products'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {}
