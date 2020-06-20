import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdduserComponent } from './adduser/adduser.component';
import { UseraccessComponent } from './useraccess/useraccess.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, ModalModule } from 'ngx-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [AdduserComponent, SettingsComponent,UseraccessComponent, UsersComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    ModalModule.forRoot()
  ]
})
export class SettingsModule { }
