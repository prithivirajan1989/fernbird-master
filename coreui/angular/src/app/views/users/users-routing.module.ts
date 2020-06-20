import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AdduserComponent } from './add-user/adduser.component';
import { EditUserComponent } from './edit-user/useraccess.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  },
  { path: 'add', component: AdduserComponent, data: {
    title: 'Add Users'
  } },
  { path: 'edit/:id', component: EditUserComponent, data: {
    title: 'Update Users'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule {}
