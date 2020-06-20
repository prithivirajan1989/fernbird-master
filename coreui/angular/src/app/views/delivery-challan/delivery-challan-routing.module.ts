import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryChallanComponent } from './delivery-challan.component';
import { CreateDeliveryChallanComponent } from './create-delivery-challan/create-delivery-challan.component';
import { EditDeliveryChallanComponent } from './edit-delivery-challan/edit-delivery-challan.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryChallanComponent,
    data: {
      title: 'Delivery Challan'
    }
  },{ path: 'add', component: CreateDeliveryChallanComponent, data: {
    title: 'Create Deliverychallan'
  } },

  { path: 'edit/:id', component: EditDeliveryChallanComponent, data: {
    title: 'Update Deliverychallan'
  }
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryChallanRoutingModule {}


