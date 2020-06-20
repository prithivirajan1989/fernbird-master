import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsIntegrationComponent } from './sms-integration.component';

const routes: Routes = [
  {
    path: '',
    component: SmsIntegrationComponent,
    data: {
      title: 'SMS Integration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule {}