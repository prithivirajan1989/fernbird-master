import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlinePaymentsComponent } from './online-payments.component';

const routes: Routes = [
  {
    path: '',
    component: OnlinePaymentsComponent,
    data: {
      title: 'Online Payments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}