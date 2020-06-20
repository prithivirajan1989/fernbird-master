import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { UseraccessComponent } from './useraccess/useraccess.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: '',
        redirectTo: 'Settings'
      },
      {
        path: 'adduser',
        component: AdduserComponent,
        data: {
          title: 'Add USer'
        }
      },
     
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      { path: 'edit/:id', component: UseraccessComponent, data: {
        title: 'Update Customers'
      } },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
