import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { LogoComponent } from '../logo/logo.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Profile Details'
    }
  }, { path: '', component: LogoComponent, data: {
   
  } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}


