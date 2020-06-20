import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehouseComponent } from './warehouse.component';
import { WarehouseModule } from './warehouse.module';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { EditWarehouseComponent } from './edit-warehouse/edit-warehouse.component';

const routes: Routes = [
    {
        path: '',
        component: WarehouseComponent,
        data: {
          title: 'Warehouses'
        }
      },
      { path: 'add', component: CreateWarehouseComponent, data: {
        title: 'New Warehouse'
      } },
      { path: 'edit/:id', component: EditWarehouseComponent, data: {
        title: 'Update Warehouse'
      } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule {}


