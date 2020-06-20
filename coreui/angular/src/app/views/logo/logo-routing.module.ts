import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoComponent } from './logo.component';

const routes: Routes = [
  {
    path: '',
    component: LogoComponent,
    data: {
      title: 'Brand Logo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoRoutingModule {}


