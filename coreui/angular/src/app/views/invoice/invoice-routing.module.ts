import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from './invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: {
      title: 'Invoice'
    }
  },
  { path: 'add', component: CreateInvoiceComponent, data: {
    title: 'Create Invoice'
  } },

  { path: 'edit', component: EditInvoiceComponent, data: {
    title: 'Update Invoice'
  }
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}


