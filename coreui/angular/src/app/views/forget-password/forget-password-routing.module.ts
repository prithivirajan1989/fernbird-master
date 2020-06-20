import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetComponent } from './forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetComponent,
    data: {
      title: 'Forget Password'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetRoutingModule {}


