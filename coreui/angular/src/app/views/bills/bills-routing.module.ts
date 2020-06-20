import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { EditBillComponent } from './edit-bill/edit-bill.component';
import { BillsComponent } from './bills.component';
const routes: Routes = [
  {
    path: '',
    component: BillsComponent,
    data: {
      title: 'Bills'
    }
  },
  { path: 'add', component: CreateBillComponent, data: {
    title: 'Create Bills'
  } },
  { path: 'edit/:id', component: EditBillComponent, data: {
    title: 'Update Bills'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BillsRoutingModule {}
