import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxesComponent } from './taxes.component';

const routes: Routes = [
  {
    path: '',
    component: TaxesComponent,
    data: {
      title: 'Taxes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule {}


